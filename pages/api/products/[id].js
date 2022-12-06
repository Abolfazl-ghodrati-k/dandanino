import db from "../../../database/db";
import disconnectMongo from "../../../database/disconn";
import Product from "../../../models/Product";

const handler = async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();
  res.send(product);
};

export default handler;
