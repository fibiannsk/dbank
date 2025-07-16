import { useState } from 'react';
import { Eye, EyeOff, HelpCircle, Smartphone } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';

const LoginSection = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [saveUserId, setSaveUserId] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isUserIdValid = userId.length >= 6;
  const isPasswordEnabled = isUserIdValid;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="userId" className="text-sm font-medium text-gray-700">
                User ID
              </Label>
              <Input
                id="userId"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="mt-1"
                placeholder="Must be at least 6 characters long"
              />
              <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters long</p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="saveUserId"
                checked={saveUserId}
                onCheckedChange={setSaveUserId}
              />
              <Label htmlFor="saveUserId" className="text-sm text-gray-700">
                Save this User ID
              </Label>
              <HelpCircle className="w-4 h-4 text-gray-400 cursor-pointer" />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={!isPasswordEnabled}
                  className={!isPasswordEnabled ? 'bg-gray-100 cursor-not-allowed' : ''}
                  placeholder={
                    !isPasswordEnabled
                      ? 'Please enter at least 6 characters of online id to enable Passcode'
                      : ''
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  disabled={!isPasswordEnabled}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {!isPasswordEnabled && (
                <p className="text-xs text-gray-500 mt-1">
                  Please enter at least 6 characters of online id to enable Passcode
                </p>
              )}
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                Forgot your Password?
              </a>
            </div>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              disabled={!isUserIdValid || !password}
            >
              Log In
            </Button>

            <div className="border-t pt-6">
              <div className="text-center mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Stay connected with our app</h3>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Smartphone className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-700">Mobile banking Llama</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Secure, convenient banking anytime</p>
                <Button
                  variant="outline"
                  onClick={() => setShowModal(true)}
                  className="text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  Get the app
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Login help</h3>
            <div className="space-y-3">
              <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">
                Forgot ID/Password?
              </a>
              <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">
                Problem logging in?
              </a>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Not using Online Banking?</h3>
            <div className="space-y-3">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Enroll now for Online Banking
              </Button>
              <a
                href="#"
                className="block text-blue-600 hover:text-blue-800 text-sm text-center"
              >
                Learn more about Online Banking
              </a>
              <a
                href="#"
                className="block text-blue-600 hover:text-blue-800 text-sm text-center"
              >
                Service Agreement
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Get the App */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Download Mobile App</h3>
            <p className="text-gray-600 mb-4">
              Download our mobile banking app for secure, convenient banking on the go.
            </p>
            <div className="flex gap-3">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                Download for iOS
              </Button>
              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                Download for Android
              </Button>
            </div>
            <Button
              variant="outline"
              className="w-full mt-3"
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginSection;
