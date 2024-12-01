import logo from './logo.svg';
import {useState} from "react"
import './App.css';
import axios from "axios";
import server from '.';
import { p } from './constants';
const Spinner = () => <div className="loader"></div>;
function App() {
  const[content,setContent] =useState(""
  );
  const [response,setReaponse] =useState([])
  const [loading,setLoading] =useState(false);
  const daatHAndler = async ()=>{
const CHUNKSIZE = 500;
const Content_To_Send = JSON.stringify(content);
const config ={
      headers:{
        'content-type' : "application/json",

      }
    }
    setLoading(true);
let {data}= await axios.post(`${server}/content`,{
  content:Content_To_Send
},config)
console.log(data);
setReaponse(data.image);
setLoading(false);
// const NUMBER_OF_CHHUNK = (Content_To_Send.length/CHUNKSIZE);

// for (let chunk = 0; chunk < NUMBER_OF_CHHUNK; chunk++) {
//   let CHUNK = Content_To_Send.slice(chunk,chunk+CHUNKSIZE);
//   const config ={
//     headers:{
//       'content-type' : "application/octet-stream",
//       'content-length' : CHUNKSIZE,
//     }
//   }
//     let {data}= await axios.post(`${server}/content`,{
//         content:CHUNK
//     },config)
//     console.log(data);

// }
}
const clearHandler = async ()=>{
  setContent("");
  setReaponse([]);
}
 
  
return (
  <div className="App">
    <h1>Enter Paragraphs and Get Related Images</h1>
    
    {/* Textarea for inputting multiple paragraphs */}
    <textarea
      rows={10}
      cols={100}
      value={content}
      onChange={(e) => setContent(e.target.value)}
      placeholder="Enter text, separate paragraphs with a new line."
    />

    {/* Button to submit the data */}
    <div className="button_container" style={{gap:"3em",display:"flex"}}>
    <div className="submit-btn" onClick={daatHAndler}>Submit</div>
    <div className="submit-btn" onClick={clearHandler}>Clear</div>
    </div>


    {loading===false?<div className="response-container">
      {response.map((response, index) => (
        <div key={index} className="response-item">
          <p><strong>Paragraph {index + 1}:</strong> {"content"}</p>
          {response ? (
            <img src={`data:image/png;base64,${response}`} alt={`Related to paragraph ${index + 1}`} />
          ) : (
            <p>No image available.</p>
          )}
        </div>
      ))}
      
        </div>:<Spinner/>}
    
    </div>
  
);
}

export default App;
