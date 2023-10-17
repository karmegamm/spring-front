import {Card,CardHeader,CardBody,Typography,Tooltip, CardFooter} from "@material-tailwind/react";
import { useEffect } from "react";
import {ArrowRightIcon} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";


  export function TitleCard({book}) {
    return (
    <Link to={`${book.id}`}>
    <Card className="group h-[19rem] w-full overflow-hidden ">
        <CardHeader floated={false} className="h-[90%] overflow-hidden">
            <img 
                src={`data:image/jpeg;base64,${book.image}`} 
                alt="profile-picture" 
                className="w-full h-full hover:scale-105 transition-transform duration-700 hover:opacity-100 opacity-90" 
            />
        </CardHeader>
        <Typography  color="blue-gray" className="text-xl font-primary font-bold flex justify-between items-center px-4 py-2 ">
                {book.title} <span className="group-hover:bg-orange-700 border-[1px] border-orange-100 rounded-lg p-1"><ArrowRightIcon  className="w-4 h-4 font-extrabold group-hover:text-white text-orange-900" /></span>
        </Typography>
    </Card>
    </Link> 
    );
  }