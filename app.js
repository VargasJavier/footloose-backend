const KEY = "5573900aa08531587586";

const axios = require("axios").default;

const api = axios.create({
  baseURL: "https://api.deezer.com/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

const getArtist = async () => {
  const { data } = await api("artist/27");
  console.log(data);
};

getArtist();
