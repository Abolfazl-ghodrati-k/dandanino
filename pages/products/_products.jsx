import React, { useEffect, useState } from "react";
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
    <div className="mt-[6rem] text-[white] max-w-[85%] mx-auto lg:max-w-[80%]">
      <div className="title text-[black]">تایتل</div>
      {Product1 ? (
        <div className="grid grid-cols-2 h-full gap-4">
          <div className="col-span-2 bg-[orange] rounded-lg md:col-span-1">
            <SpecialProduct product={Product1} />
          </div>
          <div className="col-span-2 grid grid-cols-1 gap-4 md:col-span-1">
            {OtherProducts.map((product) => (
              <div className="bg-[red] col-span-1 rounded-lg">
                <OthProducts product={product} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        "loading"
      )}
    </div>
  );
}

export default Products;
