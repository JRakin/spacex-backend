import { connect } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();  
const mongoUri = process.env.MONGO_URI || '';

const initDB = async () => {
  try {
    await connect(`${mongoUri}`);
    console.log("DB Connected successfully...");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default initDB;