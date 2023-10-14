import {Card,Input,Button,Typography,CardBody,CardHeader} from "@material-tailwind/react";
import {Link, useNavigate } from 'react-router-dom'
import img from '../../assets/book.jpg'
import { useEffect, useState } from "react"
import axios from 'axios';
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";


export function SignIn() {

  const [details,setDetails] = useState({});
  const navigate = useNavigate();
  const {login,isLoggedIn,setIsAdmin} = useAuth();

  useEffect(()=>{
    if(isLoggedIn){
      navigate("/home");
    }
  },[])
  
  function fetchData() {
    axios.post('http://localhost:8088/api/auth/sign-in', details)
      .then(response => {
        sessionStorage.setItem("details",JSON.stringify(response.data));
        document.querySelectorAll(".inp")?.forEach(element => {
          element.value="";
        });
        setDetails({});
        navigate('/home')
        setIsAdmin(response.data.isAdmin);
        login();
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong !',
        });
      console.error(error)});
  } 

  function handleSubmit(){
    const { password, email } = details;
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!password || !email ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields!',
      });
    }else if(!emailPattern.test(email)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a valid email address !',
      });
    }else{
      fetchData();
    }
  }  

  function handleChange(e){
    const {name,value} = e.target;
    setDetails({...details,[name]:value})
  }

  return (
  <div className="px-5">
  <img
      src= {img}
      className="absolute inset-0 z-0 h-full w-full object-cover"
  />
  <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
  <div style={{backgroundImage:'../../assets/book.jpg'}} className="mt-40 w-full h-full flex justify-center items-center">
    <Card  shadow={true} className=" lg:min-w-[36%] flex-col justify-center items-center px-3 py-8 bg-white">
      <CardHeader  className="py-5 w-full -mt-14" variant="gradient" color="blue-gray">
          <Typography variant="h2"className="text-white/80 text-center">
              Sign In
          </Typography>
      </CardHeader>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg  ">
        <div className="mb-4 flex flex-col gap-6">
        <Input type="email" name="email"  color="black" size="lg" label="Email" className="inp" onChange={handleChange}/>
          <Input name="password" color="black" type="password" size="lg" label="Password" className="inp" onChange={handleChange}/>
        </div>
        <div className="flex justify-center items-center">
          <Button className="mt-6 "  onClick={handleSubmit}>
              Login
          </Button>
        </div>
        <Typography color="gray" className="mt-4  font-normal">
          Already haven't an account?{" "}
          <Link to="/auth/signup" >
            Sign Up
          </Link>
        </Typography>
      </form>
    </Card>
  </div>
  </div>
  );
}