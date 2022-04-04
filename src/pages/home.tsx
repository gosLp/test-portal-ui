import React , {useEffect, useState} from "react";
import {Form, Formik, Field} from "formik"
import { InputGroup, Heading, Box, Button, FormControl, FormLabel, Text, Link, Input } from "@chakra-ui/react";
import router, { useRouter } from "next/router";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { SERVER_ENDPOINTS } from "../config";
import axios from 'axios';
import { request } from "http";
import { useQuery } from "react-query";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";



export enum userType {
    COMPANY = "company",
    APPLICANT = "applicant"
}

async function fetchJobs(){
    const {data} = await axios.get(`${SERVER_ENDPOINTS}/jobs/all`); 
    console.log(data);   
    return data
}
 async function userRender(id){
     const {data} = await axios.get(`${SERVER_ENDPOINTS}/applicant/${id}`);
     console.log(data);   
     return data 
}
interface registerProps{

}
 const  home: React.FC<registerProps> = ({})=>{
     
    const {isReady, query} = useRouter();
    const [appData, setData] = useState(null);
    const [compData, setCompData] = useState(null);
    const {data, isError,error,isLoading} = useQuery('jobs', fetchJobs);
    const jobData =data;
    let result;

    useEffect( ()=>{
        if(isReady){
            const fetchAppli = async()=>{
                const response = await fetch(`${SERVER_ENDPOINTS}/applicant/${query.applicant}`)
                const data = await response.json();
                // console.log(data);
                const applicant = data.applicant[0];
                setData(applicant);
            }   
            const fetchComp = async() =>{
                const response = await fetch(`${SERVER_ENDPOINTS}/company/${query.company}`)
                const data = await response.json();
                const comp = data.company[0];
                setCompData(comp);
            }
            if(query.applicant){
                fetchAppli();

            }
            if(query.company){
                fetchComp();
            }
        }
        
         
    }, [])
     
     
     if(query.company){
         console.log(compData);
         if(compData){
             return(
                <>
                <div>Company Page</div>
                { !compData ?(
                    <>
                        <div>didnt work</div>
                    </>
                ):(<>
                    <div><Text > BIO: {compData.companyBio} </Text>
                <Text> Number of Employees: {compData.employeeCount}</Text></div>
                <Link ml="auto" onClick={() => 
                                    router.push({pathname:'/job', query: {compId: compData._id }})
                                }>
                                    Create New Job Listing <ExternalLinkIcon mx='2px'/>
                    
                </Link>
                </>)}
                
                
                <Text >Jobs Created by Company</Text>
                <Button >Look</Button>

             </>
             );
         }
         else{
            return(
                <div>didnt work</div>
             
                );
         }
         
     }
     else if(query.applicant){
        console.log(appData);
        // const result = axios.get(`${SERVER_ENDPOINTS}/jobs/all`)
        // result.then((doc)=>{

        // }).catch()
        if(!isLoading){
            return(
                <>
                    <Heading>Applicant:</Heading>
                    {appData && <div>{appData.applicantName}</div>}
                    <Box mt = {4}>
                            <Input name="Name" placeholder={"Name"}></Input>
                        </Box>
                    <Box mt={4}>
                     <h1>Jobs</h1>
                    </Box>
                            {

             jobData.jobs.map((job, index) => {
          return (
              <>
              <Box
                 p={5}
                 shadow='md'
                 borderWidth='1px'
                 flex='1'
                 borderRadius='md'
                 mt={4}
             >
                
                 <Heading fontSize='xl'>{job.title}</Heading>
                 {/* <NextLink href='/manageDriver'> */}
                     <Link ml="auto" onClick={() => 
                         router.push({pathname:'/viewjob' , query:{jobId:job._id, applicant:appData._id }})
                    }>
                        Job  <ExternalLinkIcon mx='2px'/>
        
                    </Link>
                     <Link ml="auto" onClick={() => 
                         router.push({pathname:'/company'})
                     }>
                        Company  <ExternalLinkIcon mx='2px'/>
        
                   </Link>
    
              
                
             </Box>
                
             </>
          )
         
              })
         }
                    
                </>
            );
           
        }
        else{
            return(
                <>
                    <div>did not work</div>
                </>
            );
        }
         
     }
     else{
        return(
            <Wrapper>
                <div>Hello Home</div>
            </Wrapper>
            
        );
     }
    
   
}


export default home;