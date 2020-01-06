import axios from "axios";

export default axios.create({
  baseURL: "https://xq3bwky81m.execute-api.sa-east-1.amazonaws.com/dev/github",
  timeout: 15000
});
