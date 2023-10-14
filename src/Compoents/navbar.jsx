import React from "react";
import {Navbar,Typography,Button,Menu,MenuHandler,MenuList,MenuItem,Avatar,Card,IconButton,Collapse} from "@material-tailwind/react";
import {UserCircleIcon,ChevronDownIcon,Cog6ToothIcon,Bars2Icon,PowerIcon} from "@heroicons/react/24/outline";
import {routes,AdminRoute} from '../routes'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// profile menu component


 
function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const  {logout} = useAuth();
  const navigate = useNavigate()
  const profileMenuItems = [
    {
      label: "Edit Profile",
      icon: Cog6ToothIcon,
      onclick:()=>{ navigate('/edit-profile'); }
    },    
    {
      label: "Sign Out",
      icon: PowerIcon,
      onclick:logout,
    },
  ];
  
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
        <UserCircleIcon 
          className="w-8 h-8"
          color="black"
        />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon,onclick }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={onclick}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-territory"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
 
// nav list component
 
function NavList() {
  const {isAdmin}=useAuth();
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {(isAdmin?[...routes,...AdminRoute]:routes)?.map(({ label, icon,path }, key) => {  
        if(label&&icon)      
          return ( <Link key={label} to={path}>
                    <Typography
                      key={label}
                      variant="small"
                      color="blue-gray"
                      className="font-territory text-[16px]"
                    >
                      <MenuItem className="flex items-center gap-2 lg:rounded-full">
                        {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
                        {label}
                      </MenuItem>
                    </Typography>
                  </Link>)
      })}
    </ul>
  );
}
 
export function NavigationBar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const {isLoggedIn} = useAuth();
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);
 
  return (
    <Navbar className=" bg-black/10  md:translate-y-3 w-[90%]  z-50  mx-auto  lg:rounded-full ">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5  font-primary "
        >
          K2Store
        </Typography>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        {isLoggedIn?<ProfileMenu />:<Button size="lg" variant="gradient" color="blue-gray" className="flex justify-center rounded-full items-center py-2 px-4 lg:ml-auto "><Link to='/auth/signin'>SignIn</Link></Button>}
      </div>
      <Collapse open={isNavOpen}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
