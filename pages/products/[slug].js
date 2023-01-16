import React from "react";
import Layout from "../../components/Layout";
import db from "../../database/db";
import Product from "../../model/Product";

function ProductItem(props) {
  console.log(props);
  return <Layout>product{props.product.name}</Layout>;
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
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
