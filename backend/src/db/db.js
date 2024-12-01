import mongoose from "mongoose";

const connectDb=  async ()=>{
    console.log(process.env.MONGO_URI)
    try {
      const connectionInstance = await  mongoose.connect(`${process.env.MONGO_URI}/imagetest`)
      console.log(`Data base connected Connection Host:${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(`Error in connecting database:${error}`)
    }
}
export  default connectDb ;