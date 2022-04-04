import React , {useState} from "react";
import {Form, Formik, Field} from "formik"
import { InputGroup, Heading, Box, Button, FormControl, FormLabel } from "@chakra-ui/react";
import router, { useRouter } from "next/router";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { SERVER_ENDPOINTS } from "../config";
import axios from 'axios';


export enum userType {
    COMPANY = "company",
    APPLICANT = "applicant"
}
interface registerProps{

}
 const  Register: React.FC<registerProps> = ({})=>{
    const [email, setEmail] =useState();
    const {query, isReady} = useRouter();
    let typeOfUser = query.type;
    console.log(typeOfUser);
    // if(isReady){
        
    // }
    if(typeOfUser == "company"){
        return(
            <Wrapper variant="small">
                <Formik initialValues={{email:"", password:"",companyName: "", employeeCount: "", companyBio: "" }} 
                onSubmit={async (values, {setErrors}) =>{
    
                    console.log(values);
                    const email = values.email;
                    const password = values.password;
                    const type = "company";
                    const companyName = values.companyName;
                    const companyBio = values.companyBio;
                    const employeeCount = values.employeeCount;
                    const result = await axios.post(`${SERVER_ENDPOINTS}/users/api/signup`,{
                        email,
                        password,
                        type,
                        companyName,
                        employeeCount,
                        companyBio,
    
    
                    }).then((resp) => resp.data).catch((err) =>console.log(err));
                    if(result){
                        console.log(result);
                        if(result.company){
                            router.push("/home?company="+result.company);
                        }
                        else{
                            router.push("/home");
                        }
                        
                    }
                    // const response = await register(values);
                    // if(response.data?.register.errors){
                    //         setErrors(toErrormap(response.data.register.errors));
    
                    // }
                    // else if(response.data?.register.user){
                    //     //worked 
                    //     router.push("/");
                    // }
                    
                    
                    
                }}>
                    {({isSubmitting, handleChange}) => (
                        <Form>
                           
                            <InputField name = 'email'placeholder = 'email' onChange={handleChange} label="email"/>
                            <Box mt = {4}>
                                <InputField name = 'password' onChange={handleChange} placeholder = 'password'label="password" type='password'/>
                            </Box>
                            <Box mt = {4}>
                                <InputField name = 'companyName' onChange={handleChange} placeholder = ' X-treme LLC' label="Company Name" />
                            </Box>
                            <Box mt = {4}>
                                <InputField name = 'employeeCount' onChange={handleChange} placeholder = '10' label="Number of Employees" />

                            </Box>
                            <Box mt = {4}>
                                <InputField name = 'companyBio' onChange={handleChange} placeholder = 'We are a Good Company *wink *wink' label="Company Bio" />

                            </Box>
                           
                            <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme ="teal">register</Button>

                        
    
                        </Form>
                    )
    
                    }
                    
                </Formik>
            </Wrapper>
    
        );
    }
    else {
        console.log("true applicant");
    
        return(
            <Wrapper variant="small">
                <Formik initialValues={{email:"", password:"", applicantName: "", applicantAge:""}} 
                onSubmit={async (values, {setErrors}) =>{

                    console.log(values);
                    const email = values.email;
                    const password = values.password;
                    const type = "applicant";
                    const applicantName = values.applicantName;
                    const applicantAge= values.applicantAge;
                    const result = await axios.post(`${SERVER_ENDPOINTS}/users/api/signup`,{
                        email,
                        password,
                        type,
                        applicantName,
                        applicantAge,



                    }).then((resp) => resp.data).catch((err) =>console.log(err));
                    if(result){
                        console.log(result);

                         if(result.applicant){
                            router.push("/home?applicant="+result.applicant);
                        }
                        else{
                            router.push("/home");
                        }
                        
                    }
                    // const response = await register(values);
                    // if(response.data?.register.errors){
                    //         setErrors(toErrormap(response.data.register.errors));

                    // }
                    // else if(response.data?.register.user){
                    //     //worked 
                    //     router.push("/");
                    // }
                    
                    
                    
                }}>
                    {({isSubmitting, handleChange}) => (
                        <Form>
                            <InputField name = 'email'placeholder = 'email' onChange={handleChange} label="email"/>
                            <Box mt = {4}>
                                <InputField name = 'password' onChange={handleChange} placeholder = 'password'label="password" type='password'/>
                            </Box>
                            <Box mt = {4}>
                                <InputField name = 'applicantName' onChange={handleChange} placeholder = 'Name Greenie' label="Full Name" />
                            </Box>
                            <Box mt = {4}>
                                <InputField name = 'applicantAge' onChange={handleChange} placeholder = '22' label="Age" />

                            </Box>

                           
                            <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme ="teal">register</Button>

                        </Form>
                    )

                    }
                    
                </Formik>
            </Wrapper>

        );
    }
}


export default Register;