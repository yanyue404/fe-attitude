 function hookFetch (interceptors) {

  // Save original fetch as _rfetch
  var realFetch = "_rfetch";
  // Avoid double fetch hook
  window[realFetch] = window[realFetch] || fetch;

  //定义用来存储拦截请求和拦截响应结果的处理函数集合
  let interceptors_req = [], interceptors_res = [];
  function c_fetch (input, init = {}) {

    //fetch默认请求方式设为GET
    if(!init.method){
      init.method = 'GET'
    }

    //interceptors_req是拦截请求的拦截处理函数集合
    if(interceptors_req.length) {
      interceptors_req.reduce( (init, interceptor) => {
        return c_fetch.interceptors.interceptors.requestInterceptors[interceptor](input, init);
      }, init);
    }

    return new Promise(function (resolve, reject) {
      window[realFetch](input, init).then(res => {

        // 分流
        const [progressStream, returnStream] = res.body.tee()
        // 生成需要返回的res
        const origRes = new Response(
          returnStream,
          { headers: res.headers,
          status: res.status,
          statusText: res.statusText })

        const interceptedRes = new Response(progressStream, { headers: res.headers })

        async function runInterceptors (input, res) {

          let resolvedRes = await res.json();

          interceptors_res.reduce((interceptorRes, interceptor) => {
            //拦截器对响应结果做处理，把处理后的结果返回给响应结果。
            return c_fetch.interceptors.interceptors.responseInterceptors[interceptor](input, interceptorRes);
          }, resolvedRes);
          
          return resolvedRes;
        }

        if(interceptors_res.length) {
          //修改原响应的json方法为获取mock后的数据
          //直接返回new Response时会报json方法已被使用过
          origRes.json = () => runInterceptors(input, interceptedRes);
        }

        //将拦截器分流后的响应结果resolve出去
        resolve(origRes)
      }).catch(err => {
        reject(err);
      })
    })
  }

  //在c_fetch函数上面增加拦截器interceptors，拦截器提供request和response两种拦截器功能。
  c_fetch.interceptors = {
    interceptors: interceptors, // interceptors object passed in as fetchHook parameter, see structure as the beginning of this file.
    request: {
      use: function (callbacks) {
          for (var callback in callbacks) {
            try{
              if(typeof callbacks[callback] === "function"){
                interceptors_req.push(callback)
              }
            }catch(err){
              console.log(err);
            }
          }
      }
    },
    response: {
      use: function (callbacks) {
          for (var callback in callbacks) {
            try{
              if(typeof callbacks[callback] === "function"){
                interceptors_res.push(callback)
              }
            }catch(err){
              console.log(err);
            }
          }
      }
    }
  }

  // Setup interceptors.
  c_fetch.interceptors.request.use(interceptors.requestInterceptors)
  c_fetch.interceptors.response.use(interceptors.responseInterceptors)

  // hook fetch finally.
  window.fetch = c_fetch;
}

function unHookFetch() {
    if (window[realFetch]) fetch = window[realFetch];
    window[realFetch] = undefined;
}

export {
    hookFetch,
    unHookFetch
}