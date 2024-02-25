import React from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useAuth } from '../../Context/auth'

const Dashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout title={"Dashboard- Ecommerce App"}>
        <div className="container-fluid p-3 m-3">
        <div className="row">
                <div className="col-md-3">
                    <UserMenu />
                </div>
                <div className="col-md-9">
                    <div className="card w-75 p-3">
                      <h4>User Name: {auth?.user?.name}</h4>
                      <h4>User Email: {auth?.user?.email}</h4>
                      <h4>User Address: {auth?.user?.address}</h4>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Dashboard