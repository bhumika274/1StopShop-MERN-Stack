import React, { useState }  from 'react'
import Layout from '../../components/layout/Layout'
import axios from "axios"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import "../../Styles/StyleAuth.css";


const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [answer, setAnswer] = useState("")
  
    const navigate = useNavigate();

    const handleSubmit = async(event) =>{

        event.preventDefault()
        try {
            const res = await axios.post(`/api/v1/auth/forgot-password`, {
                email, newPassword, answer
            })
            if (res && res.data.success) {
                toast.success(res.data && res.data.message)
                navigate("/login")
            }else{
                toast.error(res.data.message)
            }
        }catch(error) {

            console.log(error)
            toast.error("something went wrong")
        }
    }
  return (
    <Layout title={"Forgot Password - Ecommerce App"}>
        <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
        <h4 className="title">RESET PASSWORD</h4>
            
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
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(event)=> setNewPassword(event.target.value)}
                    required/>
    
            </div>
            <div className="mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    id="exampleInputAnswer"
                    placeholder="Enter your favourite Food"
                    value={answer}
                    onChange={(event)=> setAnswer(event.target.value)}
                    required/>
    
            </div>
            
            <button type="submit" className="btn btn-primary bg-dark" onClick={handleSubmit}>RESET</button> 
           
        </form>

        </div>
    </Layout>
  )
}

export default ForgotPassword