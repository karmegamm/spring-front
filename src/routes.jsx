import {CubeTransparentIcon,UserCircleIcon,CodeBracketSquareIcon} from "@heroicons/react/24/outline";
import {Home,Books,Mybooks} from './Compoents/user'
export const routes = [
    {
      path:"/home",
      label: "Home",
      icon: UserCircleIcon,
      component:<Home/>
    },
    {
      path:"/Books",
      label: "More books",
      icon: CubeTransparentIcon,
      component:<Books/>
    },
    {
      path:"/my-books",
      label: "Cart",
      icon: CodeBracketSquareIcon,
      component:<Mybooks/>
    },
  ];