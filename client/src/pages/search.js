import React from 'react'
import Layout from "./../components/layout/Layout"
import { useSearch } from '../Context/search'
import { Link } from 'react-router-dom';

const Search = () => {
    const [values, setValues] = useSearch();
  return (
    <Layout title={"search results"}>
        <div className='container'>
            <div className="text-center">
                <h1>Search results</h1>
                <h6>{values?.results.length < 1 ? "No Results Found" : `Found ${values?.results.length}`}</h6>
            </div>
            <div className="d-flex flex-wrap">
                        {
                        values?.results.map(item => {
                            return(
                                <Link to="" key={item._id} className="product-link">
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
    </Layout>
  )
}

export default Search