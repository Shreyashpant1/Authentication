import mongoose from "mongoose";
export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection=mongoose.connection;
        connection.on('connected', () =>{
            console.log('MongoDB connceted');
        })
        connection.on('error', (err) => {
            console.log('MONGODB connection error.Please make sure MONGODB is Running' +err);
            process.exit();
        })
    } catch (error) {
        console.log('something gone wrong!');
        console.log('error');
        
    }

}