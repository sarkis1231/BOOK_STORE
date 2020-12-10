import React from 'react';
import Layout from "../components/Layout";

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