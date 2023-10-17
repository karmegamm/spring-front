import React, { useEffect, useState } from "react";
import {Button, Spinner,Typography} from "@material-tailwind/react";
import axios from 'axios';
import Swal from 'sweetalert2'
import {  TitleCard } from "./titlecard";
import { useAuth } from "../../context/AuthContext";

export function Books() {
  const[books,setBooks]= useState([]);
  const[page,setPage] = useState(0);
  const {isAdmin} = useAuth();
  useEffect(()=>{
    axios.get(`http://localhost:8088/books/gettitles?page=${page}&size=12`)
      .then(response => {
        setBooks(pre=>[...pre,...response.data])
        console.log(response.datadata);
      })
      .catch(error => {
      })
  },[page])

  useEffect(()=>{
    window.addEventListener("scroll",handleScroll);
    return ()=>window.removeEventListener('scroll',handleScroll);
  },[])
  
  function handleScroll(){
    console.log(document.documentElement.scrollHeight);
    if((window.innerHeight + document.documentElement.scrollTop+1)>=(document.documentElement.scrollHeight)){
      setPage(pre=>pre+1);
    }
  }

  return <div className="md:min-h-[86vh] flex md:flex-row flex-col md:mt-5 md:gap-3">
    <div className="md:min-w-[82%] rounded-2xl overflow-hidden">
      <Typography variant="h1" color="blue-gray" className="font-territory pt-5 md:px-14 pl-3 md:text-5xl  text-3xl flex justify-between">
          Explore books by Title {isAdmin&&<Button variant="gradient" color="orange" size="sm" className="">New Title</Button>}
      </Typography>
      <div className="grid md:grid-cols-6 grid-cols-2 p-2 gap-2 md:p-4 md:gap-5 mt-4 md:px-14">
        {books?.map((book,index)=>{
          return <TitleCard key={index} book={book}/> 
        })}
      </div>
    </div>
  </div>;
 
}

