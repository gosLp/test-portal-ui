import React, { useEffect, useState } from "react";
import {Field, Form, Formik} from "formik";
import { Box, Button, FormControl, FormLabel, Heading, Text, Textarea, Wrap } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper"
import { InputField } from "../components/InputField";

import { useRouter } from "next/router";
import Register, { userType } from "./register";
import axios from "axios";
import { type } from "os";
import { SERVER_ENDPOINTS } from "../config";
import { useQuery } from "react-query";



export enum JobType {
    FULLTIME = "fulltime",
    INTERN = "internship",
    PARTTIME= "parttime",
    CONTRACT = "contract",
    VOLUNTERR = "volunteer"
}




export const  ViewJob: React.FC<{}> = ({}) => {
    
    const {query, isReady} = useRouter();
    const [jobdata, setData] = useState(null);
    const [disable,setDisable] = useState(false);
    const [apply, setApply] = useState("Apply");
    
    let jobId = query.jobId;
    let applicantId = query.applicant;
    
    useEffect( ()=>{
        if(isReady){
            const fetchJob = async()=>{
                const response = await fetch(`${SERVER_ENDPOINTS}/jobs/${jobId}`)
                const data = await response.json();
                console.log(data);
                const job = data.job;
                 setData(job);
            }   
          
            fetchJob();
        }
        else{
            console.log("didnt work")
        }
        
         
    }, [query])
    console.log(jobdata);
    console.log(query);

    
    
    return (
        
         <Wrapper variant="small">
             <Heading>Job Details</Heading>
             <Box p={5}
                shadow='md'
                borderWidth='1px'
                flex='1'
                borderRadius='md'>
                   {jobdata?(
                        <>
                            <Text>TITLE : {jobdata.title}</Text>
                            <Text>Description: {jobdata.jobDesc}</Text>
                            <Text>Type: {jobdata.jobType}</Text>
                            <Text>Company: {jobdata.company}</Text>
                        </>
                   ):(
                       <>
                            <div>didnt work</div>
                       </>
                   )} 
                    
                 
             </Box>

             <Button mt={4} disabled={disable} type="submit"  colorScheme ="teal" onClick={async ()=>{
                 const result = await axios.post(`${SERVER_ENDPOINTS}/jobs/apply/${jobdata._id}`,{
                     applicantId
                 });
                 console.log(result.data);
                 if(result.data.job._id ===jobdata._id){
                     setDisable(true);
                     setApply("Applied");
                 }
             }} > {apply}</Button>
        
        
        </Wrapper>
        
    );
}

export default ViewJob;