import { getSession } from "next-auth/react";
import Order from "../../../model/Order";
import db from "../../../database/db";
import mongoose from "mongoose";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send("signin required");
  }

  const { user } = session;
  await db.connect();
  
//   res.send(req.body)
  const newOrder = new Order({
    ...req.body,
    user,
  });

  const order = await newOrder.save();
  res.send(order);
};
export default handler;
