import { AxiosError } from 'axios'

export const ErrorAsString = (err: any) => {
   const error: string = (err as AxiosError).response?.data
      ? err.response.data.error
      : 'unknown error'
   return error
}
