import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useContext } from "react";
import { HomePageContext } from "../../../Helper/HomePageContexts/HomePageProvider";


export default function Page({pageCount}) {
  const {setPage} = useContext(HomePageContext)

  const handleChange = (event, value) => {
    setPage(value);
    console.log(value);
  };

  
  return (
        <div>
        <Stack spacing={5}>   
            <Pagination  count={pageCount} variant="outlined" shape="rounded"  size="large" onChange={handleChange}/>  
        </Stack>
        </div>
    
  );
}