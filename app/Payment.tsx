'use client'
import { Button, Dialog, Flex, Text } from "@radix-ui/themes"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldValues, useForm } from 'react-hook-form'
import { apiClient } from "./services/api-client"
import toast, { Toaster } from "react-hot-toast"
import { SetStateAction, Dispatch } from "react"
import { User } from "./services/user-service"

type Props = {
  userId: string,
  setUser: Dispatch<SetStateAction<User>>
}

const Payment = ({ userId, setUser }: Props) => {
  const paymentData = z.object({
    account: z.string().min(24, { message: "Account number should be 24 characters long." }).max(24, { message: "Account number should be 24 characters long." }),


    amount: z.number({ invalid_type_error: "Amount is required" }).min(20, { message: "Minimum transaction amount is ￡ 20" }).max(2000, { message: "Maximum transaction limit is ￡2000" })
  })

  type FormData = z.infer<typeof paymentData>

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(paymentData) })

  const onSubmit = async (data: FieldValues) => {
    apiClient.post('/payments', {
      sender: userId,
      receiver: data.account,
      amount: data.amount
    }).then(data => {
      setUser(data.data[0])
      toast.success('Payment Sucessful')
    }).catch((err) => toast.error(err.response?.data))
  }

  return (
    <section className="flex flex-col gap-4">
      <Toaster />
      <div className="py-2">
        <Text className="font-bold text-[1.5rem]">Payments and Transfers</Text>
      </div>
      <hr />
      <div className="flex flex-col gap-2 bg-[var(--secondary-black)] p-2 rounded-md">

        <Text>To</Text>
        <Dialog.Root>
          <Dialog.Trigger>
            <button className="w-fit px-6 py-2 rounded-md text-white font-bold bg-[var(--primary-blue)]" >
              Pay someone {'>'}
            </button>
          </Dialog.Trigger>

          <Dialog.Content style={{ maxWidth: 450 }}>
            <Dialog.Title>Payee details</Dialog.Title>
            <form
              className="flex flex-col gap-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label>Payee Name</label>
                <input
                  className="text-black w-full p-1 border-black border-[1px] rounded-md"
                  placeholder="e.g. Jane smith or Acne Ltd."
                />
              </div>

              <div>
                <label>Account Number</label>
                <input
                  {...register('account')}
                  className="text-black w-full p-1 border-black border-[1px] rounded-md"
                  placeholder="Enter Account number"
                />
                <span className="text-red-600 font-[0.8rem]">{errors.account && errors.account.message}</span>
              </div>

              <div>
                <label>Amount(￡)</label>
                <input
                  {...register('amount', { valueAsNumber: true })}
                  type="number"
                  defaultValue={0}
                  className="text-black w-full p-1 border-black border-[1px] rounded-md"
                  placeholder="￡0.0"
                />
                <span className="text-red-600 font-[0.8rem]">{errors.amount && errors.amount.message}</span>
              </div>

              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <button type="submit" className="w-fit px-6 py-2 rounded-md text-white font-bold bg-[var(--primary-gray)]" >
                    Cancel
                  </button>
                </Dialog.Close>
                <button type="submit" className="w-fit px-6 py-2 rounded-md text-white font-bold bg-[var(--primary-blue)]" >
                  Continue</button>
              </Flex>
            </form>

          </Dialog.Content>
        </Dialog.Root>
        <hr />
      </div>
    </section>
  )
}

export default Payment
