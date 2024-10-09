import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse} from "next/server";



connect()


export async function POST(request: NextRequest){
    try {
        const reqBody=await request.json()
        const {token}=reqBody
        console.log(token);
        const user = await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})

        if (!user) {
            return NextResponse.json({error:"Invalid Token Entry"},{status:300})
        }
        console.log(user);

        user.isVerified=true
        user.verifyToken=undefined
        user.verifyTokenExpiry=undefined
        await user.save()   //await is used because it will be saved to the database
        
        return NextResponse.json({
            message:"Email Verified successfully",
            success:true 
        },{status:500})
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}