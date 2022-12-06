import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import OthProducts from "../../components/OthProducts";
import SpecialProduct from "../../components/SpecialProduct";


function Products({ products }) {
  const [Product1, setProduct1] = useState({});
  const [OtherProducts, setOtherProducts] = useState([]);
  // console.log(products);
  useEffect(() => {
    var pros = [];

    products.map((product) => {
      if (product.slug == "RevyLine-RL450") {
        setProduct1(product);
      } else {
        pros.push(product);
      }
    });
    setOtherProducts(pros);
  }, [products]);
  return (
    <Layout>
      {Product1 ? (
        <div className="max-w-[60%] mx-auto flex justify-between gap-3">
          <div className="w-[50%] bg-[red] text-left">
            {OtherProducts.map(product => <div><OthProducts product={product} /></div>)}
          </div>
          <div className="w-[50%] bg-[purple] text-left">
            <SpecialProduct product={Product1} />
          </div>
        </div>
      ) : (
        "loading"
      )}
    </Layout>
  );
}

export default Products;

