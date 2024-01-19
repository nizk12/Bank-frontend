import { PropsWithChildren } from 'react'

const PageContainer = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex h-[92vh] flex-col items-center justify-center">
      <section className='w-[94vw]'>
        {children}
      </section>
    </main>
  )
}

export default PageContainer
