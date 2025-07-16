import { Shield, Lock } from 'lucide-react';

const BankHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      {/* FDIC Widget */}
      <div className="bg-blue-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-blue-800">
            <Shield className="w-4 h-4" />
            <span className="font-medium">
              Bank of America deposit products: FDIC-Insured - Backed by the full faith and credit of the U.S. Government
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Bank Logo - Mimicking Bank of America style */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                <div className="text-white font-bold text-xl">B</div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Bank of America</h1>
              </div>
            </div>
          </div>

          {/* Login Banner */}
          <div className="bg-blue-600 text-white px-6 py-3 rounded-lg">
            <span className="font-semibold">Log In to Online Banking</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BankHeader;
