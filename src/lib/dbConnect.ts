import mongoose from "mongoose";

type ConnectionObject = {
   isConnected?: number;
} 

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
   if(connection.isConnected) {
      return;
   }
   try{
      console.log("DB connection", process.env.MONGODB_URI)
      
      await mongoose.connect(process.env.MONGODB_URI || '',{});

      connection.isConnected = mongoose.connections[0].readyState;

      console.log("DB connected Successfully");
      
   }catch(err){
      console.log("DB connection failed", err);
      
      process.exit(1);
   }
}

export default dbConnect;