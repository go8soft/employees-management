import axios from "axios";

export default axios.create({
  baseURL: "https://9sf7x3qadg.execute-api.eu-west-1.amazonaws.com/api/",
  headers: {
    "Content-type": "application/json"
  }
});