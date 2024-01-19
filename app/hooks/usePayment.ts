import { useEffect, useState } from "react"
import { apiClient } from '../services/api-client'
import { CanceledError } from "axios"

export type Payment = {
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

const usePayment = (userId: string) => {
  const [payments, setPayments] = useState<Payment[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const controller = new AbortController()
    setIsLoading(false)
    apiClient.get<Payment[]>('/payments/' + userId, {
      signal: controller.signal
    }).then(data => {
      setPayments(data.data)
      setIsLoading(false)
    }).catch(err => {
      if (err instanceof CanceledError) return
      setError(err.message)
      setIsLoading(false)
    })

    return () => controller.abort()
  }, [userId])

  return { payments, setPayments, error, isLoading }
}

export default usePayment
