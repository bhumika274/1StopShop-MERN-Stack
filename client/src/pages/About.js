import React from "react"
import Layout from "../components/layout/Layout"


const About = () => {

    return(
        <Layout title={"Aboutus-Ecommerce"}>
            <div className="row contactus">
                <div className="col-md-6">
                <img
                    src="https://st2.depositphotos.com/3591429/6006/i/450/depositphotos_60063963-stock-photo-people-discussing-about-us.jpg"
                    alt="contactus"
                    style={{ width: "80%" }}
                />
                </div>
                <div className="col-md-4">
                    <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                    officiis obcaecati esse tempore unde ratione, eveniet mollitia,
                    perferendis eius temporibus dicta blanditiis doloremque explicabo
                    quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
                    accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
                    commodi illum quidem neque tempora nam.
                    </p>
  
                </div>
                

            </div>
            
            
        </Layout>
    )
}

export default About