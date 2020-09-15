import mongoose from 'mongoose';

const CitiesSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export const CitiesModel = mongoose.model('Cities', CitiesSchema);
