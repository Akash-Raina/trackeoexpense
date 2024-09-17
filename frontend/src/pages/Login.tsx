import { Design } from "../components/Design"
import { LoginAuth } from "../components/LoginAuth"

export const Login = ()=>{
    return <div className="flex ">
        <div className="h-screen hidden sm:w-[57%] sm:inline-block">
            <Design/>
        </div>
        <div className="h-screen w-[100%] sm:w-[43%] bg-slate-200">
            <LoginAuth/>
        </div>
    </div>
}