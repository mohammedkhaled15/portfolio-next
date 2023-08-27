import mongoose from "mongoose";

let isConnected = false

const connectDB = async()=>{

  mongoose.set("strictQuery",true)

  if(isConnected){
    console.log("You are already connected to MongoDb!")
    return
  }

  try {
    await mongoose.connect(process.env.MONGO_URI,{
      dbName:"portfolioDb",
      useUnifiedTopology:true,
      useNewUrlParser:true
    })
    isConnected = true
    console.log("Connected to MongoDb")
  } catch (error) {
    console.log(error)
  }
}

export default connectDB

