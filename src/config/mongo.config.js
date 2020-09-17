import mongoose from 'mongoose';
const MONGODB_URL =
  'mongodb+srv://fadilMuh:akuFadil22;@smkn4bdgcluster-h7mx1.mongodb.net/JASTIS?retryWrites=true&w=majority';
const connection = mongoose.connection;
const mongoOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

export const dbConnect = () => {
  mongoose.connect(MONGODB_URL, mongoOptions);
  connection.once('open', () => {
    console.log(`MongoDB connection success on ${new Date()}`);
  });
};
