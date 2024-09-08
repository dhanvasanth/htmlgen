import express from "express"
import bodyParser from "body-parser"
import env from "dotenv"
const app = express();
const port = 3000;
const body = app.use(bodyParser.urlencoded({extended:true}));
env.config();
const API_KEY = process.env.API_KEY;
import { GoogleGenerativeAI } from "@google/generative-ai"
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.post("/generate",async(req,res)=>{

    const prompt =`Using the theme: "${req.body.htmlTheme}" and content: "${req.body.promptcontent}", generate only the HTML code. Do not include any comments, explanations, or additional text. Strictly return only the HTML code without any comments or additional content.;`;
    const result = await model.generateContent(prompt);
    
    console.log(result.response.text());
    res.send(result.response.text());
    
})

app.listen(port,()=>{
    console.log("server is running");
})