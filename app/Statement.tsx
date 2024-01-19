import { Table, Text } from "@radix-ui/themes"
import Link from "next/link"
import usePayment, { Payment } from './hooks/usePayment'
import { formatedDate } from "./helpers/formatedDate";
import { useEffect, useState } from "react";
import classNames from "classnames";

const Statement = ({ userId }: { userId: string }) => {
  const { payments, isLoading } = usePayment(userId)
  if (isLoading) return <div>Loading...</div>

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [filteredData, setFilteredData] = useState<Payment[]>([]);

  useEffect(() => {
    const filteredArray = payments.filter(item => {
      const itemMonth = new Date(item.date).getMonth() + 1;
      return itemMonth === selectedMonth;
    });

    setFilteredData(filteredArray);
  }, [payments, selectedMonth]);

  const handleMonthClick = (month: number) => {
    setSelectedMonth(month);
  };

  const months = Array.from({ length: 12 }, (_, index) => {
    const reversedIndex = 11 - index;
    const year = currentMonth - reversedIndex > 0 ? currentYear : currentYear - 1;
    const monthName = new Date(year, currentMonth - reversedIndex - 1, 1).toLocaleString('default', { month: 'long' });
    return { monthNumber: currentMonth - reversedIndex, monthName, year };
  });

  return (
    <section className="flex flex-col gap-4">
      <div className="py-2">
        <Text className="font-bold text-[1.5rem]">Statement</Text>
      </div>
      <hr />
      <div className="flex gap-4 justify-end">
        {months.map((month) => (
          <button
            key={month.monthNumber}
            onClick={() => handleMonthClick(month.monthNumber)}
            style={{ color: "white" }}
            className={classNames(
              {
                'bg-[var(--primary-blue)]': month.monthNumber === selectedMonth,
                'bg-[var(--primary-gray)]': month.monthNumber !== selectedMonth
              }
            )}
          >
            {`${month.monthName} ${month.year}`}
          </button>
        ))}
      </div>
      <hr />
      <div className="flex justify-between">
        <Text className="font-bold">
          {months.find(month => month.monthNumber === selectedMonth)?.monthName} {currentYear}
        </Text>
        <Link href={'/downloadStatement'}>
          Download PDFs
        </Link>
      </div>
      <hr />

      <div style={{ maxHeight: '160px', overflowY: 'auto' }}>
        {
          filteredData.length > 0 ?
            <Table.Root variant="surface">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Account number</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>IN (￡)</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>OUT (￡)</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {filteredData.map(payment => (
                  <Table.Row key={payment._id}>
                    <Table.Cell>
                      <p>{payment.target}</p>
                      <span className="blue-text">{formatedDate(payment.date)}</span>
                    </Table.Cell>
                    <Table.Cell>{payment.party._id}</Table.Cell>
                    <Table.Cell>{payment.entry === 'IN' && payment.amount}</Table.Cell>
                    <Table.Cell>{payment.entry === 'OUT' && payment.amount}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
            :
            <Text className="font-bold text-2xl text-center">No Transactions Was Done In This Date</Text>
        }
      </div>
    </section >
  )
};

export default Statement
