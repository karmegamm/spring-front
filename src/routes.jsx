import {BookOpenIcon,HomeIcon,ShoppingCartIcon,PlusIcon} from "@heroicons/react/24/outline";
import {Home,Books,Mybooks,EditProfile,BooksTitles} from './Compoents/user'
import {Bookadd} from './Compoents/Admin'

export const routes = [
    {
      path:"/home",
      label: "Home",
      icon: HomeIcon,
      component:<Home/>
    },
    {
      path:"/Books",
      label: "Books",
      icon: BookOpenIcon,
      component:<Books/>
    },
    {
      path:"/my-cart",
      label: "Cart",
      icon: ShoppingCartIcon,
      component:<Mybooks/>
    },
    {
      path:"/Books/:title",
      component:<BooksTitles/>
    },
    {
      path:"/edit-profile",
      component:<EditProfile/>
    },
  ];


export const AdminRoute =[
  {
    path:"/add-books",
    label: "Addbooks",
    icon: PlusIcon,
    component:<Bookadd/>
  }
]