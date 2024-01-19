'use client'

import Link from "next/link"
import { Text } from "@radix-ui/themes"
import SectionContainer from "./SectionContainer"
import Payment from "./Payment"
import Statement from "./Statement"
import Transaction from "./Transaction"
import { useRouter, useSearchParams } from 'next/navigation'
import useUser from './hooks/useUser'
import useUserStore from "./store"
import classNames from 'classnames'
import OnMount from "./OnMount"

const Dashboard = () => {
  const { token } = useUserStore()

  const router = useRouter()
  if (!token) router.push('/login')

  const searchParams = useSearchParams()
  const action = searchParams.get('action')
  const { user, setUser, isLoading } = useUser(token)

  if (isLoading) return <div>Loading...</div>

  return (
    <OnMount>
      <div className="w-full flex justify-center">
        <SectionContainer>
          <div className="h-[80vh] flex justify-between gap-16 mt-[4vh]">
            <aside className="flex flex-col gap-2 w-2/12">
              <Link href='/' className="w-full p-2 hover:bg-[var(--primary-gray)]">
                <Text>Home</Text>
              </Link>
              <Link href='/logout' className="w-full p-2 hover:bg-[var(--primary-gray)]">
                <Text>Log Off</Text>
              </Link>
            </aside>

            <section className="">
              <div
                className="flex gap-8 bg-[var(--secondary-black)] border-t-[4px] border-[var(--primary-blue)] rounded-md"
              >
                <article className="w-3/5 flex flex-col gap-4 p-1">
                  <div className="flex justify-between">
                    <p>ACCOUNT <span className="blue-text">{user?.accountType?.toUpperCase()}</span></p>
                    <p>NUMBER <span className="blue-text">{user._id}</span></p>
                  </div>
                  <Text className="text-[2rem] font-bold">￡{user.balance}</Text>
                  <hr />
                  <Text>
                    Switch to us using the Current Account Switch Service, which transfers everything from your previous account in just 7 working days.
                  </Text>
                </article>

                <article className="p-1 flex flex-col h-fit bg-[var(--primary-gray)] grow">
                  <Link
                    href='/?action=statement'
                    className={classNames(
                      'py-2 px-3 hover:bg-[var(--primary-blue)]',
                      {
                        'bg-[var(--primary-blue)]': action === 'statement'
                      }
                    )}
                  >
                    View Statement
                  </Link>
                  <Link
                    href='/?action=payment'
                    className={classNames(
                      'py-2 px-3 hover:bg-[var(--primary-blue)]',
                      {
                        'bg-[var(--primary-blue)]': action === 'payment'
                      }
                    )}
                  >
                    Make a payment
                  </Link>
                </article>
              </div>

              {
                action === 'statement' ? <Statement userId={user._id} />
                  : action === 'payment' ? <Payment userId={user._id} setUser={setUser} />
                    : <Transaction userId={user._id} />
              }

            </section>
          </div>
        </SectionContainer>
      </div >
    </OnMount>)
}

export default Dashboard
