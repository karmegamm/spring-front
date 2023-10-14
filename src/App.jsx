import { Button } from "@material-tailwind/react";
import {NavigationBar} from "./Compoents"
import {SignIn,SignUp} from "./Compoents/auth"
import { Routes,Route } from "react-router-dom";
import { routes } from "./routes";
import {Home} from "./Compoents/user"

function App() {

  return <div className="bg-black/5">
      <div className=" max-w-full">
        <NavigationBar />  
      </div>
      <Routes>
        <Route path={"*"} element={<Home/>} ></Route>
        {
          routes.map(({path,component},index)=>{
            return <Route key={index} path={path} element={component} ></Route>
          })
        }
        <Route path={'auth/signin'} element={<SignIn/>} ></Route>
        <Route path={'auth/signup'} element={<SignUp/>} ></Route>
      </Routes>
  </div>;
 
}

export default App
