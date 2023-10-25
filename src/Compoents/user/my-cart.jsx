import React, { useEffect, useState } from "react";
import axios from'axios'
import { CartCard } from "./cartcard";
import { Button, Typography } from "@material-tailwind/react";
import { ShoppingCartIcon, BookOpenIcon} from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import {OrderProvider, useOrder} from "../../context/OrderContext"


export function Mybooks() {
  const [books,setBooks] = useState([]);
  const {isLoggedIn} = useAuth();
  const {select,setSelect,selectedItems,setSelectedItems} = useOrder();
  const [user,setUser ]= useState({});
  
  useEffect(() => {
    const fetchUser = async () => {
      const userData = JSON.parse(sessionStorage.getItem("details"));
      setUser(userData);
    };

    fetchUser();
  }, []);

  useEffect(()=>{
    if (!user.userid) {
      return;
    }

    const fetchData = async () => {
      try {
        const cartResponse = await axios.get(
          `http://localhost:8088/books/get-cart-books-by-userid?userId=${user?.userid}`
        );

        if (cartResponse.data.length > 0) {
          const bookDetailsResponse = await axios.post(
            "http://localhost:8088/books/get-books-in-ids",
            cartResponse.data
          );

          const bookData = bookDetailsResponse.data;
          setBooks(bookData);
        } else {
          console.log("Data not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user?.userid]);

  const createOrder = async (amount, openRazorpay) => {
    if(isLoggedIn){
        try {
        const response = await axios.get(`http://localhost:8088/orders/create/${amount}`);
        console.log("data:",response.data);
        openRazorpay(response.data);
        } catch (error) {
        console.error('Error creating order:', error);
        }
    }else{
        Swal.fire({
            icon: 'error',
            title: "You're not Logged in!",
            text: 'Please Sign-in or Signup ..',
          });
    }
  };

  const toggleSelection = (item,count) => {
    if (selectedItems.find((selectedItem) => selectedItem.bookId === item.bookId)) {
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem.bookId !== item.bookId));
    } else {
      const newitem = {
        bookId : item.bookId,
        count:count,
        totalPrice:(item.price*count)
      }
      setSelectedItems([...selectedItems,newitem]);
    }
  };

  return (
  <div className={`md:min-h-[90vh] md:px-5 ${(!isLoggedIn)&&'flex justify-center items-center '}`}>
    {isLoggedIn ?<div>
                    <div className="flex justify-between items-center">
                      <Typography 
                        variant="h1"
                        className="font-territory  md:p-7 text-black-600 flex gap-4 items-center"><BookOpenIcon color="gray" className="h-10 w-10" />
                          Books on your <ShoppingCartIcon color="gold" className="h-10 w-10 rotate-12"/>Cart
                      </Typography>
                      <Button size="lg" onClick={()=>{setSelect(p=>!p);setSelectedItems([]);}} variant="gradient" color="blue-gray" className="">{select?'Cancel':'Quick  pay'}</Button>
                    </div>
                    {books.length>0 ? <div>
                                          {(select&&selectedItems.length>0)&&<div className=" border-[1px] border-blue-gray-600 bg-white  h-20 w-ful shadow-lg rounded-lg z-50 mb-3"></div>}
                                          <div className="grid grid-cols-3 gap-3">
                                            {books?.map((book,index)=><CartCard book={book} createOrder={createOrder} toggleSelection={toggleSelection}/>)}
                                          </div>
                                      </div>
                                    : 
                                      <div className="flex  justify-center items-center">Not fount</div> }
                  </div>
                : 
                  <div className=" flex-col justify-start items-center ">
                    <Typography variant="h2" className="font-territory">Log-in into your Account</Typography> 
                    <Button size="lg" variant="gradient" color="blue-gray" className=" py-2 px-4 ml-3"><Link to='/auth/signin'>SignIn</Link></Button>
                  </div>}
    </div>
  );
}

