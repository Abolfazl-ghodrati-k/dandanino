import { getSession } from 'next-auth/react';
import User from '../../../../model/User';
import db from '../../../../database/db';

const handler = async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });
  const session = await getSession({ req });
  if (!session || !session.user.email) {
    return res.status(401).send('admin signin required');
  }
  await db.connect();
  const users = await User.find({});
  await db.disconnect();
  var simpleUsers = []
  users.map(user => {
    if(!user.isAdmin){
        simpleUsers.push(user)
    }
  })
  res.send(simpleUsers);
};

export default handler;