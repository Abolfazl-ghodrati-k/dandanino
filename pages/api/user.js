import { getSession } from "next-auth/react";
import Order from "./../../model/Order";
import db from "./../../database/db";
import User from "../../model/User";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send("no user found sign in");
  }

  const { user } = session;
  await db.connect();

  const docs = User.findById({ _id: user._id }, function (err, docs) {
    if (err) {
      return err;
    }
    return docs;
  });

  function censor(censor) {
    var i = 0;

    return function (key, value) {
      if (
        i !== 0 &&
        typeof censor === "object" &&
        typeof value == "object" &&
        censor == value
      )
        return "[Circular]";

      if (i >= 29)
        // seems to be a harded maximum of 30 serialized objects?
        return "[Unknown]";

      ++i; // so we know we aren't using the original object anymore

      return value;
    };
  }

  var response = JSON.stringify(docs,censor(docs))

  res.send(response);
};
export default handler;
