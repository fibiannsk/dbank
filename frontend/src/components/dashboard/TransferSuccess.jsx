const TransferSuccess = ({
  selectedAccount,
  selectedRecipient,
  amount,
  onNewTransfer
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const generateTransactionId = () => {
    return `TXN${Date.now().toString().slice(-8)}`;
  };

  return (
    <div className="p-8 text-center shadow-xl border-0 bg-white/90 backdrop-blur-sm rounded-lg">
      <div className="mb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">
          Transfer Successful!
        </h2>
        <p className="text-slate-600">
          Your money has been sent successfully
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <p className="text-2xl font-bold text-green-700 mb-2">
            {formatCurrency(amount)}
          </p>
          <p className="text-green-600">
            Sent to {selectedRecipient?.name}
          </p>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600">Transaction ID:</span>
            <span className="font-mono font-medium">{generateTransactionId()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">From:</span>
            <span className="font-medium">{selectedAccount?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">To:</span>
            <span className="font-medium">{selectedRecipient?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Date:</span>
            <span className="font-medium">{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={onNewTransfer}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
        >
          Make Another Transfer
        </button>
        <button
          onClick={() => window.print()}
          className="w-full py-3 border border-slate-300 rounded-md hover:bg-slate-100"
        >
          Download Receipt
        </button>
      </div>
    </div>
  );
};

export default TransferSuccess;
