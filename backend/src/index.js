import express from "express";
// import cors from "cors";

const PORT = 5001;
const app = express();

app.use(express.json());

// app.use(cors({
//     origin:"http://localhost:5173",
//     credentials:true,
// }));

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);

})