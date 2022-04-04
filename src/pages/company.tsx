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




export const  Company: React.FC<{}> = ({}) => {
    
    const {query, isReady} = useRouter();
    const [companyData, setData] = useState(null);
    // const [disable,setDisable] = useState(false);
    // const [apply, setApply] = useState("Apply");
    // let present:boolean = false
    let compId = query.compId;

    // let jobId = query.jobId;
    // let applicantId = query.applicant;
    
    useEffect( ()=>{
        if(isReady){
            const fetchCompDetails = async()=>{
                const response = await fetch(`${SERVER_ENDPOINTS}/company/${compId}`)
                const data = await response.json();
                console.log(data);
                const company = data.company;
                 setData(company);
            }  
            // const fetchMyJobs = async() =>{
            //     const response =  await fetch(`${SERVER_ENDPOINTS}/jobs/applied/${applicantId}`);
            //     const data = await response.json();
            //     console.log(data);
            // } 
          
            fetchCompDetails();
        }
        else{
            console.log("didnt work")
        }
        
         
    }, [query])
    console.log(companyData);
    console.log(query);

    
    
    return (
        
         <Wrapper variant="small">
             <Heading>Company Details</Heading>
             <Box p={5}
                shadow='md'
                borderWidth='1px'
                flex='1'
                borderRadius='md'>
                   {companyData?(
                        <>
                            <Text>Company Name : {companyData[0].companyName}</Text>
                            <Text>Company Bio: {companyData[0].companyBio}</Text>
                            <Text>Number of Employees: {companyData[0].employeeCount}</Text>
                            
                        </>
                   ):(
                       <>
                            <div>didnt work</div>
                       </>
                   )} 
                    
                 
             </Box>
            
            
        
        </Wrapper>
        
    );
}

export default Company;