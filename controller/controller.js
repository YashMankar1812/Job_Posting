import{createJobPosting , getJobPosting, updateJobPosting ,deleteJobPosting} from "../model/model.js" ;

const createJobPostingController = async(req, res) =>{
    const body = req.body;
    try{
        const newJobPostId = await createJobPosting(body);
        // res.send(newJobPostId);
        res.status(201).json({
            message: "Job created successfully!",
            jobId: newJobPostId,
            timestamp: new Date().toISOString(), // Add server timestamp
            createdBy: req.user?.name || "Anonymous", // Include user info if available
            createdJob: body
        });
        
    }catch(error){
        console.error(error);
        res.status(500).send(`The input invalid: ${error._message}`);
    }
}

const getJobPostingController = async(_, res) =>{
  const jobList = await  getJobPosting();
    res.send(jobList);

}

const updateJobPostingController = async(req, res) =>{
    const jobId = req.params.id;
    const body = req.body;
    try{
      const updatedJobId =  await updateJobPosting(jobId, body);
        // res.send(`Job updated successfully : ${updatedJobId}`);
        res.status(200).json({
            message: "Job posting updated successfully!",
            updatedJob: updatedJob, // Return the updated job details
            jobId: jobId,
        });
    }catch(error){
        console.error(error);
        res.status(500).send(`The input invalid: ${error._message}`);
    }


}

const deleteJobPostingController = async(req, res) =>{
    const jobId = req.params.id;
    try{
         await deleteJobPosting(jobId);
        // res.send(`Job deleted successfully : ${jobId}`);
        res.status(200).json({
            message: "Job posting deleted successfully!",
            jobId: jobId,
            nextSteps: [
                "Create a new job posting",
                "Go back to the job listings page"
            ],
        });
    }catch(error){
        console.log(error);
        res.status(500).send(`Failed to delete job: ${error._message}`);

    }

 }

// Follwing method are for Views

const displayJobPostings = async (_, res) =>{
    res.render('index');
}

export{
    createJobPostingController,
    getJobPostingController,
    updateJobPostingController,
    deleteJobPostingController,
    displayJobPostings
}


