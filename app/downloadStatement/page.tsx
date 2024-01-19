'use client'
import useUserStore from "../store";
import { formatedDate } from "../helpers/formatedDate";
import useStatement from "../hooks/useStatement";
//@ts-ignore
import htmlToPdfmake from 'html-to-pdfmake';
//@ts-ignore
import pdfMake from 'pdfmake/build/pdfmake';
//@ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Payment from "../Payment";
import Image from 'next/image'
import logo from '../logo.png'
import SectionContainer from "../SectionContainer";

// Register fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const handleDownload = () => {
  const content = document.getElementById('page-content');

  const pdfContent = htmlToPdfmake(content!.innerHTML);
  const pdfDoc = {
    content: pdfContent,
  };

  pdfMake.createPdf(pdfDoc).download('download.pdf');
};

const page = () => {
  const { token } = useUserStore()
  const { payments } = useStatement(token)

  return (
    <main className="h-[92vh] bg-[var(--primary-black)] p-4">
      <div className="flex flex-col gap-6">
        <button onClick={handleDownload} className="w-fit bg-[var(--primary-blue)] text-white px-6 py-2 rounded-md">Download PDF</button>

        <div className="flex flex-col items-center" id="page-content">
          <span className="text-3xl font-extrabold">ABC BANK</span>
          <SectionContainer>
            <h1 className="uppercase text-white text-center text-xl">
              This is the Bank Statement of Account Number:
              <span className="ml-2 text-[var(--primary-blue)]">{payments[0]?.party._id}</span>, and Account Holder
              <span className="ml-2 font-bold">{payments[0]?.party.title + payments[0]?.party.name}</span>
            </h1>

            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                          <th scope="col" className="px-6 py-4">#</th>
                          <th scope="col" className="px-6 py-4">Description</th>
                          <th scope="col" className="px-6 py-4">Account number</th>
                          <th scope="col" className="px-6 py-4">IN (￡)</th>
                          <th scope="col" className="px-6 py-4">OUT (￡)</th>
                        </tr>
                      </thead>
                      <tbody>

                        {payments.map((payment, index) => (
                          <tr key={payment._id} className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              <p>{payment.target}</p>
                              <span className="blue-text">{formatedDate(payment.date)}</span>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">{payment.party._id}</td>
                            <td className="whitespace-nowrap px-6 py-4">{payment.entry === 'IN' && payment.amount}</td>
                            <td className="whitespace-nowrap px-6 py-4">{payment.entry === 'OUT' && payment.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </SectionContainer>
        </div>

      </div>
    </main>
  )
}


export default page
