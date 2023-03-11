import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import CheckoutWizard from "../../components/CheckoutWizard";
import Layout from "../../components/Layout";
import { Store } from "../../utils/Store";
import PersianNumber from "react-persian-currency/lib/PersianNumber";
import useDividedPrice from "../../hooks/useDividedPrice";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";

function index() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const {data: session} = useSession();
  console.log(session.user)

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  ); // 123.4567 => 123.46
  const shippingPrice = itemsPrice > 10000000 ? 0 : 0;
  const totalPrice = round2(itemsPrice + shippingPrice);

  const router = useRouter();
  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/orders", {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod: paymentMethod.title,
        phoneNumber: '123',
        itemsPrice,
        shippingPrice,
        totalPrice,
      });
      setLoading(false);
      console.log(data)
      dispatch({ type: "CART_CLEAR_ITEMS" });
      Cookies.set(
        "cart",
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      toast.success("سفارش شما با موفقیت ثبت شد");
      setTimeout(() => {
        router.push(`/order/${data._id}`);
      }, [1000]);
    } catch (err) {
      setLoading(false);
      // console.log(err)
      toast.error(err);
    }
  };

  return (
    <Layout>
      <CheckoutWizard activeStep={3} />
      <h1 className="mb-4 text-xl">ثبت سفارش</h1>
      {cartItems.length === 0 ? (
        <div>
          سبد خرید شما خالی است. <Link href="/">برگشت به صفحه اصلی</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card  p-5">
              <h2 className="mb-2 text-lg">اطلاعات خریدار</h2>
              <div className="text-[.8rem]">
                <div>
                  {shippingAddress.firstName} {shippingAddress.lastName}
                </div>
                <div>
                  {shippingAddress.city}, {shippingAddress.address}
                </div>
                <div>کد پستی: {shippingAddress.postalCode}</div>
                {shippingAddress.country}
              </div>
              <div>
                <Link
                  href={{
                    pathname: "/shipping",
                    query: { redirect: "placeorder" },
                  }}
                >
                  ویرایش
                </Link>
              </div>
            </div>
            <div className="card  p-5 text-[.8rem]">
              <h2 className="mb-2 text-lg">نحوه پرداخت</h2>
              <div>{paymentMethod.title}</div>
              <div>
                <Link
                  href={{
                    pathname: "/payment",
                    query: { redirect: "placeorder" },
                  }}
                >
                  ویرایش
                </Link>
              </div>
            </div>
            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">سفارشات</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">محصول</th>
                    <th className="p-5 text-right">تعداد</th>
                    <th className="p-5 text-right">قیمت</th>
                    <th className="p-5 text-right">مجموع</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td>
                        <Link href={`/products/${item.slug}`}>
                          <div className="flex flex-col md:flex-row items-center">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            ></Image>
                            &nbsp;
                            <span className="text-[.8rem] text-left">
                              {item.name}
                            </span>
                          </div>
                        </Link>
                      </td>
                      <td className=" p-5 text-right text-[.8rem] md:text-[1rem]">
                        <PersianNumber>{item.quantity}</PersianNumber>
                      </td>
                      <td className="p-5 text-right text-[.8rem] md:text-[1rem]">
                        <PersianNumber>
                          {useDividedPrice(item.price)} تومان
                        </PersianNumber>
                      </td>
                      <td className="p-5 text-right text-[.8rem] md:text-[1rem]">
                        <PersianNumber>
                          {useDividedPrice(item.quantity * item.price)} تومان
                        </PersianNumber>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link href="/cart">ویرایش</Link>
              </div>
            </div>
          </div>
          <div>
            <div className="card  p-5">
              <h2 className="mb-2 text-lg">خلاصه سفارش</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>هزینه سفارشات</div>
                    <div>
                      <PersianNumber>
                        {useDividedPrice(itemsPrice)} تومان
                      </PersianNumber>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>هزینه ارسال</div>
                    <div>
                      <PersianNumber>
                        {useDividedPrice(shippingPrice)} تومان
                      </PersianNumber>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>مجموع خرید</div>
                    <div>
                      <PersianNumber>
                        {useDividedPrice(totalPrice)} تومان
                      </PersianNumber>
                    </div>
                  </div>
                </li>
                <li>
                  <button
                    disabled={loading}
                    onClick={placeOrderHandler}
                    className="primary-button w-full"
                  >
                    {loading ? "لطفا صبر کنید ..." : "ثبت سفارش"}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(index), { ssr: false });
