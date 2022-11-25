import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import Landing from "./_landing";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Layout title={"خانه - دندانینو"} home><Landing /></Layout>
    </div>
  );
}
