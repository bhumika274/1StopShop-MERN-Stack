import React from "react"
import Layout from "../components/layout/Layout"
import { MdOutlineEmail, MdOutlineHeadphones } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";



const Contact = () => {
    return(
        <Layout title={"Contact us"}>
            <div className="row contactus">
                <div className="col-md-6">
                <img
                    src="https://media.istockphoto.com/id/1311934969/photo/contact-us.jpg?s=612x612&w=0&k=20&c=_vmYyAX0aFi-sHH8eYS-tLLNfs1ZWXnNB8M7_KWwhgg="
                    alt="contactus"
                    style={{ width: "100%" }}
                />
                </div>
                <div className="col-md-4">
                    <h1 className="bg-dark text-white text-center p-2">Contact Us</h1>
                    <p className="mt-3 text-justify"> feel free to contact us any time we are available 24×7</p>
                        <p className="mt-3">
                            <MdOutlineEmail />: www.help@ecommerceapp.com
                        </p>
                        <p className="mt-3">
                            <IoCallOutline />: 012–3456789
                        </p>
                        <p className="mt-3">
                            <MdOutlineHeadphones />: 1800 –0000–0000 (toll-free)
                        </p>
  
                </div>
                

            </div>
            
            
        </Layout>
    )
}

export default Contact