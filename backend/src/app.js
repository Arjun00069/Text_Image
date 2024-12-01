import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
 const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
// app.use(express.static("public"));
app.use(cookieParser());
app.use(cors({
    origin:process.env.CORS_URI,
    credentials:true
}))

// // Importing routes;
import imageRoutes from  "./routes/image.router.js"

app.use('/api/v1',imageRoutes);


export default app;
