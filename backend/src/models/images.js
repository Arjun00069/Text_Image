import mongoose from "mongoose";

const imageschema = new mongoose.Schema({
    prompt:{
        type:String
    },
    image:{
        type:String
    }
},
{
    timestamps:true
}
)

const  IMAGE = mongoose.model("IMAGE",imageschema);
export default IMAGE;