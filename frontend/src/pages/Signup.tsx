import { SignupAuth } from "../components/SignupAuth"
import { Design } from "../components/Design"

export const Signup = ()=>{
    return <div className="flex ">
        <div className="h-screen hidden sm:w-[57%] sm:inline-block">
            <Design/>
        </div>
        <div className="h-screen w-[100%] sm:w-[43%] bg-slate-200">
            <SignupAuth/>
        </div>
    </div>
}