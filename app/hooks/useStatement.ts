import { useEffect, useState } from "react"
import { apiClient } from '../services/api-client'
import { CanceledError } from "axios"

type Payment = {
  _id: string,
  party: {
    _id: string,
    name: string,
    email: string,
    password: string,
    accountType: string,
    balance: number,
    gender: string,
    title: string,
    postCode: string,
    cob: string,
  },
  target: string,
  entry: string,
  amount: number,
  date: string,
}

const useStatement = (token: string) => {
  const [payments, setPayments] = useState<Payment[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const controller = new AbortController()
    setIsLoading(false)
    apiClient.get<Payment[]>('/payments/all', {
      signal: controller.signal,
      headers: {
        'x-auth-token': token
      }
    }).then(data => {
      setPayments(data.data)
      setIsLoading(false)
    }).catch(err => {
      if (err instanceof CanceledError) return
      setError(err.message)
      setIsLoading(false)
    })

    return () => controller.abort()
  }, [token])

  return { payments, error, isLoading }
}

export default useStatement
