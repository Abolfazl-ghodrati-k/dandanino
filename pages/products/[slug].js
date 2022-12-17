import React from "react";
import Layout from "../../components/Layout";
import convertDocToObj from "../../database/convDoctoObj";
import db from "../../database/db";
import Product from "../../model/Product";

function ProductItem(props) {
  // console.log(props);
  return <Layout>product</Layout>;
}

export default ProductItem;

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();

  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  return {
    props: {
      product: product ? convertDocToObj(product) : null,
    },
  };
}
