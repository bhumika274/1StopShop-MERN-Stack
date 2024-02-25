import React, { useState }  from 'react'
import Layout from '../../components/layout/Layout'
import axios from "axios"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import "../../Styles/StyleAuth.css";

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [answer, setAnswer] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async(event) =>{

        event.preventDefault()
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/auth/register`, {
                name, email, password, phone, address, answer
            })
            if(res.data.success){
                toast.success(res.data.message)
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
    <Layout title="Register at ecommerce">
        <div className="form-container" style={{ minHeight: "90vh" }}>
            <form onSubmit={handleSubmit}>
            <h4 className="title">Register Page</h4>
                <div className="mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleInputName"
                        placeholder="Enter your Name"
                        value={name}
                        onChange={(event)=> setName(event.target.value)}
                        required/>
                </div>
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
                <div className="mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleInputAddress"
                        placeholder="Enter your address"
                        value={address}
                        onChange={(event)=> setAddress(event.target.value)}
                        required/>
                </div>
                <div className="mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleInputPhone"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(event)=> setPhone(event.target.value)}
                        required/>
                </div>
                <div className="mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleInputAnswer"
                        placeholder="What is your favourite fruit?"
                        value={answer}
                        onChange={(event)=> setAnswer(event.target.value)}
                        required/>
                </div>
                
            
                <button type="submit" className="btn btn-primary bg-dark">Register</button>
            </form>
        </div>
    </Layout>
  )
}

export default Register