export interface IParam {
  key?: string
  [key: string]: any
}

export interface IErrorResponse {
  response: {
    status?: number
    _data?: {
      message: string
    }
  }
}

export interface IApiResponse<T = any> {
  code: number
  status: string
  data: T[] & { message?: string }
}
