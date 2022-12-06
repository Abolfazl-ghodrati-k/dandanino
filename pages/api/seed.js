import db from '../../database/db'
import Product from '../../model/Product'
import User from '../../model/User'
import {users,products} from '../../utils/data'

const handler = async (req, res) => {
    await db.connect();

    await User.deleteMany();
    await User.insertMany(users);
    await Product.deleteMany();
    await Product.insertMany(products);
    await db.disconnect();

    return res.send({message: "Seeded successfully..."})
}

export default handler