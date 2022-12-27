import axios from "axios";
import Link from "next/link";
import { Bar } from "react-chartjs-2";

import { TbUsers, TbCurrencyDollar } from "react-icons/tb";
import { HiOutlineShoppingCart } from "react-icons/hi";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import React, { useEffect, useReducer } from "react";
import { getError } from "../../utils/error";
import AdminLayout from "../../components/AdminLayout";
import PersianNumber from "react-persian-currency/lib/PersianNumber";
import useDividedPrice from "../../hooks/useDividedPrice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, summary: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function AdminDashboardScreen() {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/summary`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: summary.salesData.map((x) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: "فروش ها",
        backgroundColor: "rgba(162, 222, 208, 1)",
        data: summary.salesData.map((x) => x.totalSales),
      },
    ],
  };

  return (
    <AdminLayout title={"داشبورد ادمین"}>
      {loading ? (
        <div>صبر کن داشم ...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-6">
            <div className="admincart m-5 p-5 md:col-span-2 hover:bg-slate-100 transition-all duration-500">
              <Link href="/admin/orders">
                <div className="p-2 rounded w-[45px] flex items-center mb-2 justify-center bg-[#3a3a3a]">
                  <TbCurrencyDollar size={25} color={'gold'}/>
                </div>
                <p>فروش</p>
                <p className="text-[.9rem] text-[gray]">
                  <PersianNumber>{useDividedPrice(summary.ordersPrice)} تومان</PersianNumber>   
                </p>
              </Link>
            </div>
            <div className="admincart m-5 p-5 md:col-span-2 hover:bg-slate-100 transition-all duration-500">
              <Link href="/admin/orders">
                <div className="p-2 rounded w-[45px] flex items-center mb-2 justify-center bg-[#3a3a3a]">
                  <HiOutlineShoppingCart size={25} color={'gold'}/>
                </div>
                <p>سفارشات</p>
                <p className="text-[.9rem] text-[gray]">
                  <PersianNumber>{summary.ordersCount}</PersianNumber>
                </p>
              </Link>
            </div>
            <div className="admincart m-5 p-5 md:col-span-2 hover:bg-slate-100 transition-all duration-500">
              <Link href="/admin/users ">
                <div className="p-2 rounded w-[45px] flex items-center justify-center mb-2 bg-[#3a3a3a]">
                  <TbUsers size={25} color={'gold'} />
                </div>
                <p>کاربران</p>
                <p className="text-[.9rem] text-[gray]">
                  <PersianNumber>{summary.usersCount}</PersianNumber>
                </p>
              </Link>
            </div>
          </div>
          <h2 className="text-xl">گزارش فروش</h2>
          <Bar
            options={{
              legend: { display: true, position: "right" },
            }}
            data={data}
          />
        </div>
      )}
    </AdminLayout>
  );
}

AdminDashboardScreen.auth = { adminOnly: true };
export default AdminDashboardScreen;
