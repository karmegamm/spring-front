import {Card,CardBody,Typography,Tooltip, Button} from "@material-tailwind/react";
import {CheckBadgeIcon, ShoppingCartIcon,BoltIcon} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";


  export function BookCard({book}) {
    console.log(book);
    return (
    <Card className="relative">
        <CardBody className="flex h-full">
            <div className="md:max-w-[40%]"> 
                <img 
                    src={`data:image/jpeg;base64,${book?.bookImage}`} 
                    alt="profile-picture" 
                    className="md:h-full  w-50 rounded-lg" 
                />
            </div>
            <div className="md:pl-10 pl-3 pr-0 md:max-w-[60%] flex flex-col justify-between items-start">
                <div >
                    <Typography className="font-territory md:text-xl font-bold text-gray-900 ">{book?.bookKey.bookName}</Typography>
                    <Typography className="font-primary font-semibold text-sm md:text-md ">{book?.bookKey.author}</Typography>
                    <Typography className="font-territory md:text-2xl text-black font-semibold"><span className="font-normal font-sans">₹ </span>{book?.price} <span className="font-sans">/-</span></Typography>
                    <Typography className={`${book.stockQuantity < 10?'text-red-700':''} md:text-[12px] text-[10px] font-territory `}>{book.stockQuantity} Pieces left</Typography>
                    <Tooltip content={book?.description} placement="bottom-start" className="md:w-[400px] md:text-[12px] bg-blue-gray-400 text-white font-primary">
                        <span className="bg-gray-600  px-2 py-1 rounded-3xl text-sm text-white">description</span>
                    </Tooltip>
                </div>               
                <div className="flex flex-col justify-start items-start gap-2">
                    <span className="flex justify-center items-center md:gap-1 text-sm"><CheckBadgeIcon color="blue" className="w-5 h-4"/> <span className="font-primary text-[17px]">Assured</span></span>
                    <div className="flex gap-1">
                        <Button size="sm" variant="outlined" color="blue"className="p-1 md:p-2 flex justify-center items-center md:gap-1 md:text-[10px]"><BoltIcon className="w-5 h-5"/>Buy now</Button>
                        <Button size="sm" color="deep-orange" variant="gradient" className="p-1  md:p-2 flex justify-center items-center md:gap-1 md:text-[10px]"><ShoppingCartIcon className="w-5 h-5"/>Add to Cart</Button>
                    </div>
                </div>
            </div>
        </CardBody>
            
       
    </Card>
    );
  }