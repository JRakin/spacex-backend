import { connect } from "mongoose";

const initDB = async () => {
  try {
    const mongoURI: string = '';
    await connect(mongoURI);
    console.log("DB Connected...");
  } catch (err) {
    // Exit process with failure
    process.exit(1);
  }
};

export default initDB;