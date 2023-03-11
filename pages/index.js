import Layout from "../components/Layout";
import db from "../database/db";
import Product from "../model/Product";
import Landing from "./_landing";

export default function Home({products}) {
  console.log(products)
  return (
      <Layout title={"خانه - دندانینو"} home>
        {products ? <Landing products={products}/> : 'loading...'}
      </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();

  const products = await Product.find().lean();
  return {
    props: {
      products: products ? products.map(db.convertDocToObj) : null,
    },
  };
}
