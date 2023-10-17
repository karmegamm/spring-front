import { Typography } from '@material-tailwind/react';
import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { BookCard } from './bookcard';

export  function BooksTitles() {
    const {title} = useParams();
    const[books,setBooks]= useState([]);
    const[page,setPage] = useState(0);
    
    useEffect(()=>{
        axios.get(`http://localhost:8088/books/getbooksbytitles?title=${title}&page=${page}&size=5`)
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
        if((window.innerHeight + document.documentElement.scrollTop+1)>=(document.documentElement.scrollHeight)){
            setPage(pre=>pre+1);
        }
    }
    
    function handlePay(amount){
        const options={
            key:"",
            key_secret:"",
            amount:amount*100,
            currency:"INR",
            name:"K2BookStore",
            description:"testing "
        }
    }
    return (
        <div className=' md:min-h-[87vh] md:px-14 md:py-5'>
            <Typography variant='h1' className="font-territory pt-5  pl-3 md:text-5xl  text-3xl">
                Books under <span  className='uppercase  md:text-[45px] font-territory text-blue-gray-600 drop-shadow-sm'>{"Titles"}</span>
            </Typography>
            <div className='grid md:grid-cols-2 gap-7 p-5'>
               {books.map((book)=>{
                    return <BookCard book={book}/>
                })}
            </div>
        </div>
    )
}
