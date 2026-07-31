import React, { useState } from 'react';
import { Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Simple mock password strength calculation
  const getStrength = (pass) => {
    if (!pass) return 0;
    if (pass.length > 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass)) return 3;
    if (pass.length > 6) return 2;
    return 1;
  };
  
  const strength = getStrength(password);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 md:p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Set new password</h1>
          <p className="text-sm text-gray-700">Your new password must be different from previously used passwords.</p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">New Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 pl-9 pr-10 w-full text-sm" 
                placeholder="••••••••" 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {password && (
              <div className="mt-2 flex flex-col gap-1.5">
                <div className="flex gap-1 h-1.5 w-full rounded-full overflow-hidden">
                  <div className={`flex-1 ${strength >= 1 ? 'bg-red-500' : 'bg-gray-200'}`}></div>
                  <div className={`flex-1 ${strength >= 2 ? 'bg-yellow-500' : 'bg-gray-200'}`}></div>
                  <div className={`flex-1 ${strength >= 3 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                </div>
                <p className="text-xs text-gray-500">
                  {strength === 1 && 'Weak'}
                  {strength === 2 && 'Good'}
                  {strength === 3 && 'Strong'}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1.5 mt-2">
            <label className="text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
              <input 
                type={showConfirmPassword ? 'text' : 'password'} 
                className="h-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 pl-9 pr-10 w-full text-sm" 
                placeholder="••••••••" 
              />
              <button 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2.5 transition font-medium mt-4">
            Reset Password
          </button>
        </form>

        <div className="text-center mt-8">
          <a href="/login" className="text-sm text-gray-500 hover:text-gray-700 font-medium inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
