import userModel from "../models/userModel.js";
const fetchLeaderBoard=async(req,res)=>{
    const {userName}=req.params;
    try {
        const user=await userModel.findOne({userName});
        const myScore=user.score;
        const leaderBoard=await userModel.find({score:{$gte:0}}).sort({score:-1}).select("userName score leetCodeSolved codeForcesRating codeChefRating").lean();
        let currentRank=1;
        let prevScore=null;
        let skip=0;
        leaderBoard.forEach((u,index)=>{
            if(prevScore!=null){
              if(u.score==prevScore){
                skip++;
              }else{
                currentRank+=1+skip;
                skip=0;
              }
            }
            u.rank=currentRank;
            prevScore=u.score;
        })
        const higherRankCount=await userModel.countDocuments({score:{$gt:myScore}});
        const myRank=higherRankCount+1;
        return res.json({success:true,data:leaderBoard,myRank,userName:user.userName});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
const fetchLeetCodeLeaderBoard=async(req,res)=>{
    const email=req.user.email;
    try {
        const normalizedEmail=email.toLowerCase();
        const user=await userModel.findOne({email:normalizedEmail});
        const myScore=user.leetCodeSolved;
        const leaderBoard=await userModel.find({leetCodeSolved:{$gte:0}}).sort({leetCodeSolved:-1}).select("userName leetCodeSolved").lean();
        let currentRank=1;
        let prevScore=null;
        let skip=0;
        leaderBoard.forEach((u,index)=>{
        if(prevScore!=null){
            if(u.leetCodeSolved==prevScore){
                skip++;
            }
            else{
                currentRank+=1+skip;
                skip=0;
            }
        }
        u.rank=currentRank;
        prevScore=u.leetCodeSolved;
        })
        const higherRankCount=await userModel.countDocuments({leetCodeSolved:{$gt:myScore}});
        const myRank=higherRankCount+1;
        return res.json({success:true,data:leaderBoard,myRank});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
const fetchCodeChefLeaderBoard=async(req,res)=>{
    const email=req.user.email;
    try {
        const normalizedEmail=email.toLowerCase();
        const user=await userModel.findOne({email:normalizedEmail});
        const myScore=user.codeChefRating;
        const leaderBoard=await userModel.find({codeChefRating:{$gte:0}}).sort({codeChefRating:-1}).select("userName codeChefRating").lean();
        let currentRank=1;
        let prevScore=null;
        let skip=0;
        leaderBoard.forEach((u,index)=>{
        if(prevScore!=null){
            if(u.codeChefRating==prevScore){
                skip++;
            }
            else{
                currentRank+=1+skip;
                skip=0;
            }
        }
        u.rank=currentRank;
        prevScore=u.codeChefRating;
        })
        const higherRankCount=await userModel.countDocuments({codeChefRating:{$gt:myScore}});
        const myRank=higherRankCount+1;
        return res.json({success:true,data:leaderBoard,myRank});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
const fetchCodeForcesLeaderBoard=async(req,res)=>{
    const email=req.user.email;
    try {
        const normalizedEmail=email.toLowerCase();
        const user=await userModel.findOne({email:normalizedEmail});
        const myScore=user.codeForcesRating;
        const leaderBoard=await userModel.find({codeForcesRating:{$gte:0}}).sort({codeForcesRating:-1}).select("userName codeForcesRating").lean();
        let currentRank=1;
        let prevScore=null;
        let skip=0;
        leaderBoard.forEach((u,index)=>{
        if(prevScore!=null){
            if(u.codeForcesRating==prevScore){
                skip++;
            }
            else{
                currentRank+=1+skip;
                skip=0;
            }
        }
        u.rank=currentRank;
        prevScore=u.codeForcesRating;
        })
        const higherRankCount=await userModel.countDocuments({codeForcesRating:{$gt:myScore}});
        const myRank=higherRankCount+1;
        return res.json({success:true,data:leaderBoard,myRank});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
export {fetchLeaderBoard,fetchLeetCodeLeaderBoard,fetchCodeChefLeaderBoard,fetchCodeForcesLeaderBoard};