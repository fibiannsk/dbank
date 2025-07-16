import { ArrowDown } from 'lucide-react';

const TransferConfirmation = ({
  selectedAccount,
  selectedRecipient,
  amount,
  memo,
  transferDate,
  onConfirm
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Today';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">
          Confirm Transfer
        </h2>
        <p className="text-slate-600">
          Please review your transfer details
        </p>
      </div>

      <div className="space-y-6">
        {/* Transfer Flow Visual */}
        <div className="flex items-center justify-center space-x-4">
          <div className="p-4 flex-1 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-slate-600 mb-1">From</p>
              <p className="font-semibold text-slate-800">{selectedAccount?.name}</p>
              <p className="text-xs text-slate-500">{selectedAccount?.accountNumber}</p>
            </div>
          </div>

          <ArrowDown className="w-6 h-6 text-blue-600 transform rotate-90" />

          <div className="p-4 flex-1 bg-green-50 border border-green-200 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-slate-600 mb-1">To</p>
              <p className="font-semibold text-slate-800">{selectedRecipient?.name}</p>
              <p className="text-xs text-slate-500">{selectedRecipient?.accountNumber}</p>
            </div>
          </div>
        </div>

        {/* Amount Display */}
        <div className="p-6 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg">
          <p className="text-sm opacity-90 mb-2">Transfer Amount</p>
          <p className="text-4xl font-bold">{formatCurrency(amount)}</p>
        </div>

        {/* Transfer Details */}
        <div className="p-6 space-y-4 border border-slate-200 rounded-lg">
          <h3 className="font-semibold text-slate-800 mb-4">Transfer Details</h3>

          <div className="flex justify-between">
            <span className="text-slate-600">Transfer Date:</span>
            <span className="font-medium">{formatDate(transferDate)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-600">Recipient Bank:</span>
            <span className="font-medium">{selectedRecipient?.bankName}</span>
          </div>

          {memo && (
            <div>
              <span className="text-slate-600 block mb-2">Memo:</span>
              <span className="font-medium bg-slate-50 p-2 rounded block">{memo}</span>
            </div>
          )}

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Transfer:</span>
              <span className="text-blue-600">{formatCurrency(amount)}</span>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-800">
            <strong>Security Notice:</strong> Please verify all details are correct. 
            This transfer cannot be reversed once confirmed.
          </p>
        </div>

        {/* Confirm Button */}
        <button
          onClick={onConfirm}
          disabled={!selectedAccount || !selectedRecipient || amount <= 0}
          className={`w-full py-4 text-lg font-semibold text-white rounded-md bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Confirm Transfer
        </button>
      </div>
    </div>
  );
};

export default TransferConfirmation;
