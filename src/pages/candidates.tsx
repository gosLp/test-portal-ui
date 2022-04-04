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




export const  candidates: React.FC<{}> = ({}) => {
    
    const {query, isReady} = useRouter();
    const [appdata, setData] = useState(null);
    
    let applicants = [String];
    // const [disable,setDisable] = useState(false);
    // const [apply, setApply] = useState("Apply");
    // let present:boolean = false
    // let JobId = query.compId;
    let jobId = query.jobId;
    // let applicantId = query.applicant;
    
    useEffect( ()=>{
        if(isReady){
            const fetchJobCandidates = async()=>{
                const response = await fetch(`${SERVER_ENDPOINTS}/jobs/${jobId}`);
                const data = await response.json();
                console.log(data);
                const appli = await data.job;
                
                setData(appli);
                
            }  
            fetchJobCandidates();
            
            
            // const fetchMyApplicants = async() =>{
            //     const response =  await fetch(`${SERVER_ENDPOINTS}/applicant/${applicantId}`);
            //     const data = await response.json();
            //     console.log(data);
            // } 
          
            
        }
        else{
            console.log("didnt work")
        }
        
         
    }, [query])
    console.log(appdata);
    console.log(query);

    
    
    return (
        
         <Wrapper variant="regular">
             {appdata?(
                 <>
                    <Heading> Applicants for Job: {appdata.title} </Heading>
                    {appdata && appdata.appliedApplicants.length >=1?(
                 <>
                    
                    {
                        appdata.appliedApplicants.map((applicants)=>{
                            // const appInfo =  axios.get(`${SERVER_ENDPOINTS}/applicant/${applicants}`)
                            //                         .then((resp)=> {
                            //                             console.log(resp.data);
                            //                             set
                            //                         });
                            // console.log(Data);
                            console.log(applicants);
                            return(
                                <>
                                <Stack>
                                    <Box shadow='md' mt={4}
                                        borderWidth='1px'
                                        flex='1'
                                            borderRadius='md'>
                                    <Text margin="auto"> Applicant ID : {applicants}</Text>
                                    
                                    {/* <Text>Description: {job.jobDesc}</Text> */}

                                    {/* <Link ml="auto" onClick={() => {
                                        console.log(query);
                                        router.push({pathname:'/candidates', query: {jobId: job._id }});
                                    }
                                            

                                     }>
                                        Company Job Postings <ExternalLinkIcon mx='2px'/>
                    
                                    </Link> */}
                                   
                                        
                                    </Box>
                                </Stack>
                                   
                                </>
                            );
                        })


                    }
                 </>
             ):(
                 <>
                    <div>No Applicant has applied to this position </div>
                 </>
             )}
                 </>
             ):(
                 <>
                    <div>No Job or Applicant Data</div>
                 </>
             )}
             
             
             {/* <Heading>Company Job Postings</Heading>
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
                                        Company Job Postings <ExternalLinkIcon mx='2px'/>
                    
                                    </Link>
                                   
                                        <Text>Type: {job.jobType}</Text>
                                    </Box>
                                </Stack>
                                   
                                </>
                            );
                        })}
                           
                        </>
                   ):(
                       <>
                            <div>didnt work</div>
                       </>
                   )} 
                    
                 
             </Box>

             */}
        
        </Wrapper>
        
    );
}

export default candidates;