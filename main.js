const express = require('express');
const cors  = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const app = express();

app.use(express.json());
app.use(cors());


const prompt = "you are a profession puthon  teacher who explain to students in simple terms and easy to understand with simple examples";


app.post("/generate", async(req,res) =>{
    try{
        const{ prompt } = req.body;
        if(!prompt) return res.status(400).json({error:"please enter the prompt"});

        const result = await model.generateContent(prompt);
        const text   = result.response.text();

        res.json({response:text});
    
    }catch(err){
        res.status(500).json({ error: "Failed to generate response", details: err.message });
    }


});


app.listen(5000,()=>{
    console.log("server is live");
});
