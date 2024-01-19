'use client'
import SectionContainer from './SectionContainer'
import { Text } from '@radix-ui/themes'
import { formatedDate } from './helpers/formatedDate'
import Link from 'next/link'
import useUserStore from './store'
import useUser from './hooks/useUser'
import OnMount from './OnMount'

const UserBar = () => {
  const { token } = useUserStore()
  const { user } = useUser(token)

  return (
    <OnMount>
      <div className="bg-[var(--primary-gray)] flex justify-center">
        <SectionContainer>
          {
            token &&
            <div className="h-[8vh] flex items-center justify-between">
              <div className="w-fit">
                <Text as="p" weight='bold'>{user.name}</Text>
                <Text>{formatedDate()}</Text>
              </div>

              <div className="w-fit flex items-center gap-4">
                <p>Your Balance: <span className="font-bold">￡{user.balance}</span></p>
                <p className="font-bold">{user.name}</p>
                <Link
                  href='/profile'
                  className="flex items-center justify-center bg-[var(--primary-blue)] w-12 h-12 rounded-full text-white font-bold"
                >
                  {user?.name?.slice(0, 2).toUpperCase()}
                </Link>
              </div>
            </div>
          }
        </SectionContainer>
      </div>
    </OnMount>
  )
}

export default UserBar
