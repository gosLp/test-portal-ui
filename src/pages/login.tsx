import React from "react";
import {Form, Formik} from "formik";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper"
import { InputField } from "../components/InputField";
// import { useMutation } from "urql";
// import { toErrormap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import Register from "./register";
import axios from "axios";
import { type } from "os";
import { SERVER_ENDPOINTS } from "../config";
// import { createUrqlClient } from "../utils/createUrqlClient";
// import {withUrqlClient} from 'next-urql';

//  getInfoUser = () =>{

// }


export const Login: React.FC<{}> = ({}) => {
    const router = useRouter();
    console.log(router);
    
    return (
        <Wrapper variant="small">
            <Formik initialValues={{email:"", password:""}} 
            onSubmit={async (values, {setErrors}) =>{
                console.log(values);
                let id;
                const email = values.email;
                const password = values.password;
                const result = await axios.post(`${SERVER_ENDPOINTS}/users/api/login`,{
                    email,
                    password
                    


                }).then((resp) => resp.data).catch((err) =>console.log(err));
                if(result){
                    console.log(result);
                    if(result.company){
                        router.push("/home?company="+result.company);
                    }
                    else if(result.applicant){
                        router.push("/home?applicant="+result.applicant);
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
                        <InputField name = 'email'placeholder = 'email'label="email"/>
                        <Box mt = {4}>
                            <InputField name = 'password'placeholder = 'password'label="password" type='password'/>
                        </Box>
                        <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme ="teal">Login</Button>
                    </Form>
                )

                }
                
            </Formik>
        </Wrapper>
        
    );
}

export default Login;