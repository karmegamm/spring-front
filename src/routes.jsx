import {BookOpenIcon,HomeIcon,CodeBracketSquareIcon,PlusIcon} from "@heroicons/react/24/outline";
import {Home,Books,Mybooks,EditProfile} from './Compoents/user'
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
      path:"/my-books",
      label: "Cart",
      icon: CodeBracketSquareIcon,
      component:<Mybooks/>
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