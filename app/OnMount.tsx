import { PropsWithChildren, useEffect, useState } from 'react'

const OnMount = ({ children }: PropsWithChildren) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

  }, [])

  if (!isMounted) return null;
  if (isMounted)
    return (
      <>
        {children}
      </>
    )
}

export default OnMount
