import { Box, Button } from "@mui/material";
import Link from "next/link";


export default function Home() {
  return (
 <Box className="homepage">
  <Box position={"relative"} height={"100vh"} display={"flex"} justifyContent={"center"}>
    <Box  position={"absolute"} bottom={40} width={"100%"} display={"flex"} justifyContent={"center"}>
      <Link href={"/page/question"} style={{width:"100%", display:"flex", justifyContent:"center"}}>
      <Button style={{
        width:"20%",
        height:"50px",
        backgroundColor:"#FF6B6B",
        color:"#fff",
        borderRadius:"16px",
        fontSize:"20px",
    textTransform:"none"
      }}>
        Start
      </Button>
      </Link>
    
    </Box>

  </Box>

 </Box>
  );
}
