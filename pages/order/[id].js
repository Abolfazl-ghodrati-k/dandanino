// import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";
import PersianNumber from "react-persian-currency/lib/PersianNumber";
import useDividedPrice from "../../hooks/useDividedPrice";
import moment from "jalali-moment";
import { BiArrowBack } from "react-icons/bi";
import CustomModal from "../../components/CustomModal";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false, errorPay: action.payload };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false, errorPay: "" };

    case "DELIVER_REQUEST":
      return { ...state, loadingDeliver: true };
    case "DELIVER_SUCCESS":
      return { ...state, loadingDeliver: false, successDeliver: true };
    case "DELIVER_FAIL":
      return { ...state, loadingDeliver: false };
    case "DELIVER_RESET":
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };

    default:
      state;
  }
}

function OrderScreen() {
  const [DeliveryModal, setDeliveryModal] = useState(false);
  const [PaymentModal, setPaymentModal] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();
  // order/:id
  // const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const { query } = useRouter();
  const orderId = query.id;

  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingPay,
      loadingDeliver,
      successDeliver,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  useEffect(() => {
    console.log(DeliveryModal);
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (
      !order._id ||
      successPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: "PAY_RESET" });
      }
      if (successDeliver) {
        dispatch({ type: "DELIVER_RESET" });
      }
    }
  }, [order, orderId, successDeliver, successPay, DeliveryModal]);

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  async function PayOrder() {
    try {
      dispatch({ type: "PAY_REQUEST" });
      const { data } = await axios.put(`/api/orders/${order._id}/pay`);
      dispatch({ type: "PAY_SUCCESS", payload: data });
      toast.success("پرداخت موفقیت آمیز بود");
    } catch (err) {
      dispatch({ type: "PAY_FAIL", payload: getError(err) });
      toast.error(getError(err));
    }
  }

  async function deliverOrderHandler() {
    console.log('im here')
    try {
      dispatch({ type: "DELIVER_REQUEST" });
      const { data } = await axios.put(
        `/api/admin/orders/${order._id}/deliver`,
        {}
      );
      dispatch({ type: "DELIVER_SUCCESS", payload: data });
      toast.success("سفارش تحویل داده شد");
    } catch (err) {
      dispatch({ type: "DELIVER_FAIL", payload: getError(err) });
      toast.error(getError(err));
    }
  }

  return (
    <Layout title={`Order ${orderId}`}>
      <div className={`${DeliveryModal || PaymentModal ? "blur-sm" : ""}`}>
        <div
          className={`w-full flex  ${
            session.user.email ? "justify-between" : "justify-start"
          } items-center`}
        >
          <h1 className="mb-4 text-xl mr-1">
            سفارش <span className="text-[.8rem]"> {orderId}</span>
          </h1>
          {session.user.email && (
            <div className="border rounded-md hover:bg-slate-200 ml-2 bg-gray-400">
              <Link href={router.query.redirect || "/admin/dashboard"}>
                <div className="flex justify-center flex-row-reverse items-center px-1 py-2">
                  <BiArrowBack />
                  <span className="mx-2">برگشت</span>
                </div>
              </Link>
            </div>
          )}
        </div>
        {loading ? (
          <div>لطفا صبر کنید ...</div>
        ) : error ? (
          <div className="alert-error">{error}</div>
        ) : (
          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
              <div className="card  p-5">
                <h2 className="mb-2 text-lg text-[1.1rem]">اطلاعات خریدار</h2>
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
                {isDelivered ? (
                  <div className="alert-success text-[.8rem]">
                    تحویل شده در :{" "}
                    <PersianNumber>
                      {moment(deliveredAt, "YYYY/MM/DD")
                        .locale("fa")
                        .format("YYYY/MM/DD")}
                    </PersianNumber>{" "}
                  </div>
                ) : (
                  <div className="alert-error text-[.8rem]">تحویل نشده</div>
                )}
              </div>
              <div className="card p-5 text-[.8rem]">
                <h2 className="mb-2 text-lg">نحوه پرداخت</h2>
                <div>{paymentMethod}</div>
                {isPaid ? (
                  <div className="alert-success">
                    پرداخت شده در :{" "}
                    <PersianNumber>
                      {moment(paidAt, "YYYY/MM/DD")
                        .locale("fa")
                        .format("YYYY/MM/DD")}
                    </PersianNumber>{" "}
                  </div>
                ) : (
                  <div className="alert-error">پرداخت نشده</div>
                )}
              </div>

              <div className="card overflow-x-auto p-5">
                <h2 className="mb-2 text-lg">لیست سفارشات</h2>
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="px-5 text-right">کالا</th>
                      <th className="p-5 text-right">تعداد</th>
                      <th className="p-5 text-right">قیمت</th>
                      <th className="p-5 text-right">جمع</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((item) => (
                      <tr key={item._id} className="border-b">
                        <td>
                          <Link href={`/product/${item.slug}`}>
                            <span className="flex flex-col md:flex-row items-center">
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
                            </span>
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
              </div>
            </div>
            <div>
              <div className="card  p-5">
                <h2 className="mb-2 text-lg">مرور سفارش</h2>
                <ul>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>کالا </div>
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
                  {!isPaid && session.user.email && (
                    <li>
                      <button
                        onClick={() => setPaymentModal(true)}
                        className="w-full bg-[green] py-2 px-4 shadow outline-none hover:bg-[#00b600] text-[white] rounded-md  active:bg-[#005800]"
                      >
                        {loadingPay ? "لطفا صبر کنید" : "پرداخت"}
                      </button>
                    </li>
                  )}

                  {session.user.email && order.isPaid && !order.isDelivered && (
                    <li>
                      <button
                        className="primary-button w-full"
                        onClick={() => setDeliveryModal(true)}
                      >
                        تحویل سفارش
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      <CustomModal
        loading={loadingDeliver}
        onConfirm={deliverOrderHandler}
        title={"تحویل سفارش"}
        body={"آیا از تحویل سفارش مطمئنید"}
        Show={DeliveryModal}
        setShow={setDeliveryModal}
      />
      <CustomModal
        loading={loadingPay}
        onConfirm={PayOrder}
        title={"پرداخت سفارش"}
        body={"آیا از پرداخت سفارش مطمئنید"}
        Show={PaymentModal}
        setShow={setPaymentModal}
      />
    </Layout>
  );
}

OrderScreen.auth = true;
export default OrderScreen;
