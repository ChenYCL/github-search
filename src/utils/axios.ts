import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

axios.defaults.timeout  = 10000;
export function createGithubAxiosInstance(token: string, headers={} ): AxiosInstance {
  const instance = axios.create({
    baseURL: 'https://api.github.com/search',
  });

  instance.interceptors.request.use(
    // @ts-ignore
    (config:AxiosRequestConfig ) => {
      config.headers = config.headers || {};
      if(token) config.headers['Authorization'] = `token ${token}`;
      if(headers){
        config.headers = {...config.headers,...headers}
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (response.status < 200 || response.status >= 300) {
        return Promise.reject(new Error(`Error ${response.status}: ${response.statusText}`));
      }
      return response;
    },
    (error) => {
      return Promise.reject(new Error(`Error ${error.response.status}: ${error.response.statusText}`));
    }
  );

  return instance;
}
