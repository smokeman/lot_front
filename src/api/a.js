var axios = require('axios')
var qs = require('qs');
axios.defaults.baseURL = "http://127.0.0.1:4000"
                // axios.defaults.headers.common['Authorization'] = 
                // axios.defaults.headers['Content-Type']="application/x-www-form-urlencoded"
                // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
axios({method:'post',url:'/wine/wine_save',
data:qs.stringify({a:1}),
headers:{
    'Content-Type': 'application/x-www-form-urlencoded'
}})