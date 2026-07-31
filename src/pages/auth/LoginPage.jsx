import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { login } from '../../services/frappeApi';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both your work email and password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await login(email, password);
      // Frappe Auth Login Response
      const role = res?.role || res?.user_role || 'Admin';
      
      if (role.toLowerCase().includes('manager')) {
        navigate('/manager/dashboard');
      } else if (role.toLowerCase().includes('employee')) {
        navigate('/employee/dashboard');
      } else {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      console.warn('Frappe API Login Error:', err.message);
      setError(err.message || 'Login failed. Please check your credentials or Frappe backend.');
    } finally {
      setLoading(false);
    }
  };

  // Fallback direct navigation for client demo mode
  const handleDemoLogin = (rolePath) => {
    navigate(rolePath);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 md:p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto flex items-center justify-center mb-4 shadow-md shadow-blue-600/30">
            <span className="text-white font-black text-xl tracking-wider">CRM</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-sm text-gray-600">Please enter your details to sign in.</p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">{error}</p>
              <p className="mt-1 text-[11px] text-red-600">
                Tip: You can also click one of the quick demo buttons below to test the UI.
              </p>
            </div>
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Work Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-gray-400" />
              </div>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 pl-9 w-full text-sm outline-none transition" 
                placeholder="john@company.com" 
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
              <input 
                type={showPassword ? 'text' : 'password'} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 pl-9 pr-10 w-full text-sm outline-none transition" 
                placeholder="••••••••" 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
              <label htmlFor="remember" className="text-sm text-gray-700 select-none cursor-pointer">Remember me</label>
            </div>
            <a href="/forgot-password" className="text-sm text-blue-600 hover:underline font-medium">Forgot password?</a>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-lg px-4 py-2.5 transition font-semibold text-sm mt-4 flex justify-center items-center gap-2 cursor-pointer shadow-sm"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Quick Demo Shortcuts Banner */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            Quick Direct Portal Access
          </p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button 
              onClick={() => handleDemoLogin('/admin/dashboard')}
              className="px-2 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition cursor-pointer text-center"
            >
              Company Admin
            </button>
            <button 
              onClick={() => handleDemoLogin('/manager/dashboard')}
              className="px-2 py-2 rounded-lg bg-purple-50 text-purple-700 font-semibold hover:bg-purple-100 transition cursor-pointer text-center"
            >
              Manager
            </button>
            <button 
              onClick={() => handleDemoLogin('/employee/dashboard')}
              className="px-2 py-2 rounded-lg bg-emerald-50 text-emerald-700 font-semibold hover:bg-emerald-100 transition cursor-pointer text-center"
            >
              Employee
            </button>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-700">
            Don't have an account? <a href="/signup" className="text-blue-600 hover:underline font-semibold">Sign up your company</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
