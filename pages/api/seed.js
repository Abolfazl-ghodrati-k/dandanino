import connectMongo from '../../database/conn'
import Product from '../../model/Product'
import User from '../../model/User'
import {users,products} from '../../utils/data'

const handler = async (req, res) => {
    connectMongo()
    await User.deleteMany();
    await User.insertMany(users);
    await Product.deleteMany();
    await Product.insertMany(products);
    return res.send({message: users})
}

export default handler