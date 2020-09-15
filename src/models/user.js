import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  city: [
    {
      name: {
        type: String,
      },

      id: {
        type: Number,
      },
    },
  ],
})

export const UserModel = mongoose.model('User', UserSchema)
