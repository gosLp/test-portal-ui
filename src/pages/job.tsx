import React from "react";
import {Field, Form, Formik} from "formik";
import { Box, Button, FormControl, FormLabel } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper"
import { InputField } from "../components/InputField";

import { useRouter } from "next/router";
import Register, { userType } from "./register";
import axios from "axios";
import { type } from "os";
import { SERVER_ENDPOINTS } from "../config";



export enum JobType {
    FULLTIME = "fulltime",
    INTERN = "internship",
    PARTTIME= "parttime",
    CONTRACT = "contract",
    VOLUNTERR = "volunteer"
}


export const Job: React.FC<{}> = ({}) => {
    const router = useRouter();
    let compId = router.query.compId;
    console.log(router.query);
    
    return (
        <Wrapper variant="small">
            <Formik initialValues={{desc:"", title:"", type:""}} 
            onSubmit={async (values, {setErrors}) =>{
                console.log(values);
                let id;
                const desc = values.desc;
                const title = values.title;
                const type = values.type;
                const result = await axios.post(`${SERVER_ENDPOINTS}/jobs/create`,{
                    compId,
                    desc,
                    title,
                    type
                    


                }).then((resp) => {
                    // console.log(resp.data);
                    return resp.data
                }).catch((err) =>console.log(err));
                if(result){
                    // console.log(result);
                    // if(result.company){
                    //     router.push("/home?company="+result.company);
                    // }
                    // else if(result.applicant){
                    //     router.push("/home?applicant="+result.applicant);
                    // }
                    // else{
                    //     router.push("/home");
                    // }
                    if(result.compId){
                        router.push("/home?company="+result.compId);
                    }
                    else{
                        router.push("/home");
                    }
                }
                // if(response.data?.login.errors){
                //         setErrors(toErrormap(response.data.login.errors));

                // }
                // else if(response.data?.login.user){
                //     //worked 
                //     if(typeof router.query.next == "string"){
                //         router.push(router.query.next)

                //     }
                //     else{
                //         router.push("/");
                //     }
                // }
                
            }}>
                {({isSubmitting}) => (
                    <Form>
                        <InputField name = 'desc'placeholder = 'Description'label="desc"/>
                        <Box mt = {4}>
                            <InputField name = 'title'placeholder = 'Title'label="title" />
                        </Box>
                        <Box mt={4}>
                        <FormControl>
                          <FormLabel htmlFor="userType"> Type</FormLabel>
                          <Field  as= "select" name = 'type' variant = 'filled' placeholder = "<select-one>">
                            <option value={JobType.FULLTIME}> Full-Time</option>
                            <option value={JobType.INTERN}>Internship</option>
                            <option value={JobType.PARTTIME}> Part-Time</option>
                            <option value={JobType.VOLUNTERR}>Volunteer</option>
                            <option value={JobType.CONTRACT}> Contract</option>
                           
                          </Field>
                        </FormControl>
                        </Box>
                        <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme ="teal">Login</Button>
                    </Form>
                )

                }
                
            </Formik>
        </Wrapper>
        
    );
}

export default Job;