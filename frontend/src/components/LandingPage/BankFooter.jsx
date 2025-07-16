import { Lock, Shield } from 'lucide-react';

const BankFooter = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Secure Area Banner */}
        <div className="bg-green-800 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-green-300" />
            <span className="font-semibold text-green-100">Secure area</span>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap gap-6 mb-6 text-sm">
          <a href="#" className="text-gray-300 hover:text-white">Privacy</a>
          <a href="#" className="text-gray-300 hover:text-white">Security</a>
          <a href="#" className="text-gray-300 hover:text-white">Your Privacy Choices</a>
        </div>

        {/* Legal Text */}
        <div className="border-t border-gray-700 pt-6 space-y-2 text-sm text-gray-400">
          <p>Bank of America, N.A. Member FDIC. Equal Housing Lender</p>
          <p>© 2025 Bank of America Corporation.</p>
        </div>
      </div>
    </footer>
  );
};

export default BankFooter;
