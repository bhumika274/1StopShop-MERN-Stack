import React, { useState }  from 'react'
import Layout from '../../components/layout/Layout'
import axios from "axios"
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import "../../Styles/StyleAuth.css";
import { useAuth } from '../../Context/auth';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useAuth()
  
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async(event) =>{

        event.preventDefault()
        try {
            const res = await axios.post(`/api/v1/auth/login`, {
                email, password
            })
            if(res.data.success){
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem("auth", JSON.stringify(res.data))
                navigate(location.state || "/")
            }else{
                toast.error(res.data.message)
            }
        }catch(error) {

            console.log(error)
            toast.error("something went wrong")
        }
    }
  return (
    <Layout title="Login at ecommerce">
        <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
        <h4 className="title">Login Page</h4>
            
            <div className="mb-3">
                <input 
                    type="email" 
                    className="form-control" 
                    id="exampleInputemail"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event)=> setEmail(event.target.value)}
                    required/>
            </div>
            <div className="mb-3">
                <input 
                    type="password" 
                    className="form-control" 
                    id="exampleInputPassword"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event)=> setPassword(event.target.value)}
                    required/>
    
            </div>
            
            <button type="submit" className="btn btn-primary bg-dark">Login</button> 
            <div className='mt-3'>
                <button type="submit" className="btn btn-primary bg-dark" onClick={()=>{navigate("/forgot-password")}}>Forgot Password</button>
            </div>
        </form>
        </div>
    </Layout>
  )
}

export default Login