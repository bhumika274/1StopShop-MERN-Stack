import {useAuth} from "../../Context/auth"
import {useEffect, useState} from "react"
import axios from "axios"
import {Outlet} from "react-router-dom"
import Spinner from "../Spinner"


 const AdminRoute = () =>{
    const [ok, setOk] = useState(false)
    const [auth] = useAuth()

    useEffect(() => {
        const authCheck = async () =>{
            const res = await axios.get(`/api/v1/auth/admin-auth`)

            if(res?.data?.ok){
                setOk(true)
            }else{
                setOk(false)  }
        }

        if(auth?.token) authCheck()
    },[auth?.token])

    return ok ? <Outlet/> : <Spinner path=""/> ;
}

export default AdminRoute;

