import Layout from "../components/Layout";
import db from "../database/db";
import Product from "../model/Product";
import Landing from "./_landing";

export default function Home({products}) {
  console.log(products)
  return (
    <div className="min-h-screen">
      <Layout title={"خانه - دندانینو"} home>
        {products ? <Landing products={products}/> : 'loading...'}
      </Layout>
    </div>
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
