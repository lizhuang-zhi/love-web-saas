import axios from 'axios'

//全局配置
axios.defaults.baseURL = "http://127.0.0.1:5001"
axios.defaults.timeout = 5000

export function request(config) {
    const instace = axios.create({})
    //请求拦截
    instace.interceptors.request.use(config => {
        // 将token添加到请求头中
        let token = localStorage.getItem("token");
        if(token) {
            config.headers['Authorization'] = localStorage.getItem("token");
        }
        return config;
    }, err => {
        // 错误处理
        Promise.reject(err)
    })
    //响应拦截
    instace.interceptors.response.use(res => {
        return res.data
    }, err => {
        //错误处理
    })
    return instace(config)
}