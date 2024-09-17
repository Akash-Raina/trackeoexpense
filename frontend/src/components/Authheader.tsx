import {Link} from 'react-router-dom'
import img from '../assets/logo.jpg'
export const Authheader = ({type}:{type: 'signup' | 'signin'})=>{

    return <div className='flex flex-col justify-center items-center mb-8 '>
        <img className='rounded-full w-20 h-20' src={img} alt="" />
        <div className='text-slate-600'>{type == 'signup' ? 'Already have an account? ': 'Create new account? '}<Link className= 'underline text-slate-600' to={type == 'signup' ? '/login': '/signup'}>{type == 'signup'? 'Login' : 'signup'}</Link></div>
    </div>
}