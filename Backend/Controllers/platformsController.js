import axios from "axios";
import * as cheerio from "cheerio";
// Codeforces
const codeForces=async(req,res)=>{
    const {Username}=req.body;
    try {
        if(!Username){
            return res.json({success:false,message:"Username Required"})
        }
        const response1=await fetch(`https://codeforces.com/api/user.info?handles=${Username}`);
        const response2=await fetch(`https://codeforces.com/api/user.status?handle=${Username}`);
        const response3=await fetch(`https://codeforces.com/api/user.rating?handle=${Username}`);
        const data1=await response1.json();
        const data2=await response2.json();
        const data3=await response3.json();
        if(data1.status!=="OK"){
            return res.json({success:false,message:"Invalid Username"});
        }
        const solved=new Set();
        for(const sub of data2.result){
            if(sub.verdict==="OK"){
                const id=`${sub.problem.contestId}-${sub.problem.index}`;
                solved.add(id);
            }
        }
        return res.json({success:true,data:data1.result[0],totalSolved:solved.size,contest:data3.result});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
//LeetCode
const LeetCode=async(req,res)=>{
    const {Username}=req.body;
    if(!Username){
        return res.json({success:false,message:"Username required"})
    }
    try {
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
                variables:{username:Username}
            })
        });
       const response2 = await axios.get(`https://alfa-leetcode-api.onrender.com/${Username}/contest`,{
        timeout:30000
       });
        const result1=await response1.json();
        const result2=response2.data;
        if(!result1.data.matchedUser){
            return res.json({success:false,message:"Invalid Username"});
        }
        return res.json({success:true,data:result1,contest:result2});
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
    const {Username}=req.body;
    if (!Username) {
  return res.json({ success: false, message: "Username Required" });
}
 try {
    let response=await axios.get(`https://www.codechef.com/users/${Username}`,
        {headers:HEADERS,timeout:30000}
    );
    response=response.data;
    const $=cheerio.load(response);
    //rating
    if (!$(".rating-number").text()) {
    return res.json({ success: false, message: "Invalid Username" });
    }
    const ratingText=$(".rating-number").text().trim()||0;
    const ratingMatch=ratingText.match(/\d+/);
    const rating=ratingMatch?Number(ratingMatch[0]):0;
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
    return res.json({success:true,rating,highestRating,stars,contestParticipated:Number(contestsParticipated),problemsSolved});
    } catch (error) {
    console.log(error);
    return res.json({success:false,message:error.message});
 }
}
export {codeForces,LeetCode,codeChef};