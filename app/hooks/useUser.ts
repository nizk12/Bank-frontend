import { useEffect, useState } from "react"
import { CanceledError } from "axios"
import userService, { User } from "../services/user-service"

const useUser = (token: string) => {
  const [user, setUser] = useState<User>({} as User)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    setIsLoading(false)
    const { request, cancel } = userService.get<User>(token)

    request.then(data => {
      setUser(data.data)
      setIsLoading(false)
    }).catch(err => {
      if (err instanceof CanceledError) return
      setError(err.message)
      setIsLoading(false)
    })

    return () => cancel()
  }, [token])

  return { user, setUser, error, isLoading }
}

export default useUser
