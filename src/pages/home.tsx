import React , {useEffect, useState} from "react";
import {Form, Formik, Field} from "formik"
import { InputGroup, Heading, Box, Button, FormControl, FormLabel, Text } from "@chakra-ui/react";
import router, { useRouter } from "next/router";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { SERVER_ENDPOINTS } from "../config";
import axios from 'axios';
import { request } from "http";



export enum userType {
    COMPANY = "company",
    APPLICANT = "applicant"
}
interface registerProps{

}
 const  home: React.FC<registerProps> = ({})=>{
    const {isReady, query} = useRouter();
    let result;

    useEffect( ()=>{
         if(isReady){
            console.log(query);
         }
         
         if(query.applicant){
             axios.get(`${SERVER_ENDPOINTS}/applicant/${query.applicant}`).then((resp) => {console.log(resp.data); 
                result = resp.data}).catch((err) =>console.log(err));
            console.log(result);
         }
         if(query.company){
             axios.get(`${SERVER_ENDPOINTS}/company/${query.company}`).then((resp) => {console.log(resp.data); 
                result = resp.data}).catch((err) =>console.log(err));
            console.log(result);
         }
         
    }, [])
     
     
     if(query.company){
         return(
             <>
                <div>Company Page</div>
                <Text >All Listed Jobs</Text>
                <Button>Look</Button>

             </>
             
         );
     }
     else if(query.applicant){
         return(<>
         
             <Box mt={4}>
                 
             </Box>
                 <div>Applicant Page</div>
                 </>
         )
     }
     else{
        return(
            <Wrapper>
                <div>Hello Home</div>
            </Wrapper>
            
        );
     }
    
    // const [email, setEmail] =useState();

    
    // return(
    //     <Wrapper variant="small">
    //         <Formik initialValues={{email:"", password:"", type: ""}} 
    //         onSubmit={async (values, {setErrors}) =>{

    //             console.log(values);
    //             const email = values.email;
    //             const password = values.password;
    //             const type = values.type;
    //             const result = await axios.post(`${SERVER_ENDPOINTS}/users//api/signup`,{
    //                 email,
    //                 password,
    //                 type


    //             }).then((resp) => resp.data).catch((err) =>console.log(err));
    //             if(result){
    //                 router.push("/home");
    //             }
    //             // const response = await register(values);
    //             // if(response.data?.register.errors){
    //             //         setErrors(toErrormap(response.data.register.errors));

    //             // }
    //             // else if(response.data?.register.user){
    //             //     //worked 
    //             //     router.push("/");
    //             // }
    //             console.log(result);
                
                
    //         }}>
    //             {({isSubmitting, handleChange}) => (
    //                 <Form>
    //                     <InputField name = 'email'placeholder = 'email' onChange={handleChange} label="email"/>
    //                     <Box mt = {4}>
    //                         <InputField name = 'password' onChange={handleChange} placeholder = 'password'label="password" type='password'/>
    //                     </Box>
    //                     <Box mt={4}>
    //                     <FormControl>
    //                       <FormLabel htmlFor="userType"> Type</FormLabel>
    //                       <Field  as= "select" name = 'type' variant = 'filled' placeholder = "<select-one>">
    //                         <option value={userType.COMPANY}> Company</option>
    //                         <option value={userType.APPLICANT}>Applicant</option>
                           
    //                       </Field>
    //                     </FormControl>
    //                     </Box>
    //                     <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme ="teal">register</Button>

    //                 </Form>
    //             )

    //             }
                
    //         </Formik>
    //     </Wrapper>

    // );
}


export default home;