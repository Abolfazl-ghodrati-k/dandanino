import axios from "axios";
import Link from "next/link";
import React, { useEffect, useReducer, useState } from "react";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";
import AdminLayout from "../../components/AdminLayout";
import PersianNumber from "react-persian-currency/lib/PersianNumber";
import useDividedPrice from "../../hooks/useDividedPrice";
import moment from "jalali-moment";
import TableFooter from "../../components/TableFooter";
import useTable from "../../hooks/useTable";
import {TiTimes} from 'react-icons/ti'
import { useRouter } from "next/router";


function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

export default function AdminOrderScreen({rowsPerPage= 6}) {
  const [page, setPage] = useState(1);

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/orders`);
        // console.log(data)
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);
  const { slice, range } = useTable(orders, page, rowsPerPage)

  const router = useRouter()

  return (
    <AdminLayout title={"سفارشات - واریزی"}>
      {loading ? (
        <div>صبر کن بابا جان</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="max-w-full overflow-x-auto mx-auto overflow-y-hidden">
          <table className="min-w-full  overflow-x-auto">
            <thead className="border-b">
              <tr className="text-right">
                <th className="px-5 text-right">ایدی سفارش</th>
                <th className="p-5 text-right"> تلفن خریدار</th>
                <th className="p-5 text-right">تاریخ</th>
                <th className="p-5 text-right">جمع</th>
                <th className="p-5 text-right">پرداخت شده</th>
                <th className="p-5 text-right">تحویل شده</th>
                <th className="p-5 text-right">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {slice.map((order) => (
                <tr key={order._id} className="border-b text-right">
                  <td className="p-5">{order._id.substring(20, 24)}</td>
                  <td className="p-5">
                    {order.user ? (
                      <PersianNumber>{order.user.username}</PersianNumber>
                    ) : (
                      "کاربر حذف شده"
                    )}
                  </td>
                  <td className="p-5">
                    <PersianNumber>
                      {moment(order.createdAt,'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}
                    </PersianNumber>
                  </td>
                  <td className="p-5"><PersianNumber>{useDividedPrice(order.totalPrice)}</PersianNumber></td>
                  <td className="">
                    {order.isPaid
                      ? `${order.paidAt.substring(0, 10)}`
                      : <span className="text-[.9rem] bg-[red] rounded grid place-items-center mx-auto w-[30%] p-1 pl-[.3rem]"><TiTimes /></span>}
                  </td>
                  <td className="">
                    {order.isDelivered
                      ? `${order.deliveredAt.substring(0, 10)}`
                      : <span className="text-[.9rem] bg-[red] rounded grid place-items-center mx-auto w-[30%] p-1 pl-[.3rem]"><TiTimes /></span>}
                  </td>
                  <td className="p-5">
                    <Link href={{pathname:`/order/${order._id}`, query:{redirect: router.pathname}}} passHref>
                      <span className="hover:text-[#415505]">جزییات</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
        </div>
      )}
    </AdminLayout>
  );
}

AdminOrderScreen.auth = { adminOnly: true };
