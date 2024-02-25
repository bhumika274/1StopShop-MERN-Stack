import React from "react"
import Layout from "../components/layout/Layout"

const Policy = () => {
    return(
        <Layout title={"Privacy Policy"}>
            <div className="row contactus">
                <div className="col-md-6">
                <img
                    src="https://termshub.io/v3/assets/images/products/privacy_policy_hero.svg"
                    alt="contactus"
                    style={{ width: "80%" }}
                />
                </div>
                <div className="col-md-4">
                    <p className="mt-3">
                            Privacy Policy
                    </p>
                    <p className="mt-3">
                            Privacy Policy
                    </p>
                    <p className="mt-3">
                            Privacy Policy
                    </p>
                    <p className="mt-3">
                            Privacy Policy
                    </p>
                    <p className="mt-3">
                            Privacy Policy
                    </p>
  
                </div>
                

            </div>
            
            
        </Layout>
    )
}

Layout.defaultProps = {
    title: "Ecommerce App",
    description: "mern stack project",
    keywords: "mern, react, node, mongo",
    author: "mankerbhumika"
}
export default Policy