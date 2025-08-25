import axios from 'axios';
import abort from './abort';
import {router} from '../modules/router';

// 全局配置
axios.defaults.timeout = 3 * 60 * 1000; // 设置超时
axios.defaults.withCredentials = false; // 表示跨域请求时是否需要使用凭证
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['Access-Control-Allow-Origin-Type'] = '*';

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 缓存接口
    abort.judge({ url: config.url || '', method: config.method || '' });

    // 添加身份验证
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    // 清除缓存接口
    abort.remove({ url: response.config.url || '', method: response.config.method || '' });
    return response;
  },
  (error) => {
    // 处理 401 和 403 错误
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem('token');
      router.push({ path: '/login' });
      return Promise.reject(error);
    }
    // 处理其他错误
    return Promise.reject(error);
  }
);

// 封装的请求方法
export const request = (option) => {
  return new Promise((resolve, reject) => {
    axios(option)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        if (err.response) {
          reject(err.response);
        } else if (err.request) {
          reject(err.request);
        } else {
          reject(err.message);
        }
      });
  });
};

export default request;