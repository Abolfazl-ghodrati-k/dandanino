import connectMongo from "../../../database/conn";
import Users from "../../../model/Schema";
import Cors from 'cors'

const cors = Cors({
  methods:['POST', 'GET', 'HEAD'],
})

function runMiddleware(req,res,fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(req, res) {
  await runMiddleware(req,res,cors)
  connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));
  // only post method is accepted
  if (req.method === "POST") {
    if (!req.body) {
      return res.status(404).json({ error: "Dont have form data" });
    }
    const { username } = req.body;

    if (username.length !== 11) {
      return res.status(404).json({ message: "dadash in che shomareiiee!" });
    }

    const checkexisting = await Users.findOne({ username });
    if (checkexisting) {
      return res
        .status(422)
        .json({ status: 422, message: "User Already Exists...!" });
    }

    Users.create({ username }, function (err, data) {
      if (err) {
        return res.status(404).json({ err });
      }
      res.status(201).json({ status: true, user: data });
    });
  } 
  else {
    res.status(500).json({ message: "HTTP method not valid" });
  }
}
