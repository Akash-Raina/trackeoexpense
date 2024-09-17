

export const SubmitButton = ({onClick, type}: {onClick:()=>void  ,type: "signup" | "login"})=>{

    return <>
        <button onClick={onClick} className="rounded-xl w-24 h-8 bg-black text-white text-sm font-semibold">{type == "signup" ? "SignUp" : "LOGIN"}</button>
    </>
}