import React, { useState } from 'react';
import { Navbar } from "../../components/dashboard/Navbar";

// Sample transaction data
const sampleTransactions = [
  {
    id: '1',
    amount: 5000.0,
    description: 'Freelance Payment from Acme Co.',
    reference: 'TXN-843HJD88',
    date: '2025-07-17T10:00:00',
    type: 'credit',
  },
  {
    id: '2',
    amount: -1250.0,
    description: 'Netflix Subscription',
    reference: 'TXN-9A4B3C',
    date: '2025-07-18T14:30:00',
    type: 'debit',
  },
  {
    id: '3',
    amount: 2750.5,
    description: 'Transfer from Savings Account',
    reference: 'TXN-KL7M9N',
    date: '2025-07-19T09:15:00',
    type: 'credit',
  },
  {
    id: '4',
    amount: -89.99,
    description: 'Grocery Store Purchase',
    reference: 'TXN-PQ2R5S',
    date: '2025-07-19T16:45:00',
    type: 'debit',
  },
  {
    id: '5',
    amount: -45.0,
    description: 'Coffee Shop',
    reference: 'TXN-TU8V1W',
    date: '2025-07-19T08:20:00',
    type: 'debit',
  },
  {
    id: '6',
    amount: 320.0,
    description: 'Refund from Vendor',
    reference: 'TXN-REF123',
    date: '2025-07-20T12:00:00',
    type: 'credit',
  },
  {
    id: '7',
    amount: -120.75,
    description: 'Online Course Payment',
    reference: 'TXN-COURSE456',
    date: '2025-07-20T15:30:00',
    type: 'debit',
  },
  {
    id: '8',
    amount: 1500.0,
    description: 'Salary Credit',
    reference: 'TXN-SAL789',
    date: '2025-07-21T09:00:00',
    type: 'credit',
  },
  {
    id: '9',
    amount: -200.0,
    description: 'Utility Bill',
    reference: 'TXN-BILL321',
    date: '2025-07-21T17:15:00',
    type: 'debit',
  },
  {
    id: '10',
    amount: -75.5,
    description: 'Gym Membership',
    reference: 'TXN-GYM654',
    date: '2025-07-22T07:45:00',
    type: 'debit',
  },
];

const TransactionHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  const formatAmount = (amount) => {
    const sign = amount >= 0 ? '+' : '';
    return `${sign}$${Math.abs(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const getAmountColor = (type) => {
    return type === 'credit' ? 'text-green-600' : 'text-red-600';
  };

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = sampleTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const totalPages = Math.ceil(sampleTransactions.length / transactionsPerPage);

  if (sampleTransactions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No transactions found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gray-50">
        <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Transaction History</h1>
          <p className="text-gray-500">View your recent banking transactions</p>
        </div>

        {/* Transaction Cards */}
        <div className="space-y-3">
          {currentTransactions.map((transaction) => (
            <article
              key={transaction.id}
              className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Amount */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Amount
                  </label>
                  <p className={`text-lg font-bold ${getAmountColor(transaction.type)}`}>
                    {formatAmount(transaction.amount)}
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Description
                  </label>
                  <p className="text-base font-semibold text-gray-800">
                    {transaction.description}
                  </p>
                </div>

                {/* Reference */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Reference
                  </label>
                  <p className="text-base font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded text-sm">
                    {transaction.reference}
                  </p>
                </div>

                {/* Transaction Date */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Transaction Date
                  </label>
                  <p className="text-base text-gray-800">{formatDate(transaction.date)}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700 text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Summary Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Showing {currentTransactions.length} of {sampleTransactions.length} transactions
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
