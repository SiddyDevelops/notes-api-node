const express = require("express");
const app = express();
const noteRouter = require("./routes/notesRoutes");
const userRouter = require("./routes/userRoutes");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config()

app.use(express.json())
app.use(cors())
app.use("/user",userRouter)
app.use("/note",noteRouter)

app.get("/",(req,res)=>{
    res.send("Notes API by SIDDHARTH SINGH");
});

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT,()=>{
        console.log("Server started on port " + PORT)
    })
}).catch((error)=>{
    console.log(error)
})