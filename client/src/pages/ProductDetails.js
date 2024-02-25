import Layout from "../components/layout/Layout";
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useParams } from "react-router-dom";

const ProductDetails = () => {

    
    const params = useParams();
    const [product, setProduct] = useState({})
    const [relatedP, setRelatedP] = useState([])
    
    useEffect(()=>{
        if (params?.slug) getProduct();
    },[params?.slug])

    const getProduct = async() =>{
        try {
            const {data} = await axios.get(`/api/v1/product/get-single-product/${params.slug}`)
            setProduct(data?.products)
            getSimilarProducts(data.products._id, data.products.category._id)
        } catch (error) {
            console.log(error)
        }
    }


    const getSimilarProducts = async(pid, cid) =>{
        try {
            const {data} = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
            setRelatedP(data?.products)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Layout>
        <h1>Product Details</h1>
        <div className="row container mt-2">
            <div className="col-md-6">
            {product?
            <img 
                src={`/api/v1/product/get-product-photo/${product?._id}`} className="card-img-top" 
                alt={product?.name} 
                style={{height: '30rem', width:"100%"}}/>
            :
            <p>loading picture...</p>}
            </div>
            <div className="col-md-6">
                <h1 className="text-center"> PRODUCT DETAILS</h1>
                <h6>Name: {product?.name}</h6>
                <h6>Description: {product?.description}</h6>
                <h6>Price: {product?.price}</h6>
                <h6>Category: {product?.category?.name}</h6>
                {/* <h6> Shipping: {product.shipping}</h6> */}
                <div className="card-name-price">                    
                    <button className="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
            </div>
            <div className="row">
                <h1>Similar Products</h1>
                {
                    relatedP.length < 1 ?
                    <p className="text-center">No Similar Products Found</p>
                    : 
                        relatedP?.map(item => {
                            console.log(item)
                            return(
                                <div className="card m-3" style={{width: '13rem'}}  key={item._id}>
                                
                                <img src={`/api/v1/product/get-product-photo/${item._id}`} className="card-img-top" alt={item.name} style={{height: '10rem', width:"10rem"}}/>
                                <div className="card-body" style={{height: '12rem'}}>
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.description.substring(0,30)}</p>
                                    <p className="card-text">{item.price}</p>
                                    <div className="card-name-price">
                                        <button className="btn btn-secondary ms-1">ADD TO CART</button>
                                    </div>
                                </div>
                                </div>
                            )
                        })
                        }
            </div>
            
        </div>
       
    </Layout>
  )
}

export default ProductDetails