import { getSession } from 'next-auth/react';
import Order from '../../../../model/Order';
import db from '../../../../database/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
//   res.send(session)
  if (!session || (session && !session.user.email)) {
    return res.status(401).send('signin required');
  }
  if (req.method === 'GET') {
    await db.connect();
    const orders = await Order.find({}).populate('user', 'username');
    await db.disconnect();
    res.send(orders);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};

export default handler;
