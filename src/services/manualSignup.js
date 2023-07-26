import axios from "axios";
import { v4 } from "uuid";

export const manualSignup = async (values, value3) => {
  const id = v4();
  const obn = {
    name: values.name,
    email: values.email,
    password: values.password,
    designation: value3,
    jointime: new Date(),
    uid: id,
  };

  try {
    await axios.post("http://localhost:4000/signup", obn).then((res) => {
      if (res.status === 200) {
        return 200;
      } else {
        return "User Already found Please Log In";
      }
    })
  } 
  catch (err) {
    console.log(err);
  }
};
