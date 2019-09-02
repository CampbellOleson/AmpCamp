const axios = require("axios");

export const uploadImage = image => {
  return axios.post("/api/upload-image", image);
};

export const uploadAudio = audio => {
//   // return axios.post(, { data: audio });
  return axios({
    method: 'post',
    url: "/api/upload-audio",
    data: audio
})
};