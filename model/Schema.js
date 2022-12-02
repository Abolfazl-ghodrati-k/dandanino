import {Schema, model,models} from 'mongoose'

const userSchema = new Schema({
    username: Number,
})

const Users = models.user || model('user',userSchema)

export default Users