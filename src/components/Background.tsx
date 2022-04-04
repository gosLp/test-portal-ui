import { Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function getWindowDimensions(){
    const {innerWidth:width, innerHeight: height} = window;
    return{
        width,
        height
    };
}

function useWindowDimensions(){
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(()=>{
        function handleResize(){
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize)
    },[]);

    return windowDimensions;
}
function Background(){

   const {width, height} = useWindowDimensions();
    const img = `http://source.unplash.com/random/${width}x${height}`

    return (
        <>
        <div>

        {width} x {height}
    </div>
    <Image
        position="fixed"
        top={0}
        left= "0"
        bottom={0}
        right ={0}
        zIndex={1}
        src={img}
        alt="bg"
    />
    </>
    );
}

export default Background;