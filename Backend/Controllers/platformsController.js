import axios from "axios";
import userModel from "../models/userModel.js";
import * as cheerio from "cheerio";

// Codeforces
const codeForces=async(req,res)=>{
    const email=req.user.email;
    try {
        const normalizedEmail=email.toLowerCase();
        const user=await userModel.findOne({email:normalizedEmail});
        if(user.codeForces===""){
            return res.json({success:false,message:"CodeForces handle not provided"});
        }
        const response1=await fetch(`https://codeforces.com/api/user.info?handles=${user.codeForces}`);
        const response2=await fetch(`https://codeforces.com/api/user.status?handle=${user.codeForces}`);
        const response3=await fetch(`https://codeforces.com/api/user.rating?handle=${user.codeForces}`);
        const data1=await response1.json();
        const data2=await response2.json();
        const data3=await response3.json();
        if(data1.status!=="OK"){
            return res.json({success:false,message:"Invalid CodeForces Username"});
        }
        const solved=new Set();
        for(const sub of data2.result){
            if(sub.verdict==="OK"){
                const id=`${sub.problem.contestId}-${sub.problem.index}`;
                solved.add(id);
            }
        }
        user.codeForcesRating=data1.result[0].rating || 0;
        user.score=(user.leetCodeSolved||0)+((user.codeForcesRating||0)*0.2)+((user.codeChefRating||0)*0.2);
        await user.save();
        return res.json({success:true,data:data1.result[0],totalSolved:solved.size,contest:data3.result,email:normalizedEmail,linkedIn:user.linkedIn,twitter:user.twitter,userName:user.userName});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
//LeetCode
const LeetCode=async(req,res)=>{
    const email=req.user.email;
    try {
        const normalizedEmail=email.toLowerCase();
        const user=await userModel.findOne({email:normalizedEmail});
        if(user.leetCode===""){
            return res.json({success:false,message:"LeetCode handle not provided"});
        }
        const query=`
        query getUser($username:String!){
        matchedUser(username:$username){
        username
        profile{
        realName
        userAvatar
        ranking}
        submitStats{
        acSubmissionNum{
        difficulty
        count
        }
        }
        }
        }
        `;
        const response1=await fetch("https://leetcode.com/graphql",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Referer":"https://leetcode.com"
            },
            body:JSON.stringify({
                query,
                variables:{username:user.leetCode}
            })
        });
       const response2 = await axios.get(`https://alfa-leetcode-api.onrender.com/${user.leetCode}/contest`,{
        timeout:30000
       });
        const result1=await response1.json();
        const result2=response2.data;
        if(!result1.data.matchedUser){
            return res.json({success:false,message:"Invalid LeetCode Username"});
        }
        user.leetCodeSolved=result1.data.matchedUser.submitStats.acSubmissionNum[0].count || 0;
        user.score=(user.leetCodeSolved||0)+((user.codeForcesRating||0)*0.2)+((user.codeChefRating||0)*0.2);
        await user.save();
        return res.json({success:true,data:result1,contest:result2,email:normalizedEmail,linkedIn:user.linkedIn,twitter:user.twitter,userName:user.userName});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
// codeChef
const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.9",
};
const codeChef=async(req,res)=>{
    const email=req.user.email;
 try {
     const normalizedEmail=email.toLowerCase();
     const user=await userModel.findOne({email:normalizedEmail});
     if(user.codeChef===""){
        return res.json({success:false,message:"CodeChef handle not provided."});
     }
    let response=await axios.get(`https://www.codechef.com/users/${user.codeChef}`,
        {headers:HEADERS,timeout:30000}
    );
    response=response.data;
    const $=cheerio.load(response);
    //rating
    if (!$(".rating-number").text()) {
    return res.json({ success: false, message: "Invalid CodeChef Username" });
    }
    const ratingText=$(".rating-number").text().trim()||0;
    const ratingMatch=ratingText.match(/\d+/);
    const rating=ratingMatch?Number(ratingMatch[0]):0;
    user.codeChefRating=rating;
    //highest Rating
    const highestRatingText=$("div.rating-header.text-center small").text();
    const highestRatingMatch=highestRatingText.match(/\d+/);
    const highestRating=highestRatingMatch?Number(highestRatingMatch[0]):0;
    //Stars
    const stars=$(".rating-star span").length ||0;
    //Contest Participatedg
    const contestsParticipated=$("div[class='contest-participated-count'] b").text() ||0;
    //ProblemsSolved
    let problemsSolved = 0;
    $("h3").each((_, el) => {
    const text = $(el).text();
    if (text.includes("Total Problems Solved")) {
    const match = text.match(/\d+/);
    if (match) problemsSolved = Number(match[0]);
    }
    });
    user.score=(user.leetCodeSolved||0)+((user.codeForcesRating||0)*0.2)+((user.codeChefRating||0)*0.2);
    await user.save();
    return res.json({success:true,rating,highestRating,stars,contestParticipated:Number(contestsParticipated),problemsSolved,email:normalizedEmail,linkedIn:user.linkedIn,twitter:user.twitter,userName:user.codeChef});
    } catch (error) {
    console.log(error);
    return res.json({success:false,message:error.message});
 }
}

export {codeForces,LeetCode,codeChef};