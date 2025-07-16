import { useState } from 'react';
import { CreditCard } from 'lucide-react';

import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const RecipientSelector = ({ recipients, selectedRecipient, onSelectRecipient }) => {
  const [showNewRecipient, setShowNewRecipient] = useState(false);
  const [newRecipient, setNewRecipient] = useState({
    name: '',
    accountNumber: '',
    bankName: '',
  });

  const handleAddNewRecipient = () => {
    if (newRecipient.name && newRecipient.accountNumber && newRecipient.bankName) {
      const recipient = {
        id: Date.now().toString(),
        ...newRecipient,
      };
      onSelectRecipient(recipient);
      setShowNewRecipient(false);
      setNewRecipient({ name: '', accountNumber: '', bankName: '' });
    }
  };

  const frequentRecipients = recipients.filter(r => r.isFrequent);
  const otherRecipients = recipients.filter(r => !r.isFrequent);

  return (
    <div>
      <div className="text-center mb-6">
        <CreditCard className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">Choose Recipient</h2>
        <p className="text-slate-600">Select from your contacts or add a new recipient</p>
      </div>

      {!showNewRecipient ? (
        <div className="space-y-6">
          {frequentRecipients.length > 0 && (
            <div>
              <h3 className="font-semibold text-slate-700 mb-3">Frequent Contacts</h3>
              <div className="space-y-3">
                {frequentRecipients.map(recipient => (
                  <Card
                    key={recipient.id}
                    className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedRecipient?.id === recipient.id
                        ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-200'
                        : 'hover:bg-slate-50 border-slate-200'
                    }`}
                    onClick={() => onSelectRecipient(recipient)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-slate-800">{recipient.name}</h3>
                        <p className="text-slate-600 text-sm">{recipient.bankName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-600">{recipient.accountNumber}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {otherRecipients.length > 0 && (
            <div>
              <h3 className="font-semibold text-slate-700 mb-3">Other Contacts</h3>
              <div className="space-y-3">
                {otherRecipients.map(recipient => (
                  <Card
                    key={recipient.id}
                    className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedRecipient?.id === recipient.id
                        ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-200'
                        : 'hover:bg-slate-50 border-slate-200'
                    }`}
                    onClick={() => onSelectRecipient(recipient)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-slate-800">{recipient.name}</h3>
                        <p className="text-slate-600 text-sm">{recipient.bankName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-600">{recipient.accountNumber}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => setShowNewRecipient(true)}
            className="w-full py-6 border-dashed border-2 border-slate-300 hover:bg-blue-50 hover:border-blue-300 rounded-md"
          >
            + Add New Recipient
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-700 mb-4">Add New Recipient</h3>

          <div>
            <Label htmlFor="name">Recipient Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter recipient's name"
              value={newRecipient.name}
              onChange={(e) => setNewRecipient({ ...newRecipient, name: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              type="text"
              placeholder="Enter account number"
              value={newRecipient.accountNumber}
              onChange={(e) => setNewRecipient({ ...newRecipient, accountNumber: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="bankName">Bank Name</Label>
            <Input
              id="bankName"
              type="text"
              placeholder="Enter bank name"
              value={newRecipient.bankName}
              onChange={(e) => setNewRecipient({ ...newRecipient, bankName: e.target.value })}
              className="mt-1"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowNewRecipient(false)}
              className="flex-1 py-2 border rounded-md border-slate-300 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              onClick={handleAddNewRecipient}
              disabled={!newRecipient.name || !newRecipient.accountNumber || !newRecipient.bankName}
              className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              Add Recipient
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipientSelector;
