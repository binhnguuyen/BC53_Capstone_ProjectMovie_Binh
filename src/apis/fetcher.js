import axios from "axios";
import { CURRENT_USER } from "../constants";

const fetcher = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api",
  headers: {
    TokenCybersoft:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MyIsIkhldEhhblN0cmluZyI6IjA1LzA1LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxNDg2NzIwMDAwMCIsIm5iZiI6MTY4Njc2MjAwMCwiZXhwIjoxNzE1MDE0ODAwfQ.5ch0U3B88fGDn067ipN5mT-pHyAOZTzdwpBiwr4p5Aw",
  },
});

// can thiệp sau khi request đưa dữ liệu lên API
// tất cả nhưng phương thức post, get, put gì đều chạy qua thằng này
// bằng cách làm này thì mình có thể can thiệp vào tất cả các API 
fetcher.interceptors.request.use((config) => {
  // console.log('config: ', config);
  // ngay đây ko dùng useContext đc vì ko dùng hook trong function bình thường đc mà chỉ dùng trong function component
  const user = JSON.parse(localStorage.getItem(CURRENT_USER));
  if(user) {
    // thêm Authorization vào headers
    // có 2 cách
    // config.headers["Authorization"] = user.accessToken;
    config.headers.Authorization = `Bearer ${user.accessToken}`;
  }
  console.log('config: ', config);
  return config;
})

// can thiệp sau khi dữ liệu từ API xuống
fetcher.interceptors.response.use((response) => {
  // console.log('reponse: ', response);
  // hiểu thêm về custom cái dữ liệu API khi nó trả về
  // const result = {
  //   ...response,
  //   data: {
  //     content: [],
  //   }
  // }
  // console.log('result: ', result);
  // return result;
  return response;
})

export default fetcher;
