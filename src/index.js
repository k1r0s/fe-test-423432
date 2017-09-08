import axios from "axios";

axios.get("data/host-app-data.json").then(({ data }) => {
  console.log(data);
});
