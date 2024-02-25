import React, { useEffect, useState } from 'react'
import Layout from "./../../components/layout/Layout"
import UserMenu from '../../components/layout/UserMenu'
import { useAuth } from '../../Context/auth'
import axios from 'axios'
import toast from 'react-hot-toast'

const Profile = () => {
    const [auth, setAuth] = useAuth();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    const handleSubmit = async(event) =>{

        event.preventDefault()
        try {
            const {data} = await axios.put(`/api/v1/auth/profile-update`, {
                name, email, password, phone, address
            })
            if(data.error){
                toast.error("Something Went Wrong")
                console.log(data.error)
            }else{
                setAuth({user:data.updateduser})
                let ls = localStorage.getItem("auth")
                ls = await JSON.parse(ls)
                ls.user = data.updateduser
                localStorage.setItem("auth", JSON.stringify(ls))
                toast.success("Profile Updated Successfully")
            }
            
        }catch(error) {

            console.log(error)
            toast.error("something went wrong")
        }
    }

    useEffect(()=>{
        const { name, email, password, phone, address} = auth.user
        setName(name)
        setEmail(email) 
        setPassword(password)
        setPhone(phone)
        setAddress(address)
    },[auth.user])
  return (
    <Layout title={"Your Profile"}>
        <div className="container-fluid p-3 m-3">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu />
                </div>
                <div className="form-container col-md-9" style={{ minHeight: "90vh" }}>
                    <form onSubmit={handleSubmit}>
                    <h4 className="title">Profile Page</h4>
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
                                required
                                disabled/>
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
                    
                        
                    
                        <button type="submit" className="btn btn-primary bg-dark">UPDATE</button>
                    </form>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Profile