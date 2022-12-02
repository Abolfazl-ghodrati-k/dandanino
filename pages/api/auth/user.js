import connectMongo from "../../../database/conn";
import Users from "../../../model/Schema";
import Cors from "cors";

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  var Connection = true
  connectMongo().catch((err) => {Connection = false});
  if(!Connection) {
    return res.json({ error: "Connection Failed...!" })
  }
  if (req.method == "POST") {
    if (!req.body) {
      return res.status(404).json({ error: "Dont have form data" });
    }

    const  username  = req.body;

    const user = await Users.findOne({ username });
    if (user) {
      return res.status(400).json({ status: 400, user: user });
    } else {
      return res.status(404).json({status:404, message: "User not found" });
    }
  }
  res.status(500).json({ message: "HTTP method not valid" });
}
