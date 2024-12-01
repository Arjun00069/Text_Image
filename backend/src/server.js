import 'dotenv/config'
import app from "./app.js";
import connectDb from "./db/db.js";


app.get('/',(req,res)=>{
    res.send("Hellow world");
})
connectDb()
.then(()=>{
    app.listen(8000,()=>{
        console.log("server is listning on port 8000")
    })
})
.catch((error)=>{
    console.log("Errron in running srver");
})
