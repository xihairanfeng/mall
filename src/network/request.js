import axios from 'axios'

export function request(config) {
    // 1.创建axios的实例
    const instance = axios.create({
      baseURL: '#################',
      timeout: 5000
    })

    instance.interceptors.request.use(config => {
   
      return config
    }, err => {
      // console.log(err)
    })

    //****响应拦截的作用 
    instance.interceptors.response.use(res => {
    //  console.log(res)
     return res.data 
    }, err => {
      // console.log(err)
    })


    // instance.interceptors.response.


    // 3.发送真正的网络请求
    return instance(config)
}