import { getSession } from "next-auth/react";
import Order from "../../../model/Order";
import db from "../../../database/db";
import mongoose from "mongoose";
import moment from "jalali-moment";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send("signin required");
  }

  const { user } = session;
  await db.connect();

  const newOrder = await Order.create({
    ...req.body,
    user,
  });
  var order = await newOrder.save();

  // var order = await Order.findOneAndUpdate(
  //   { _id: newOrder._id },
  //   { createdAt: createdAt_persian },
  //   { new: true }
  // );
  res.send(order);
};
export default handler;
