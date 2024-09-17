import { ChangeEvent, ReactNode } from "react"

interface LabbledType{
    label: ReactNode,
    placeholder: string,
    type?: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void 
}

export const LabbledInput = ({label, placeholder, type, onChange}: LabbledType)=>{

    return <div className="flex mb-8 border-b-2 border-black gap-2 p-2">
        <label className = "text-slate-800">{label}</label>
        <input onChange={onChange} type={type || "text"} placeholder={placeholder} className="placeholder:text-slate-600 outline-none bg-slate-200" required />
    </div>
}