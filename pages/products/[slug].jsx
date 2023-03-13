import React from "react";
import Layout from "../../components/Layout";
import db from "../../database/db";
import Product from "../../model/Product";
import Image from "next/image";
import PersianNumber from "react-persian-currency/lib/PersianNumber";
import useDividedPrice from "../../hooks/useDividedPrice";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Store } from "../../utils/Store";
import { toast } from "react-toastify";

function ProductItem(props) {
  const { product } = props;
  const price = useDividedPrice(product.price);
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const addToCartHandler = (slug) => {
    console.log(slug);
    const existItem = state.cart.cartItems.find((x) => x.slug === slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      setAlert(true);
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity: quantity },
    });
    toast.success(`محصول ${slug} به سبد خرید افزوده شد.`);
  };
  return (
    <Layout>
      <div className=" flex flex-col ml:flex-row items-center justify-start w-full min-h-[80vh]">
        <Image
          onClick={() => router.push(product.image)}
          src={product.image}
          width={410}
          height={410}
          alt={product.slug}
        />
        <div className="flex flex-col mt-[1.5rem] ml:self-start ml:mr-[3rem] w-[40%] mr-3">
          <h1 className="text-[1.3rem] font-normal -mr-3">{product.name}</h1>
          <p>
            <span>قیمت: </span>
            <span>
              <PersianNumber>{price}</PersianNumber>
            </span>
            <span className="text-[.8rem]"> تومان</span>
          </p>
          <p>{product.description}</p>
          <button
            className="tertiary-button mt-4 self-end md:self-start"
            onClick={() => addToCartHandler(product.slug, product)}
          >
            <HiOutlineShoppingBag size={20} />
            افزودن به سبد خرید
          </button>
        </div>
      </div>
    </Layout>
  );
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
