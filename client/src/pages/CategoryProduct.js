import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const CategoryProduct = () => {
    // const [total, setTotal] = useState(0);
    // const [page, setPage] = useState(1);
    // const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const params = useParams();

    // const getTotal = async()=>{
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

    useEffect(()=>{
        if(params?.slug) getProductByCat();  
    },[params?.slug])
    const getProductByCat = async()=>{
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Layout>
        <div className="col-md-9 text-center offset-1">
                    <h1 className="text-center">{category.name}</h1>
                    <h6 className="text-center">{products?.length} result found </h6>
                    <div className="row">
                    <div className="col-md-12">
                        <div className="d-flex flex-wrap">
                        {
                        products?.map(item => {
                            console.log(item)
                            return(
                                <div className="card m-3" style={{width: '20rem'}}  key={item._id}>
                                
                                <img src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${item._id}`} className="card-img-top" alt={item.name} style={{height: '15rem'}}/>
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
                                        <button className="btn btn-secondary ms-1">ADD TO CART</button>
                                    </div>
                                </div>
                                </div>
                            )
                        })
                        }
                    </div>
                    {/* <div className="m-2 p-3">
                        {products?.length < total && (
                            <button className="btn btn-warning"
                            onClick={(event)=>{
                                event.preventDefault();
                                setPage(page+1)
                            }}>
                                {loading ? "Loading..." : "loadmore"}
                            </button>
                        )}
                    </div> */}
                </div>
                </div>
                </div>
    </Layout>
  )
}

export default CategoryProduct