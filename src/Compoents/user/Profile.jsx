import React, { useEffect, useState } from "react";
import img from '../../assets/profile-book.svg'
import {Card,Input,Checkbox,Button,Typography} from "@material-tailwind/react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Swal from 'sweetalert2'

export function EditProfile() {
  const [details,setDetails] = useState({});
  const {isLoggedIn} = useAuth();
  const [user,setUser] =  useState(JSON.parse(sessionStorage.getItem('details')));
  const navigate = useNavigate();
  useEffect(()=>{
    if(!isLoggedIn){
      navigate('/home');
    }
    setDetails({
      email:user.email,
      username:user.username
    })
  },[isLoggedIn])
  
  function handleChange(e){
    const {name,value} = e.target;
    setDetails({...details,[name]:value});
  }
  console.log(details);
  function handleUpdate(){
    const { username, email, old_password,current_password } = details;
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!old_password || !current_password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields!',
      });
    }else if(email&&!emailPattern.test(email)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a valid email address !',
      });
    }else{
      fetchData();
    }
  }

  function fetchData(){
    axios.put(`http://localhost:8088/api/auth/${user.userid}`, details)
      .then(response => {
        sessionStorage.setItem("details",JSON.stringify(response.data));
        document.querySelectorAll(".inp")?.forEach(element => {
          element.value="";
        });
        setDetails({});
        Swal.fire({
          icon: 'success',
          title: 'Update Successfully ..!',
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
    
  

  return  <div className="  flex md:flex-row flex-col p-5 justify-center md:gap-36 gap-20 items-center lg:min-h-[90vh]">
      
            <div className="md:w-[30%] w-[80%] flex flex-col md:gap-14 mt-6 md:mt-0">
              <Typography variant="h4" color="blue-gray">
              🖐️Hello ,<span className="text-[30px] uppercase text-black/60 font-serif">{user.username } </span>
              </Typography>
              <img src={img} alt="jijiji" className="" />
            </div>

            <div className="md:w-[40%] w-[90%]">
              <Card className="md:p-10 md:px-20 p-8 bg-black/5"  shadow={true}>
                <Typography variant="h4" color="blue-gray" className="text-center">
                  Edit your profile
                </Typography>
                  <div className="mt-6  flex flex-col gap-5">
                    <Input className="inp" size="lg" name="username" onChange={handleChange} defaultValue={user.username} label="Name" />
                    <Input className="inp" size="lg" name="email" onChange={handleChange} defaultValue={user.email} label="Email" />
                    <Input className="inp" type="password" name="old_password" onChange={handleChange} size="lg" label="current Password" />
                    <Input className="inp" type="password" name="current_password" onChange={handleChange} size="lg" label="New Password" />
                  </div>
                  <Button className="mt-6" onClick={handleUpdate} fullWidth>
                    Update
                  </Button>
              </Card>
            </div>
          </div>;
 }
