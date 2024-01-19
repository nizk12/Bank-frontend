import { PropsWithChildren } from 'react'

const SectionContainer = ({ children }: PropsWithChildren) => {
  return (
    <section className='w-[94vw]'>
      {children}
    </section>
  )
}

export default SectionContainer
