import {Card,CardBody,Typography,Tooltip, Button,IconButton} from "@material-tailwind/react";
import {CheckBadgeIcon, ShoppingCartIcon,BoltIcon, MinusIcon} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { MinusCircleIcon,PlusCircleIcon } from "@heroicons/react/24/outline";
import { formatDateTo } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import  Swal   from 'sweetalert2'

export function BookCard({book,createOrder}) {
    const [user,setUser] = useState(null);
    const [count,setCount ] = useState(1);
    const navigate = useNavigate()
    const{isLoggedIn} = useAuth();

    useEffect(()=>{
        setUser(JSON.parse(sessionStorage.getItem('details')));
    },[])

    async function handleAddtoCart(){
        if(!isLoggedIn){
            Swal.fire({
                icon: 'error',
                title: "You're not Logged in!",
                text: 'Please Sign-in or Signup ..',
              });
        }else{
            try {
                const response = await axios.post(`http://localhost:8088/books/add-to-cart?bookId=${book.bookId}&userId=${user.userid}`);
                console.log(response);
                if (response.status=== 201) {
                    Swal.fire({
                        icon: 'success',
                        title: "Successfully Added to cart!",
                        text: 'you can buy it in cart page',
                    });
                }
            } catch (error) {
                console.error('Error saving Cart entity:', error.message);
            }    
        }  
    }

    function handleRazorResponse(response) {
        if(response.razorpay_payment_id){
        // Construct the URLs for the two endpoints
        const updateStockUrl = `http://localhost:8088/books/update-stock?bookId=${book.bookId}&quantityToSubtract=${count}`;
        const purchaseSaveUrl = "http://localhost:8088/orders/purchase-save";

        // Create an array of promises for the fetch requests
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

        // Use Promise.all to execute the fetch requests concurrently
        Promise.all(promises)
            .then(responses => {
                // Check if any request failed
                const failedResponse = responses.find(response => !response.ok);
                if (failedResponse) {
                    throw new Error(`Request failed with status: ${failedResponse.status}`);
                }

                // Process successful responses
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
                <div className="flex justify-center items-center md:gap-1">
                    <IconButton onClick={()=>setCount(prev=>prev-1)} variant="text" className="rounded-full" disabled={count<=1}>
                        <MinusCircleIcon className="w-5 h-5 " color="red"/>
                    </IconButton>
                    <span className="border-black/70 border-[1px] bg-black/10 px-3 font-bold font-territory">{count}</span>
                    <IconButton onClick={()=>setCount(prev=>prev+1)} variant="text" className="rounded-full" disabled={count>=book.stockQuantity }>
                        <PlusCircleIcon className="w-5 h-5" color="green"/>
                    </IconButton>
                    </div>         
                <div className="flex flex-col justify-start items-start gap-2">
                    <span className="flex justify-center items-center md:gap-1 text-sm"><CheckBadgeIcon color="blue" className="w-5 h-4"/> <span className="font-primary text-[17px]">Assured</span></span>
                    <div className="flex gap-1">
                        <Button onClick={() => createOrder((book?.price*count), orderID => openRazorpay(orderID))} size="sm" variant="outlined" color="blue"className="p-1 md:p-2 flex justify-center items-center md:gap-1 md:text-[10px]" disabled={book.stockQuantity < 1}><BoltIcon className="w-5 h-5"/>Buy now</Button>
                        <Button size="sm" color="deep-orange" variant="gradient" className="p-1  md:p-2 flex justify-center items-center md:gap-1 md:text-[10px]" onClick={handleAddtoCart}><ShoppingCartIcon className="w-5 h-5"/>Add to Cart</Button>
                    </div>
                </div>
            </div>
        </CardBody>
    </Card>
    );
}