'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex } from '@radix-ui/themes'
import { CSSProperties } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { z } from 'zod'
import PageContainer from '../PageContainer'
import Image from 'next/image'
import HumanSitting from '../HumanSitting.png'
import OnMount from '../OnMount'
import toast, { Toaster, } from 'react-hot-toast'
import { apiClient } from '../services/api-client'
import { useRouter } from 'next/navigation'
import useUserStore from '../store'

const registerData = z.object({
  name: z.string().min(3, { message: "Username is required" }).max(120),
  email: z.string().email(),
  password: z.string().min(3, { message: "Password is required" }),
  accountType: z.string().min(3, { message: "Please select an account type" }),
  gender: z.string().min(3, { message: "Please select a gender" }),
  title: z.string().min(2, { message: "Title is required" }),
  postCode: z.string().min(3, { message: "Post code is required" }),
  cob: z.string().min(2, { message: "Country of birth is required" }),
  dob: z.string().min(3, { message: "Date of birth is required" }),
  phone: z.string().min(3, { message: "Phone number is required" }),
  address: z.string().min(2, { message: "Address is required" })
})

type FormData = z.infer<typeof registerData>

const page = () => {
  const router = useRouter()

  const { token } = useUserStore()
  if (token) router.push('/')

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(registerData) })

  const onSubmit = (data: FieldValues) => {
    apiClient.post('/users', {
      name: data.name,
      email: data.email,
      password: data.password,
      accountType: data.accountType,
      gender: data.gender,
      title: data.title,
      postCode: data.postCode,
      cob: data.cob,
      dob: data.dob,
      phone: data.phone,
      address: data.address
    }).then(data => {
      router.push('/login')
    }).catch((err) => toast.error(err.response?.data))
  }

  const formInputStyle: CSSProperties = {
    width: '100%',
    color: 'white',
    padding: '4px 10px',
    borderRadius: '0.5rem',
    background: '#222222',
    margin: '0.5rem 0'
  }

  return (
    <OnMount>
      <PageContainer>
        <Toaster />
        <div className='flex gap-4'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-4/5 bg-[var(--secondary-black)] flex flex-col p-4'
          >
            <Flex className='w-full justify-between gap-8'>
              <Flex direction='column' className='w-2/4'>
                <div>
                  <label className='block'>Name</label>
                  <input {...register('name')} placeholder='Enter your name' style={formInputStyle} />
                  <span className='text-red-600 text-[0.8rem]'>{errors.name && errors.name.message}</span>
                </div>

                <div>
                  <label className='block'>Email</label>
                  <input {...register('email')} type='email' placeholder='Enter your email' style={formInputStyle} />
                  <span className='text-red-600 text-[0.8rem]'>{errors.email && errors.email.message}</span>
                </div>

                <div>
                  <label className='block'>Password</label>
                  <input {...register('password')} type='password' placeholder='Enter your password' style={formInputStyle} />
                  <span className='text-red-600 text-[0.8rem]'>{errors.password && errors.password.message}</span>
                </div>

                <div>
                  <label className='block'>Account Type</label>
                  <select
                    {...register("accountType")}
                    aria-placeholder="Account Type"
                    style={formInputStyle}
                  >
                    <option value="">Select an account type</option>
                    <option value="BUSINESS">BUSINESS</option>
                    <option value="CLASSIC">CLASSIC</option>
                  </select>
                  <span className='text-red-600 text-[0.8rem]'>{errors.accountType && errors.accountType.message} </span>
                </div>

                <div>
                  <label className='block'>Gender</label>
                  <select
                    {...register("gender")}
                    aria-placeholder="Gender"
                    style={formInputStyle}
                  >
                    <option value="">Select your gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <span className='text-red-600 text-[0.8rem]'>{errors.gender && errors.gender.message}</span>
                </div>
              </Flex>

              <Flex direction='column' className='w-2/4'>
                <div>
                  <label className='block'>Title</label>
                  <input {...register('title')} placeholder='For example: Ms, Mr, Mx, Dr' style={formInputStyle} />
                  <span className='text-red-600 text-[0.8rem]'>{errors.title && errors.title.message}</span>
                </div>

                <div>
                  <label className='block'>Post Code</label>
                  <input {...register('postCode')} placeholder='Enter your post code' style={formInputStyle} />
                  <span className='text-red-600 text-[0.8rem]'>{errors.postCode && errors.postCode.message}</span>
                </div>

                <div>
                  <label className='block'>Country of birth</label>
                  <input {...register('cob')} placeholder='Enter your country of birth' style={formInputStyle} />
                  <span className='text-red-600 text-[0.8rem]'>{errors.cob && errors.cob.message}</span>
                </div>

                <div>
                  <label className='block'>Date of birth</label>
                  <input {...register('dob')} placeholder='day/month/year' style={formInputStyle} />
                  <span className='text-red-600 text-[0.8rem]'>{errors.dob && errors.dob.message}</span>
                </div>

                <div>
                  <label className='block'>Phone</label>
                  <input {...register('phone')} placeholder='Enter your phone number' style={formInputStyle} />
                  <span className='text-red-600 text-[0.8rem]'>{errors.phone && errors.phone.message}</span>
                </div>

                <div>
                  <label className='block'>Address</label>
                  <input {...register('address')} placeholder='Enter your address' style={formInputStyle} />
                  <span className='text-red-600 text-[0.8rem]'>{errors.address && errors.address.message}</span>
                </div>
              </Flex>
            </Flex>

            <Flex justify='center'>
              <button type="submit" className="w-fit mx-auto px-10 py-2 rounded-md text-white font-bold bg-[var(--primary-blue)]" >
                Register
              </button>
            </Flex>
          </form>

          <article className='w-1/5'>
            <Image
              src={HumanSitting}
              alt='Human sitting'
              width={80}
              height={80}
              className='h-80 w-auto object-contain'
            />
          </article>
        </div>
      </PageContainer>
    </OnMount>
  )
}

export default page
