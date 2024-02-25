import React from "react";
import Footer from "./Footers";
import Header from "./headers";
import {Helmet} from "react-helmet";
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({children, title, description, keywords, author}) => {
    return(
        <>
            <Helmet>
                    <meta charSet="utf-8" />
                    <meta charSet="UTF-8" />
                    <meta name="description" content={description} />
                    <meta name="keywords" content={keywords} />
                    <meta name="author" content={author} />
                    <title>{title}</title>
            </Helmet>
           <Header />
           <main style={{ minHeight: "79vh" }}>
                <Toaster />
                {children}
           </main>
           <Footer />
        </>
    )
}

export default Layout