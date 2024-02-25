import React from "react"
import { Link,NavLink } from "react-router-dom"
import { useAuth } from "../../Context/auth"
import toast from "react-hot-toast"
import SearchInput from "../Form/SearchInput"
import useCategory from "../../Hooks/useCategory"
import { useCart } from "../../Context/cart"
import { Badge } from 'antd';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const categories = useCategory();
    const handleLogout = () =>{

        setAuth({
            ...auth,
            user:null,
            token:""
        })
        localStorage.removeItem("auth");
        toast.success("Logout Successful")

    }
    return(
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse">
                    <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link to="/" className="navbar-brand">
                        :🛒 1StopShop</Link>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <SearchInput />
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                to="/" 
                                className="nav-link" 
                            >
                                HOME
                            </NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" to={"/category"} data-bs-toggle="dropdown">
                                CATEGORY
                            </NavLink>
                            <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to={`/categories`}>All Categories</Link></li>
                            {
                                categories?.map(item=>(
                                        <li key={item._id}><Link className="dropdown-item" to={`/category/${item.slug}`}>{item.name}</Link></li>
                                ))
                            }
                            </ul>                            
                        </li> 
                        {
                            !auth.user ? (<>
                            <li className="nav-item">
                                <NavLink 
                                    to="/register" 
                                    className="nav-link" 
                                    
                                >
                                    REGISTER
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink 
                                    to="/login" 
                                    className="nav-link" 
                                   
                                >
                                    LOGIN
                                </NavLink>
                            </li>
                            
                            </>) : (<>
                                <li className="nav-item dropdown">
                                    <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {auth?.user?.name}
                                    </NavLink>
                                    <ul className="dropdown-menu">
                                        <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item">Dashboard</NavLink></li>
                                        <li>
                                        <NavLink 
                                            to="/login"
                                            className="dropdown-item" 
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </NavLink>
                                    </li>
                                    </ul>
                                </li>
                            </>)
                        }
                        <li className="nav-item">
                                        <Badge count={cart?.length}>
                                            <NavLink 
                                                to="/cart" 
                                                className="nav-link" 
                                            >
                                                CART
                                            </NavLink>
                                        </Badge>
                                    </li>
                    </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header