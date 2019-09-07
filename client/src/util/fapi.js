const axios = require("axios");

export const uploadImage = image => {
  return axios.post("/api/upload-image", image);
};

export const uploadAudio = audio => {
  return axios.post("/api/upload-audio", audio);
};
