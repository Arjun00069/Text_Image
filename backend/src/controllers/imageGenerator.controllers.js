import { error } from "console";
import asyncHandler from "../utils/ayncHandler.js";
import IMAGE from "../models/images.js";
const paraSeperator = (content)=>{
  let para = content.split('\\n\\n');

    return para;
}
const blobToBase64 = async (blob) => {
    const arrayBuffer = await blob.arrayBuffer(); // Convert Blob to ArrayBuffer
    const buffer = Buffer.from(arrayBuffer); // Convert ArrayBuffer to Node.js Buffer
    return buffer.toString('base64'); // Convert Buffer to Base64 string
  };
 const imageGeneration = asyncHandler(async (req,res,next)=>{

  const content = req.body.content;
const para = paraSeperator(content);
// let imageArray=[];
// console.log(para);
// for (let i in para){

//     const response = await fetch(
// 		"https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
// 		{
// 			headers: {
// 				Authorization: "Bearer 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",
// 				"Content-Type": "application/json",
// 			},
// 			method: "POST",
// 			body: JSON.stringify(para[i]),
// 		}
// 	);
//     console.log(response);
// 	const result = await response.blob();
//   console.log(result);
// // console.log(result);
// }
// const para1 =["Cat","Dog"]

// const response = await fetch(
//     "https://api-inference.huggingface.co/models/seawolf2357/flux-lora-military-artillery-k9",
//     {
//         headers: {
//             Authorization: "Bearer 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",
//             "Content-Type": "application/json",
//         },
//         method: "POST",
//         body: "Bullet",
//     }
// );


// const result = await response.blob();
// //  console.log(result);
// console.log(result);
//   const image_content =  await blobToBase64(result);
//   imageArray.push(image_content);

const imagePromises = para.map(async (prompt) => {
    try {
      const response = await fetch("https://api-inference.huggingface.co/models/seawolf2357/ntower", {
        headers: {
          Authorization: `Bearer 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`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(prompt),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
      const result = await response.blob();
      return await blobToBase64(result);
    } catch (error) {
      console.error(`Error fetching image for prompt: ${prompt}`, error);
      return null; // Handle failures by returning null for any failed request
    }
  });

//   Wait for all image promises to resolve
  const imageArray = await Promise.all(imagePromises);
 try {
await IMAGE.create({
    prompt:JSON.stringify(para),
    image:JSON.stringify(imageArray)
})
 } catch (error) {
    
 }
res.json({
    image:imageArray
})
})


export default  {imageGeneration};