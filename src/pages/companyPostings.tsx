import React, { useEffect, useState } from "react";
import {Field, Form, Formik} from "formik";
import { Box, Button, FormControl, FormLabel, Heading, Link, Stack, Text, Textarea, Wrap } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper"
import { InputField } from "../components/InputField";

import router, { useRouter } from "next/router";
import Register, { userType } from "./register";
import axios from "axios";
import { type } from "os";
import { SERVER_ENDPOINTS } from "../config";
import { useQuery } from "react-query";
import { ExternalLinkIcon } from "@chakra-ui/icons";



export enum JobType {
    FULLTIME = "fulltime",
    INTERN = "internship",
    PARTTIME= "parttime",
    CONTRACT = "contract",
    VOLUNTERR = "volunteer"
}




export const  companyPostings: React.FC<{}> = ({}) => {
    
    const {query, isReady} = useRouter();
    const [jobdata, setData] = useState(null);
    const [disable,setDisable] = useState(false);
    const [apply, setApply] = useState("Apply");
    let present:boolean = false
    let compId = query.compId;
    // let jobId = query.jobId;
    // let applicantId = query.applicant;
    
    useEffect( ()=>{
        if(isReady){
            const fetchPostings = async()=>{
                const response = await fetch(`${SERVER_ENDPOINTS}/jobs/company/${compId}`);
                const data = await response.json();
                // console.log(data);
                const job = data.jobs;
                 setData(job);
            }  
            // const fetchMyJobs = async() =>{
            //     const response =  await fetch(`${SERVER_ENDPOINTS}/jobs/applied/${applicantId}`);
            //     const data = await response.json();
            //     console.log(data);
            // } 
          
            fetchPostings();
        }
        else{
            console.log("didnt work")
        }
        
         
    }, [query])
    console.log(jobdata);
    console.log(query);

    
    
    return (
        
         <Wrapper variant="small">
             <Heading>Company Job Postings</Heading>
             <Box p={5}
                >
                   {jobdata?(
                        <>
                        {jobdata.map((job)=>{
                            console.log(job);
                            return(
                                <>
                                <Stack>
                                    <Box shadow='md' mt={4}
                                        borderWidth='1px'
                                        flex='1'
                                            borderRadius='md'>
                                    <Text margin="auto">TITLE : {job.title}</Text>
                                    
                                    <Text>Description: {job.jobDesc}</Text>

                                    <Link ml="auto" onClick={() => {
                                        console.log(query);
                                        router.push({pathname:'/candidates', query: {jobId: job._id }});
                                    }
                                            

                                     }>
                                        Applied Candidates for Job <ExternalLinkIcon mx='2px'/>
                    
                                    </Link>
                                   
                                        <Text>Type: {job.jobType}</Text>
                                    </Box>
                                </Stack>
                                    {/* <Text>Company: {job.company}</Text> */}
                                </>
                            );
                        })}
                            {/* <Text>TITLE : {jobdata.title}</Text>
                            <Text>Description: {jobdata.jobDesc}</Text>
                            <Text>No Apllied Applicants: {jobdata.appliedApplicants.length}</Text>
                            <Text>Type: {jobdata.jobType}</Text>
                            <Text>Company: {jobdata.company}</Text> */}
                        </>
                   ):(
                       <>
                            <div>didnt work</div>
                       </>
                   )} 
                    
                 
             </Box>

             {/* <Heading>Job Details</Heading>
             <Box p={5}
                shadow='md'
                borderWidth='1px'
                flex='1'
                borderRadius='md'>
                   {jobdata?(
                        <>
                            <Text>TITLE : {jobdata.title}</Text>
                            <Text>Description: {jobdata.jobDesc}</Text>
                            <Text>No Apllied Applicants: {jobdata.appliedApplicants.length}</Text>
                            <Text>Type: {jobdata.jobType}</Text>
                            <Text>Company: {jobdata.company}</Text>
                        </>
                   ):(
                       <>
                            <div>didnt work</div>
                       </>
                   )} 
                    
                 
             </Box>
            <Box>
                { 
                jobdata?.appliedApplicants.map(a =>{
                    if(applicantId === a.toString()){
                        console.log("Allready Applied");
                        present = true;
                       
                    }
                    else{
                        present = false;
                    }
                    
                })} 
                {
                    present?(
                        <>
                             <>
                                <Button disabled={true} mt={4} colorScheme="teal">Applied</Button>
                            </>
                        </>
                    ):(
                        <>
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
            
                        </>
                    )
                }  
             
            </Box> */}
        
        </Wrapper>
        
    );
}

export default companyPostings;