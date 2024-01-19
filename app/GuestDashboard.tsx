import { Button } from '@radix-ui/themes'
import Image from 'next/image'
import DashBoardPic from './DashBoardPic.png'
import PageContainer from './PageContainer'
import Link from 'next/link'
import Approval from './Approval.png'

const GuestDashboard = () => {
  return (
    <PageContainer>
      <div className='flex'>
        <article className='flex flex-col gap-6 w-3/5'>
          <span className='flex items-center bg-[#2E2E2E] p-2 rounded-lg w-fit'>
            <Image
              src={Approval}
              width={30}
              height={30}
              alt='approval icon'
              className='inline mr-2'
            />
            No LLC Required, No Credit Check.
          </span>
          <p className='text-[2.25rem] font-[600] leading-10'>
            Bringing Banking Experience
            <span className='blue-text'>Closer</span>
            To Your <span className='blue-text'>Fingertips</span>
          </p>
          <p>
            At ABC-Bank, our mission is to provide comprehensive banking solution that empower individuals and business to achieve their financial goals. We are committed to delivering personalized and innovative services that priorities our customers’ needs.
          </p>
          <Link href='/register'>
            <Button className='max-w-48'>Open Account</Button>
          </Link>
        </article>

        <article className='w-2/5'>
          <Image
            src={DashBoardPic}
            alt='Human sitting'
            width={80}
            height={80}
            className='h-full w-auto object-contain relative left-20'
          />
        </article>
      </div>
    </PageContainer>
  )
}

export default GuestDashboard
