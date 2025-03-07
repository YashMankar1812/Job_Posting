import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors";
import { createJobPostingController, deleteJobPostingController, displayJobPostings, getJobPostingController, updateJobPostingController } from "./controller/controller.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: "https://job-posting-1.onrender.com",
  credentials: true, 
}));


try{
  await mongoose.connect(process.env.MONGO_URL).then((res) => {
    console.log('Connected to MongoDB');

  });

}catch(error){
  console.error(error);
  process.exit(1);
}

const PORT = process.env.PORT || 4000;
// Middleware 
app.set('view engine', 'ejs');
// app.set('views', path.join(__views, 'views'));
app.use(express.json());

app.get('/', displayJobPostings);
app.post("/api/jobs", createJobPostingController);
app.get("/api/jobs",getJobPostingController);
app.put("/api/jobs/:id",updateJobPostingController);
app.delete("/api/jobs/:id", deleteJobPostingController);




// Start the server


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


