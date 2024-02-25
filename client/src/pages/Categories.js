import React from 'react'
import Layout from '../components/layout/Layout'
import useCategory from '../Hooks/useCategory'
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = useCategory();
  return (
    <Layout title={"All-Categories"}>
        <h1>All Categories</h1>
        <div className="container">
        <div className="row">
            {categories?.map(item=>(
                <div className="col-md-6 mb-3 mt-5 gx-3">
                <Link key={item._id} to={`/category/${item.slug}`} className="btn btn-primary">{item.name} </Link></div>
            ))}
        </div>
        </div>
        
    </Layout>
  )
}

export default Categories