import { Button, Flex, Table, Text } from '@radix-ui/themes'
import usePayment from './hooks/usePayment'
import { formatedDate } from './helpers/formatedDate'
import { useState } from 'react'
import classNames from 'classnames'

const Transaction = ({ userId }: { userId: string }) => {
  const { payments, isLoading } = usePayment(userId)
  if (isLoading) return <div>Loading...</div>

  const [activeBtn, setActiveBtn] = useState<Number>(1)

  return (
    <section className="flex flex-col gap-4">
      <div className="py-2">
        <Text className="font-bold text-[1.5rem]">Recent Transaction(s)</Text>
      </div>

      <Flex gap='4' justify='end'>
        <Button
          onClick={() => setActiveBtn(1)}
          color={activeBtn === 1 ? 'blue' : 'gray'}
        >All</Button>

        <Button
          onClick={() => setActiveBtn(2)}
          color={activeBtn === 2 ? 'blue' : 'gray'}
        >Deposit</Button>

        <Button
          onClick={() => setActiveBtn(3)}
          color={activeBtn === 3 ? 'blue' : 'gray'}
        >Withdrawn</Button>
      </Flex>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Transaction Number</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            activeBtn === 1 ? (
              payments.map(payment => (
                <Table.Row key={payment._id}>
                  <Table.Cell>{payment.target}</Table.Cell>
                  <Table.Cell>{formatedDate(payment.date)}</Table.Cell>
                  <Table.Cell>{payment._id}</Table.Cell>
                  <Table.Cell
                    className={classNames(
                      {
                        'text-green-400': payment.entry === 'IN',
                        'text-red-600': payment.entry === 'OUT'
                      }
                    )}
                  >
                    {payment.entry === 'IN' ? '+' : '-'} £{payment.amount}
                  </Table.Cell>
                </Table.Row>
              ))
            ) : activeBtn === 2 ?
              (
                payments.filter(p => p.entry === 'IN').map(payment => (
                  <Table.Row key={payment._id}>
                    <Table.Cell>{payment.target}</Table.Cell>
                    <Table.Cell>{formatedDate(payment.date)}</Table.Cell>
                    <Table.Cell>{payment._id}</Table.Cell>
                    <Table.Cell
                      className={classNames(
                        {
                          'text-green-400': payment.entry === 'IN',
                          'text-red-600': payment.entry === 'OUT'
                        }
                      )}
                    >
                      {payment.entry === 'IN' ? '+' : '-'} £{payment.amount}
                    </Table.Cell>
                  </Table.Row>
                ))
              ) :
              (
                payments.filter(p => p.entry === 'OUT').map(payment => (
                  <Table.Row key={payment._id}>
                    <Table.Cell>{payment.target}</Table.Cell>
                    <Table.Cell>{formatedDate(payment.date)}</Table.Cell>
                    <Table.Cell>{payment._id}</Table.Cell>
                    <Table.Cell
                      className={classNames(
                        {
                          'text-green-400': payment.entry === 'IN',
                          'text-red-600': payment.entry === 'OUT'
                        }
                      )}
                    >
                      {payment.entry === 'IN' ? '+' : '-'} £{payment.amount}
                    </Table.Cell>
                  </Table.Row>
                ))
              )
          }
        </Table.Body>
      </Table.Root>
    </section>
  )
}

export default Transaction
