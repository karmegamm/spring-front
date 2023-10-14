import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import {Card,Input,Checkbox,Button,Typography, Textarea} from "@material-tailwind/react";
import img from '../../assets/profile-book.svg'
import {BookOpenIcon} from "@heroicons/react/24/solid";
import axios from 'axios'
import Swal from 'sweetalert2'

export  function Bookadd() {
  const [details,setDetails] = useState({});
  const navigate = useNavigate();
  const {isAdmin} = useAuth();
  useEffect(()=>{
    if(!isAdmin){
      navigate('/home')
    }
  },[])

  
  function handleChange(e){
    const {name,value,files} = e.target;
    if(name==='bookImageFile'){
      setDetails({...details,[name]:e.target.files[0]});
    }else{
      setDetails({...details,[name]:value});
    }
  }

  function handleSubmit(){
    console.log("hello");
    const { bookName,author,title,price,stockQuantity,description,bookImageFile} = details;
    if (!bookName || !author||!title||!price||!stockQuantity||!description||!bookImageFile) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields!',
      });
    }else{
      const formDataToSend = new FormData();
      for (const key in details) {
        formDataToSend.append(key, details[key]);
      }
      fetchData(formDataToSend);
    }
  }

  function fetchData(formDataToSend){
    axios.post(`http://localhost:8088/books/save`, formDataToSend)
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Update Successfully ..!',
        });
        setDetails({});
        document.querySelectorAll(".inp")?.forEach(element => {
          element.value="";
        });
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong !',
        });
      console.error(error)});
  }
  console.log(details);
  return (
    <div className='flex md:flex-row flex-col p-5 justify-center md:gap-36 gap-20 items-center lg:min-h-[90vh]'>
     
      <div className="md:w-[40%] w-[90%]">
        <Card className="md:p-6 md:px-20 p-8 bg-white/80"  shadow={true}>
          <Typography variant="h4" color="blue-gray"  className="text-center font-territory flex justify-center items-center gap-3">
             <BookOpenIcon  color={"orange"} className='w-7 h-7'/> Book Details
          </Typography>
            <div className="mt-6  flex flex-col gap-5">
              <Input className="inp" size="lg" name="bookName" onChange={handleChange} label="bookName" />
              <Input className="inp" size="lg" name="author" onChange={handleChange}  label="author" />
              <Input className="inp" type="text" name="title" onChange={handleChange} size="lg" label="title" />
              <div className='flex  md:flex-row flex-col gap-5 md:justify-center md:items-center  md:gap-3'>
                <Input className="inp" type="text" name="price" onChange={handleChange} size="lg" label="price" />
                <Input className="inp" type="text" name="stockQuantity" onChange={handleChange} size="lg" label="stockQuantity" />
              </div>
              <Textarea className="inp" type="text" name="description" onChange={handleChange} size="lg" label="description" />
              <Input className="inp" type="file" name="bookImageFile"  accept=".jpg, .jpeg, .png"  onChange={handleChange} size="lg" label="bookImageFile" />
            </div>
            <Button className="mt-6" color='orange' onClick={handleSubmit} fullWidth>
              Add More
            </Button>
        </Card>
      </div>

      <div className="md:w-[30%] w-[80%] flex flex-col md:gap-14 mt-6 md:mt-0">
        <Typography variant="h4" color="gray" className= ' uppercase text-center font-territory'>
            Add more Books
        </Typography>
        <img src={img} alt="jijiji" className="" />
      </div>
    </div>
  )
}
