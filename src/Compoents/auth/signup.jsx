import {Card,Input,Checkbox,Button,Typography,CardBody,CardHeader} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import img from '../../assets/book.jpg'
import { useState } from "react"
import axios from 'axios';
import Swal from "sweetalert2";

  export function SignUp() {
    const [details,setDetails] = useState({});
    
    async function fetchData() {
      axios.post('http://localhost:8088/api/auth/sign-up', details)
        .then(response => {
          sessionStorage.setItem("details",response.data);
          document.querySelectorAll(".inp")?.forEach(element => {
            element.value="";
          });
          setDetails({});
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
      const { username, email, password } = details;
      const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!username || !email || !password) {
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
    <>
    <img
        src= {img}
        className="absolute inset-0 z-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
    <div style={{backgroundImage:'../../assets/book.jpg'}} className="mt-40  w-full   flex justify-center items-center">
      <Card  shadow={true} className="  lg:min-w-[36%] flex-col justify-center items-center px-3 py-8 bg-white">
        <CardHeader  className="py-5 w-full -mt-14" variant="gradient" color="blue-gray">
            <Typography variant="h2"className="text-white/80 text-center">
                Sign Up
            </Typography>
        </CardHeader>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg  ">
          <div className="mb-4 flex flex-col gap-6">
            <Input type="text" name="username" color="black" size="lg" label="Name" className="inp" onChange={handleChange}/>
            <Input type="email" name="email"  color="black" size="lg" label="Email" className="inp" onChange={handleChange}/>
            <Input name="password" color="black" type="password" size="lg" label="Password" className="inp" onChange={handleChange}/>
          </div>
          <div className="flex justify-center items-center">
            <Button className="mt-6 " onClick={handleSubmit}>
                Register
            </Button>
          </div>
          <Typography color="gray" className="mt-4  font-normal">
            Already have an account?{" "}
            <Link to="/auth/signin" >
              Sign in
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
    </>
    );
  }