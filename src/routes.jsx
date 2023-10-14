import {BookOpenIcon,HomeIcon,CodeBracketSquareIcon} from "@heroicons/react/24/outline";
import {Home,Books,Mybooks,EditProfile} from './Compoents/user'
export const routes = [
    {
      path:"/home",
      label: "Home",
      icon: HomeIcon,
      component:<Home/>
    },
    {
      path:"/Books",
      label: "More books",
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