
import { useState } from 'react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { DollarSign } from 'lucide-react';

const AmountInput = ({
  selectedAccount,
  amount,
  memo,
  transferDate,
  onAmountChange,
  onMemoChange,
  onDateChange
}) => {
  const [displayAmount, setDisplayAmount] = useState(amount > 0 ? amount.toString() : '');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleAmountChange = (value) => {
    const cleanValue = value.replace(/[^0-9.]/g, '');
    const parts = cleanValue.split('.');
    if (parts.length > 2) return;
    if (parts[1] && parts[1].length > 2) return;

    setDisplayAmount(cleanValue);
    const numericValue = parseFloat(cleanValue) || 0;
    onAmountChange(numericValue);
  };

  const quickAmounts = [50, 100, 250, 500, 1000];
  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <div className="text-center mb-6">
        <DollarSign className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">
          Transfer Amount
        </h2>
        <p className="text-slate-600">Enter the amount you want to transfer</p>
      </div>

      {selectedAccount && (
        <Card className="p-4 mb-6 bg-slate-50 border-slate-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-slate-800">{selectedAccount.name}</p>
              <p className="text-sm text-slate-600">{selectedAccount.accountNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-slate-800">
                {formatCurrency(selectedAccount.balance)}
              </p>
              <p className="text-sm text-slate-600">Available</p>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-6">
        <div>
          <Label htmlFor="amount" className="text-lg font-semibold">Amount</Label>
          <div className="relative mt-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-slate-500 text-xl">$</span>
            </div>
            <Input
              id="amount"
              type="text"
              placeholder="0.00"
              value={displayAmount}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="pl-8 text-2xl h-16 text-center border-2 focus:border-blue-500"
            />
          </div>
          {selectedAccount && amount > selectedAccount.balance && (
            <p className="text-red-600 text-sm mt-2">
              Insufficient balance. Available: {formatCurrency(selectedAccount.balance)}
            </p>
          )}
        </div>

        <div>
          <Label className="text-sm font-medium text-slate-600 mb-3 block">Quick amounts</Label>
          <div className="grid grid-cols-5 gap-2">
            {quickAmounts.map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => handleAmountChange(quickAmount.toString())}
                className="p-2 text-sm border border-slate-300 rounded hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                ${quickAmount}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="transferDate">Transfer Date</Label>
          <Input
            id="transferDate"
            type="date"
            value={transferDate}
            min={today}
            onChange={(e) => onDateChange(e.target.value)}
            className="mt-1"
          />
          {!transferDate && (
            <p className="text-sm text-slate-600 mt-1">
              Leave empty to transfer immediately
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="memo">Memo (Optional)</Label>
          <Textarea
            id="memo"
            placeholder="What's this transfer for?"
            value={memo}
            onChange={(e) => onMemoChange(e.target.value)}
            className="mt-1"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};

export default AmountInput;
