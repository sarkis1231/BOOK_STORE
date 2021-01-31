import React from 'react';
import Layout from "../components/Layout";
import Footer from "../components/Footer/Footer";

const HeaderFooterLayout = (WrappedComponent) => {
    return (props) => {
    return (
        <>
            <Layout>
                <WrappedComponent {...props}/>
            </Layout>
        </>
    );

    }
};

export default HeaderFooterLayout;