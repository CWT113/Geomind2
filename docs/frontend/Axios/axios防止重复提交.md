防止重复提交



Map集合缓存请求

> [!IMPORTANT]
>
> - 用 `Map` 集合存储正在执行中的请求，并使用 method + url + params + data 作为唯一键；
> - 如果短时间内相同的请求还没有结束，就组织新的请求发起；
> - 请求完成后立即从 `Map` 中移除记录；

::: code-group

```typescript [axios.ts] {15-20,30,35}
import axios, { type AxiosResponse } from 'axios'
import { useResubmit } from '@/hooks/useResubmit.ts'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'

const { addRequest, removeRequest } = useResubmit()

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 查看当前请求是否允许被发起
    const allowRequest = addRequest(config)
    if (!allowRequest) {
      return Promise.reject(
        new Error('[axios]: The request is being executed. Please do not submit it repeatedly.'),
      )
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    removeRequest(response.config)
    return response.data
  },
  (error: AxiosError) => {
    if (error.config) {
      removeRequest(error.config)
    }
    return Promise.reject(error)
  },
)

export default service
```

```typescript [useResubmit.ts]
import type { AxiosRequestConfig } from 'axios'

/**
 * Axios防止重复提交的Hooks
 */
export const useResubmit = () => {
  const pendingRequests = new Map<string, AbortController>()

  /**
   * 获取请求在集合中的键
   * @param config axios请求参数
   */
  function getRequestKey(config: AxiosRequestConfig) {
    const { method, url, params, data } = config
    return [method, url, JSON.stringify(params), JSON.stringify(data)].join('--')
  }

  /**
   * 向集合中添加请求
   * @param config axios请求参数
   */
  function addRequest(config: AxiosRequestConfig) {
    const requestKey = getRequestKey(config)
    // 如果当前请求在集合中，表示正在请求，则后续请求直接判定为重复提交
    if (pendingRequests.has(requestKey)) {
      return false
    }
    const controller = new AbortController()
    config.signal = controller.signal
    pendingRequests.set(requestKey, controller)
    return true
  }

  /**
   * 从集合中移除请求
   * @param config axios请求参数
   */
  function removeRequest(config: AxiosRequestConfig) {
    const requestKey = getRequestKey(config)
    if (pendingRequests.has(requestKey)) {
      pendingRequests.delete(requestKey)
    }
  }

  return { addRequest, removeRequest }
}
```

:::



时间戳区分请求

```typescript
import axios, { type AxiosResponse } from 'axios'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const timestamp = Date.now()

    if (config.method?.toLowerCase() === 'get') {
      config.params = {
        ...(config.params || {}),
        _t: timestamp.toString(), // 拼接时间戳
      }
    } else {
      if (config.data instanceof FormData) {
        config.data.append('_t', timestamp.toString())
      } else {
        config.data = {
          ...(config.params || {}),
          _t: timestamp.toString(),
        }
      }
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

export default service
```



全局Loading方式

>Loading 方式并不是严格意义上的防重复提交，更多的是 “用体验来降低重复提交的概率”。







```typescript
import { ElLoading } from 'element-plus'
import axios, { type AxiosResponse } from 'axios'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'

let loadingInstance: any
let loadingCount: number = 0

function showLoading() {
  loadingInstance = ElLoading.service({
    fullscreen: true,
    text: '加载中...',
  })
  loadingCount++
}

function hideLoading() {
  loadingCount--
  if (loadingCount === 0 && loadingInstance) {
    loadingInstance.close()
    loadingCount = 0
  }
}

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    showLoading()
    return config
  },
  (error: AxiosError) => {
    hideLoading()
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    hideLoading()
    return response.data
  },
  (error: AxiosError) => {
    hideLoading()
    return Promise.reject(error)
  },
)

export default service
```





