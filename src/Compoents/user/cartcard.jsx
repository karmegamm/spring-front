import {Typography,Checkbox, Button,IconButton} from "@material-tailwind/react";
import { BoltIcon} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { MinusCircleIcon,PlusCircleIcon } from "@heroicons/react/24/outline";
import { formatDateTo } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useOrder } from "../../context/OrderContext";
import axios from "axios";
import  Swal   from 'sweetalert2'

export function CartCard({book,createOrder,toggleSelection}) {
    
    const [user,setUser] = useState(null);
    const [count,setCount ] = useState(1);
    const navigate = useNavigate()
    const {select,setSelect,selectedItems,setSelectedItems} =useOrder()

    useEffect(()=>{
        setUser(JSON.parse(sessionStorage.getItem('details')));
        return ()=>{
            setSelectedItems([]);
            setSelect(p=>!p)
        }
    },[])

    function handleRazorResponse(response) {
        if(response.razorpay_payment_id){
        const updateStockUrl = `http://localhost:8088/books/update-stock?bookId=${book.bookId}&quantityToSubtract=${count}`;
        const purchaseSaveUrl = "http://localhost:8088/orders/purchase-save";

        const promises = [
            fetch(updateStockUrl, { method: 'PUT' }),
            fetch(purchaseSaveUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        userid:user.userid
                    },
                    book: {
                        bookId: book.bookId // Replace with the actual book ID
                    },
                    date: formatDateTo(Date.now()),
                    quantity: count,
                    totalPrice: count*book.price
                })
            })
        ];

        Promise.all(promises)
            .then(responses => {
                const failedResponse = responses.find(response => !response.ok);
                if (failedResponse) {
                    throw new Error(`Request failed with status: ${failedResponse.status}`);
                }
                return Promise.all(responses.map(response => response.text()));
            })
            .then(data => {
                console.log("Stock updated:", data[0]);
                console.log("Purchase saved:", data[1]);
                navigate('/home')
            })
            .catch(error => {
                console.error(error);
            });
        }else{
            alert('Payment failed !')
        }
    }


    const openRazorpay = (orderID) => {
        if (!orderID) {
            console.error('Order ID is not available.');
            return;
        }

        const options={
            key:'rzp_test_JK3GBwSeEqG8mr',
            order_id: orderID,
            amount:count*book.price*100,
            currency:"INR",
            image: `data:image/jpeg;base64,${book?.bookImage}`,
            name:"K2BookStore",
            description:"testing purpose",
            handler:handleRazorResponse,
            prefill:{
                name:"karmegam",
                email:"karmegam@gmail.com",
                contact:"8148774390"
            },
            notes:{
                address:"Razorpay Corporate office",
            },
            theme:{
                color:"#3399cc"
            }
        }
        const rzpInstance = new Razorpay(options);
        rzpInstance.open();      
    };

   console.log(selectedItems);

    return (
    <div className="relative bg-white max-h-56 px-4 py-3 w-full rounded-xl shadow-lg">
        <div className="flex  h-full">
            <div className="md:max-w-[40%]"> 
                <img 
                    src={`data:image/jpeg;base64,${book?.bookImage}`} 
                    alt="profile-picture" 
                    className="md:h-48 rounded-lg" 
                />
            </div>
            <div className="md:pl-7  pr-0 md:max-w-[60%] flex flex-col justify-evenly items-start ">
                    <div className="flex flex-col justify-between items-start ">
                        <Typography  className="font-territory md:text-[18px] leading-5 font-bold text-blue-gray-800 ">{book?.bookKey.bookName}</Typography>
                        <Typography className="font-primary font-semibold text-sm  ">{book?.bookKey.author}</Typography>
                        <Typography className="font-territory md:text-md text-black font-semibold"><span className="font-normal font-sans">₹ </span>{book?.price} <span className="font-sans">/-</span></Typography>
                        <Typography className={`${book.stockQuantity < 10?'text-red-700':''} md:text-[8px] text-[10px] font-territory `}>{book.stockQuantity} Pieces left</Typography>     
                    </div>
                    <div className="flex  flex-col justify-center items-center gap-0.5">                  
                        <div className="flex justify-start items-center md:gap-1 -translate-x-3">
                            <IconButton size="sm" onClick={()=>setCount(prev=>prev-1)} variant="text" className="rounded-full" disabled={count<=1}>
                                <MinusCircleIcon className="w-4 h-4 " color="red"/>
                            </IconButton>
                            <span className=" font-bold font-territory">{count}</span>
                            <IconButton size="sm" onClick={()=>setCount(prev=>prev+1)} variant="text" className="rounded-full" disabled={count>=book.stockQuantity }>
                                <PlusCircleIcon className="w-4 h-4" color="green"/>
                            </IconButton>
                        </div>
                        <Button color={'deep-orange'} onClick={() => createOrder((book?.price*count), orderID => openRazorpay(orderID))} size="sm" variant="gradient" className="p-1 md:p-2 flex justify-center items-center md:gap-1 md:text-[10px]"><BoltIcon color="gold" className="w-5 h-5"/>Buy now</Button>
                    </div> 
            </div>
        </div>
        {select&&<div className="absolute top-0 right-0">
            <Checkbox
                ripple={true}
                color="blue"
                className="h-5 w-5 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                onChange={()=>toggleSelection(book,count)}
            />
        </div>}
    </div>
    );
}