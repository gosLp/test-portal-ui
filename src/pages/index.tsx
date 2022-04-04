import { Container, Box, Heading } from "@chakra-ui/react"

const Index = () => {
  return(
    <Container>
      <Box borderRadius='lg' bg='red' p={3} mb={6 } alignSelf='center'>
        Hello, Welcome to the Job Post
      </Box>
       <Box display={{md:'flex'}}>
          <Box flexGrow={1}>
            <Heading as='h2' variant="page-title">JobPost</Heading>
            <p> A Website to help look for Jobs listings from companies, and companies to list their jobs to find you.</p>
            <p> First Register or Login as an Applicant or a Company to Either look for Job Posts or Put up Job Posts.</p>
          
          </Box>
      </Box>
      {/* <div>hello World</div> */}
    </Container>
  )
}

  


export default Index
