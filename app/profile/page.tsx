'use client'
import { Flex, Text } from '@radix-ui/themes'
import useUser from '../hooks/useUser'
import useUserStore from '../store'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import OnMount from '../OnMount'
import { useEffect } from 'react'

const page = () => {
  const router = useRouter()
  const { token } = useUserStore()
  const { user } = useUser(token)

  useEffect(() => {
    if (!token) router.push('/login')
  }, [])

  return (
    <OnMount>
      <div className='h-[80vh]'>
        <Flex justify='center' className='mt-[4vh]'>
          <Flex className='w-3/4 bg-[var(--secondary-black)]'>
            <Flex direction='column' gap='4' className='w-1/2 p-4'>
              <Flex justify='between'>
                <Text className='text-gray-400' weight='bold'>Title:</Text>
                <Text className='text-gray-200' weight='bold'>{user.title}</Text>
              </Flex>
              <Flex justify='between'>
                <Text className='text-gray-400' weight='bold'>Full Name:</Text>
                <Text className='text-gray-200' weight='bold'>{user.name}</Text>
              </Flex>
              <Flex justify='between'>
                <Text className='text-gray-400' weight='bold'>Date of birth:</Text>
                <Text className='text-gray-200' weight='bold'>{user.dob}</Text>
              </Flex>
              <Flex justify='between'>
                <Text className='text-gray-400' weight='bold'>Gender:</Text>
                <Text className='text-gray-200' weight='bold'>{user.gender}</Text>
              </Flex>
              <Flex justify='between'>
                <Text className='text-gray-400' weight='bold'>Country of Birth:</Text>
                <Text className='text-gray-200' weight='bold'>{user.cob}</Text>
              </Flex>
            </Flex>

            <Flex direction='column' gap='4' className='w-1/2 p-4'>
              <Flex justify='between'>
                <Text className='text-gray-400' weight='bold'>Email Address:</Text>
                <Text className='text-gray-200' weight='bold'>{user.email}</Text>
              </Flex>
              <Flex justify='between'>
                <Text className='text-gray-400' weight='bold'>Phone Number:</Text>
                <Text className='text-gray-200' weight='bold'>{user.phone}</Text>
              </Flex>
              <Flex justify='between'>
                <Text className='text-gray-400' weight='bold'>Address:</Text>
                <Text className='text-gray-200' weight='bold'>{user.address}</Text>
              </Flex>
              <Flex justify='between'>
                <Text className='text-gray-400' weight='bold'>Account Type::</Text>
                <Text className='text-gray-200' weight='bold'>{user.accountType}</Text>
              </Flex>
              <Flex justify='center' gap='8'>
                <Link href='/logout' className="w-fit p-2 bg-[var(--primary-blue)] rounded-md px-8">
                  <Text>Log Off</Text>
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </div>
    </OnMount>
  )
}

export default page
