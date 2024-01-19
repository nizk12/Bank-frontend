'use client'
import { useEffect } from 'react'
import useUserStore from '../store'
import { Text } from '@radix-ui/themes'
import PageContainer from '../PageContainer'
import { redirect } from 'next/navigation'

const page = () => {
  const { setToken } = useUserStore()

  useEffect(() => {
    setToken('')
    redirect('/login')
  }, [])

  return (
    <>
      <PageContainer>
        <Text>Redirecting to login page...</Text>
      </PageContainer>
    </>
  )
}

export default page;
