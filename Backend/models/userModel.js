import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    userName:{type:String,required:true,unique:true,lowercase:true,trim:true},
    firstName:{type:String,required:true},
    middleName:{type:String},
    lastName:{type:String},
    email:{type:String,unique:true,required:true,lowercase:true},
    password:{
        type:String,
        required:function(){
            return this.authType=='local';
        }
    },
    googleId:{type:String},
    authType:{type:String,required:true},
    leetCode:{type:String,default:""},
    codeForces:{type:String,default:""},
    codeChef:{type:String,default:""},
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],
    friendRequests:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }]
});
const userModel=mongoose.models.user || mongoose.model("user",userSchema);
export default userModel