import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import { useCart } from '../Context/cart'
import { useAuth } from '../Context/auth'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {
    const [cart, setCart] = useCart()
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate();

    const totalPrice = ()=>{
        let total = 0
        cart?.map(item=>{
            {total+=item.price}
        })

        return total.toLocaleString("en-US", {
            style:"currency",
            currency: "USD"
        })
    }
    const removeCartItem = (pid) =>{
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item=>item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem(
                "cart",
                JSON.stringify(myCart)
            )
        } catch (error) {
            console.log(error);
        }
    }
  return (
    
    <Layout>
        <div className="container">
            <div className="row">
                <div className="col-md-12">  
                        <h1 className="text-center bg-light p-2 mb-1">
                        {`Hello ${auth?.token && auth?.user.name}`}
                        </h1>
                        <h4 className="text-center">
                            {
                                cart?.length >= 1 ?
                                `You have ${cart.length} item${cart.length>1?"s":""} in your Cart`
                                :
                                `Your cart is empty`
                            }
                        </h4> 
                </div>   
            </div>
            <div className="row">
                <div className="col-md-6">
                    {
                        cart?.map(item=>(
                            <div key={item._id} className="row m-2 card flex-row">
                                <div className="col-md-4">
                                    <img src={`/api/v1/product/get-product-photo/${item._id}`} className="card-img-top" alt={item.name} style={{height: '15rem'}}/>
                                </div>
                                <div className="col-md-8">
                                    <p>{item.name}</p>
                                    <p>{item.description.substring(0,30)}{`${item?.description.length > 29 ? "...":""}`}</p>
                                    <p>Price : ${item.price}</p>
                                    <button className="btn btn-danger" onClick={()=>removeCartItem(item._id)}>Remove</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="col-md-4 text-center">
                    <h2>Cart Summary</h2>
                    <p>Checkout | Payment | Total</p>
                    <hr />
                    <h4>Total: {totalPrice()}</h4>

                    <div className="mb-3">
                        {
                            auth?.token ?
                            <>
                                <h4>Current Address</h4>
                                <h5>{auth?.user?.address}</h5>
                                <button 
                                    className="btn btn-outline-warning"
                                    onClick={()=>navigate("/dashboard/user/profile")}>Update Address
                                </button>
                            </>
                            :
                            <button 
                                className="btn btn-outline-warning"
                                onClick={()=>navigate("/login",{
                                state: `/cart`
                                })}>Please Login To Checkout
                            </button>
                        }
                        
                    </div>

                </div>
                
            </div>
        </div>

    </Layout> 
  )
}

export default CartPage