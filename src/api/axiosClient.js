// api/axiosClient.js
import axios from "axios";
import queryString from "query-string";
import * as variable from "variables/Variables";

// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
// config` for the full list of configs

const axiosClient = axios.create({
  baseURL: variable.jsonplaceholerAPI,
  headers: {
    "content-type": "application/json",
  },
  //   ! Việc parse param của asiox có hơi 
  // !vấn đề nên ta sẽ sử dụng query string để xủ lí việc này

  //? Ví dụ như ta phải viét query stirng thế này : ?userid=""&password="". Khá là mệt, 
  //?dùng cái thư việ này ta chỉ cần bỏ param vào thôi, còn lại nó sẽ tự chuyển thành query trên

  paramsSerializer: (params) => queryString.stringify(params),
});

// ! Xử lí phần authen token, mỗi api đề có cái này mới đc
axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});

// * mỗi reponse ta sẽ phải thực hiện lấy
axiosClient.interceptors.response.use(
//*reponse.data để lấy về json yêu cầu, ta thực hiện ở đây luôn cho lẹ
// ! nghĩ lại thì ta cần nhiều thư hơn đơn thuần là data
  (response) => {
    // if (response && response.data) {
    //   return response.data;
    // }
    return response;
  },
  (error) => {
    // * Nếu ta muốn xem cái này thì ở kết quả trả về ta .error thì ta sẽ thấy rõ
    // * Và nếu muốn xem status code thì ở .request cũng sẽ có đủ
    throw error;
  }
);
export default axiosClient;
 