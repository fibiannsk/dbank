import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
//import { ArrowDown } from 'lucide-react';
import AccountSelector from '../../components/dashboard/AccountSelector';
import RecipientSelector from '../../components/dashboard/RecipientSelector';
import AmountInput from '../../components/dashboard/AmountInput';
import TransferConfirmation from '../../components/dashboard/TransferConfirmation';
import TransferSuccess from '../../components/dashboard/TransferSuccess';

const Transfer = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [amount, setAmount] = useState(0);
  const [memo, setMemo] = useState('');
  const [transferDate, setTransferDate] = useState('');

  const mockAccounts = [
    {
      id: '1',
      name: 'Primary Checking',
      type: 'Checking',
      balance: 15420.5,
      accountNumber: '****1234'
    },
    {
      id: '2',
      name: 'Savings Account',
      type: 'Savings',
      balance: 8750.25,
      accountNumber: '****5678'
    },
    {
      id: '3',
      name: 'Business Account',
      type: 'Business',
      balance: 32100.0,
      accountNumber: '****9012'
    }
  ];

  const mockRecipients = [
    {
      id: '1',
      name: 'John Smith',
      accountNumber: '****4321',
      bankName: 'Chase Bank',
      isFrequent: true
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      accountNumber: '****8765',
      bankName: 'Bank of America',
      isFrequent: true
    },
    {
      id: '3',
      name: 'Michael Brown',
      accountNumber: '****2109',
      bankName: 'Wells Fargo'
    }
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleTransferComplete = () => {
    setCurrentStep(5);
  };

  const resetForm = () => {
    setCurrentStep(1);
    setSelectedAccount(null);
    setSelectedRecipient(null);
    setAmount(0);
    setMemo('');
    setTransferDate('');
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedAccount !== null;
      case 2:
        return selectedRecipient !== null;
      case 3:
        return amount > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-2">
              Transfer Money
            </h1>
            <p className="text-slate-600">
              Send money quickly and securely to your contacts
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      currentStep >= step
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white text-slate-400 border-2 border-slate-200'
                    }`}
                  >
                    {step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`w-12 h-1 mx-2 rounded transition-all duration-300 ${
                        currentStep > step ? 'bg-blue-600' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            {currentStep === 1 && (
              <AccountSelector
                accounts={mockAccounts}
                selectedAccount={selectedAccount}
                onSelectAccount={setSelectedAccount}
              />
            )}

            {currentStep === 2 && (
              <RecipientSelector
                recipients={mockRecipients}
                selectedRecipient={selectedRecipient}
                onSelectRecipient={setSelectedRecipient}
              />
            )}

            {currentStep === 3 && (
              <AmountInput
                selectedAccount={selectedAccount}
                amount={amount}
                memo={memo}
                transferDate={transferDate}
                onAmountChange={setAmount}
                onMemoChange={setMemo}
                onDateChange={setTransferDate}
              />
            )}

            {currentStep === 4 && (
              <TransferConfirmation
                selectedAccount={selectedAccount}
                selectedRecipient={selectedRecipient}
                amount={amount}
                memo={memo}
                transferDate={transferDate}
                onConfirm={handleTransferComplete}
              />
            )}

            {/* Navigation Buttons */}
            {currentStep < 4 && (
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="px-8"
                >
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="px-8 bg-blue-600 hover:bg-blue-700"
                >
                  Continue
                </Button>
              </div>
            )}
          </Card>

          {currentStep === 5 && (
            <TransferSuccess
              selectedAccount={selectedAccount}
              selectedRecipient={selectedRecipient}
              amount={amount}
              onNewTransfer={resetForm}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Transfer;
