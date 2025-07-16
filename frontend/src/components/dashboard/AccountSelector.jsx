import { Card } from '../ui/card';
import { Wallet } from 'lucide-react';

const AccountSelector = ({ accounts, selectedAccount, onSelectAccount }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div>
      <div className="text-center mb-6">
        <Wallet className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">
          Select Account
        </h2>
        <p className="text-slate-600">
          Choose the account you want to transfer from
        </p>
      </div>

      <div className="space-y-4">
        {accounts.map((account) => (
          <Card
            key={account.id}
            className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedAccount?.id === account.id
                ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-200'
                : 'hover:bg-slate-50 border-slate-200'
            }`}
            onClick={() => onSelectAccount(account)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-slate-800">{account.name}</h3>
                <p className="text-slate-600 text-sm">
                  {account.type} • {account.accountNumber}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-800">
                  {formatCurrency(account.balance)}
                </p>
                <p className="text-sm text-slate-600">Available Balance</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AccountSelector;
