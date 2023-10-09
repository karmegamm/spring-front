import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    CardBody,
    CardHeader,
  } from "@material-tailwind/react";
import {Link } from 'react-router-dom'
import img from '../../assets/book.jpg'
  export function SignIn() {
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
            <Input size="lg" label="Email" />
            <Input type="password" size="lg" label="Password" />
          </div>
          <div className="flex justify-center items-center">
            <Button className="mt-6 " >
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