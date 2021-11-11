import axios from "axios";
import jsSHA from "jssha";

/**
 * send async request by axios
 * @param httpMethod request method, all api in MOTC Transport API V2 are get and post.
 * @param url request url, assemble it with query condition and format etc.
 * @returns {Promise<AxiosResponse<unknown>>}
 */
export const sendRequest = (httpMethod, url) => {
  if ("get" === httpMethod.toString().toLowerCase()) {
    return axios.get(url, {headers: getAuthorizationHeader()})
      .then(res => {
        return res;
      })
  } else if ("post" === httpMethod.toString().toLowerCase()) {
    return axios.post(url, {headers: getAuthorizationHeader()})
      .then(res => {
        return res;
      })
  }
}

const getAuthorizationHeader = () => {
  let AppID = 'e212b195247045edafa3708823b7cc5e';
  let AppKey = 'vOA-PgpYHlRJciuElXMSJ9sc1Mc';

  let GMTString = new Date().toGMTString();
  let ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  let HMAC = ShaObj.getHMAC('B64');
  let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
  return {'Authorization': Authorization, 'X-Date': GMTString};
}
