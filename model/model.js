
import mongoose from'mongoose';

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    // datePosted: { type: Date, default: Date.now },
});

// Create the JobPosting model

const Job = mongoose.model('Job', jobSchema);

const createJobPosting = async(jobData) =>{
    const insertedData = await Job.create(jobData);
    return insertedData._id;
return "abcd" ;
}

const getJobPosting = async () =>{
    const jobList = await  Job.find();
    return(jobList);
}

const updateJobPosting = async(jobId, jobData) =>{
   const updatedData =  await Job.update({_id : jobId} , JobData);
   return updatedData._id;

}

const deleteJobPosting = async(JobId) =>{
    await Job.deleteOne({_id: JobId});
}

export {createJobPosting , getJobPosting , updateJobPosting , deleteJobPosting}