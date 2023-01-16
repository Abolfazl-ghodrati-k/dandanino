import React, { useEffect, useState } from "react";
import OthProducts from "../../components/OthProducts";
import SpecialProduct from "../../components/SpecialProduct";
import {GrCloudDownload} from 'react-icons/gr'

function Products({ products }) {
  const [Product1, setProduct1] = useState({});
  const [OtherProducts, setOtherProducts] = useState([]);
  // console.log(products);
  useEffect(() => {
    var pros = [];
    var revyLine = [];
    products.map((product) => {
      if (product.brand == "RevyLine") {
        revyLine.push(product);
      } else {
        pros.push(product);
      }
    });
    setProduct1(revyLine);
    setOtherProducts(pros);
  }, [products]);
  return (
    <div className="mt-[6rem] text-[white] max-w-[85%] mx-auto lg:max-w-[80%]">
      <div className="flex flex-col items-between justify-center md:flex-row md:justify-between md:items-center">
        <div className="title text-right text-[black] my-4">
          <h1 className="text-[gray]">زیبا ترین و بهترین</h1>
          <p className="text-[1.8rem]">محصول خود را انتخاب کنید</p>
        </div>
        <div className="text-[black] mr-auto p-2 cursor-pointer rounded-md text-[0.7rem] flex gap-3 hover:bg-slate-200 justify-end mb-5">
          <span>دانلود کاتالوگ</span>
          <GrCloudDownload size={20}/>
        </div>
      </div>
      {Product1 ? (
        <div className="grid grid-cols-12 h-full gap-4">
          <div className="col-span-12 rounded-lg md:col-span-5 bg-[#f2f7f6] hover:shadow-lg shadow-slate-600">
            <SpecialProduct product={Product1} />
          </div>
          <div className="col-span-12 grid grid-cols-1 gap-3 md:col-span-7">
            {OtherProducts.map((product) => (
              <div
                key={product.name}
                className=" row-span-1 grid place-items-center rounded-lg bg-[#f2f7f6] hover:shadow-lg shadow-slate-600"
              >
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
