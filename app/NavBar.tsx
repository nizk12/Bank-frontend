'use client'
import { Text } from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'
import logo from './logo.png'
import useUserStore from './store'
import OnMount from './OnMount'

const NavBar = () => {
  const { token } = useUserStore()

  return (
    <OnMount>
      <nav className='h-[8vh] flex justify-between py-4 px-10 bg-[var(--secondary-black)]'>
        <Link href={'/'}>
          <Image
            src={logo}
            alt='logo'
            width={140}
            height={80}
          />
        </Link>

        {
          !token &&
          <span>
            <Link href={'/login'}>
              <Text className='font-bold'>LOG ON</Text>
            </Link>
            <Link href={'/register'} className='ml-6'>
              <Text className='font-bold'>REGISTER</Text>
            </Link>
          </span>
        }
      </nav >
    </OnMount>
  )
}

export default NavBar;
