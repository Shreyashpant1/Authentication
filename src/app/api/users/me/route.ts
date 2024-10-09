import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse} from "next/server";
import { getDataFromToken } from "@/helpers/getdatafromtoken";

connect()

export async function POST(request:NextRequest){
    //extracting the data from the token 
    const userId = await getDataFromToken(request)
    const user = await User.findOne({_id:userId}).select("-password")
    //check if there is no user present
    return NextResponse.json({
        message:"User found",
        data:user
    })

}  

//complete backend process