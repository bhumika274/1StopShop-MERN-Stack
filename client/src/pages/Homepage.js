import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../Context/cart";


const HomePage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useCart();

    
    const getTotal = async()=>{
        try {
            const {data} = await axios.get(`/api/v1/product/product-count`)
            setTotal(data?.total)
            if(data?.success){
                setProducts(data.products)
            }
        } catch (error) {
            console.log(error)
        }
    }
    // const getPage = async()=>{
    //     try {
    //         const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`)
    //         setTotal(data?.total)
    //         console.log(data.success)
    //         if(data?.success){
    //             setProducts(data.products)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const getAllProducts = async()=>{
        try {
            setLoading(true)
            const {data} = await axios.get(`/api/v1/product/product-list/${page}`)
            setLoading(false)
            if(data?.success){
                setProducts(data.products)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong in getting products")
        }
    }
    const getAllCategory = async () => {
        try {
            const {data} = await axios.get(`/api/v1/category/get-category`)
            if(data?.success){
              setCategories(data?.category)
            }
        } catch (error) {
            console.log(error)
            toast.error("something went wrong in getting category")
        }
    }
    const handleFilter = (value, id) => {
        let all = [...checked]
        try{
            if(value){
            all.push(id)
            }else{
            all = all.filter(item => item !== id)
            }
        }catch(error) {
            console.log(error)
        }
        setChecked(all)
        setTotal(all.length)
    }
    const filterProduct = async() => {
        try{
            const {data} = await axios.post(`/api/v1/product/product-filters`, {checked, radio})
            setProducts(data?.products)
        }catch(error) {
            console.log(error)
        }

    }
    useEffect(()=>{
        if(page === 1) return
        loadMore();
    },[page])
    const loadMore = async() => {
        try{
            setLoading(true)
            const {data} = await axios.get(`/api/v1/product/product-list/${page}`)
            setProducts([...products, ...data.products])
            setLoading(false)
        }catch(error) {
            console.log(error)
            setLoading(false)
        }

    }

    useEffect(()=>{
        getAllCategory();
        getTotal();
    },[])

    useEffect(() => {
        if (!checked.length && !radio.length) getAllProducts();
      },[checked.length, radio.length]);
    
    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);

    return(
        <Layout title="All Products- Best Offers">
            <div className="row mt-3">
                {/* {JSON.stringify(radio, null, 4)} */}
                <div className="col-md-2">
                    <div className="d-flex flex-column">
                    <h4 className="text-center mt-4">Filter by Category</h4>
                    {
                        categories?.map(item => {
                            return(
                                <Checkbox key={item._id} onChange={ (e) => handleFilter(e.target.checked, item._id)}>
                                    {item.name}
                                </Checkbox>)
                                
                        })
                    }
                    </div>

                    <h4 className="text-center mt-4">Filter by Prices</h4>   
                    <div className="d-flex flex-column">
                        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                        {Prices?.map((item) => (
                            <div key={item._id}>
                            <Radio value={item.array}>{item.name}</Radio>
                            </div>
                        ))}
                        </Radio.Group>
                    </div>
                    <div className="d-flex flex-column">
                        <button className="btn-danger btn" onClick={()=> window.location.reload()}>
                            RESET FILTERS
                        </button>
                    </div>
                </div>
                <div className="col-md-9">
                    <h1 className="text-center">All Products</h1>
                    <div className="d-flex flex-wrap">
                        {
                        products?.map(item => {
                            console.log(item)
                            return(
                                <div className="card m-3" style={{width: '20rem'}}  key={item._id}>
                                
                                <img src={`/api/v1/product/get-product-photo/${item._id}`} className="card-img-top" alt={item.name} style={{height: '15rem'}}/>
                                <div className="card-body" style={{height: '12rem'}}>
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.description.substring(0,30)}</p>
                                    <p className="card-text">{item.price}</p>
                                    <div className="card-name-price">
                                        <button
                                        className="btn btn-info ms-1"
                                        onClick={()=>{ navigate(`/product-det/${item.slug}`)}}
                                        >
                                        More Details
                                        </button>
                                        <button 
                                            className="btn btn-secondary ms-1" 
                                            onClick={()=>{
                                                setCart([...cart, item]) 
                                                localStorage.setItem(
                                                    "cart", 
                                                    JSON.stringify([...cart, item])
                                                )
                                                toast.success("Item Added to Cart")
                                            }}
                                        >ADD TO CART</button>
                                    </div>
                                </div>
                                </div>
                            )
                        })
                        }
                    </div>
                    <div className="m-2 p-3">
                        {products?.length < total && (
                            <button className="btn btn-warning"
                            onClick={(event)=>{
                                event.preventDefault();
                                setPage(page+1)
                            }}>
                                {loading ? "Loading..." : "loadmore"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default HomePage