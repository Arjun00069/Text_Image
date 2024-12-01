import { Router } from "express";
import imageControllers  from "../controllers/imageGenerator.controllers.js"
const  router = Router();


router
.route('/content')
.post(imageControllers.imageGeneration);




export default router;