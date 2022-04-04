import React from 'react'
import {useQuery} from 'react-query'
import axios from 'axios'

async function fetchPosts(){
    const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts')    
    return data
}

export const Posts: React.FC<{}> = ({}) =>{
    const {data, error, isError,isLoading} = useQuery('posts', fetchPosts)
    if(isLoading){
        return <div>Loading...</div>
    }
    if(isError){
        return <div>Error! </div>
    }
    return(
        <div className='container'>
        <h1>Posts</h1>
        {
            data.map((post, index) => {
                return <li key={index}>{post.title}</li>
            })
        }

        </div>
    )
}

export default Posts;