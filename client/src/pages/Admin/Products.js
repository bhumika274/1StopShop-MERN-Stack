import React,{useState, useEffect} from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from "axios";
import toast from "react-hot-toast"
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([])

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product`);
            if(data.success){
                setProducts(data.products)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
      
    };

    useEffect(()=> {getAllProducts()},[])
  return (
    <div>
        <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
                <h1 className="text-center">All Products List</h1>
                <div className="d-flex flex-wrap"> 
                {
                    products?.map(item => {
                        return(
                            <Link to={`/dashboard/admin/product/${item.slug}`} key={item._id} className="product-link">
                                <div className="card m-3" style={{width: '20rem'}} >
                                
                                <img src={`/api/v1/product/get-product-photo/${item._id}`} className="card-img-top" alt={item.name} style={{height: '15rem'}}/>
                                <div className="card-body" style={{height: '12rem'}}>
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.description.substring(0,30)}</p>
                                    <p className="card-text">{item.price}</p>
                                    <button className="btn btn-primary ms-1">More Details</button>
                                    <button className="btn btn-secondary ms-1">ADD TO CART</button>
                                </div>
                                </div>
                            </Link>                           
                        )
                    })
                }
            </div>
            </div>
        </div>
    </div>
  )
}

export default Products