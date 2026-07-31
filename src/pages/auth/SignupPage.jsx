import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, User, Mail, Phone, Lock, Briefcase, Users, Eye, EyeOff, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { createAccount } from '../../services/frappeApi';

const SignupPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    companySize: '',
    fullName: '',
    workEmail: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please re-enter your password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createAccount(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1500);
    } catch (err) {
      console.warn('Frappe Signup Error:', err.message);
      setError(err.message || 'Signup failed. Please verify your company details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 md:p-8 w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your company account</h1>
          <p className="text-sm text-gray-600">Join thousands of companies using our CRM platform.</p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-3.5 rounded-lg bg-green-50 border border-green-200 text-green-700 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
            <span>Company account created successfully! Redirecting to Admin Dashboard...</span>
          </div>
        )}

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Company Details */}
          <div>
            <h2 className="text-base font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100 uppercase tracking-wider text-xs">
              1. Company Profile
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Company Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 className="h-4 w-4 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    className="h-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 pl-9 w-full text-sm outline-none" 
                    placeholder="Acme Inc." 
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Industry</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-4 w-4 text-gray-400" />
                  </div>
                  <select 
                    name="industry"
                    required
                    value={formData.industry}
                    onChange={handleChange}
                    className="h-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 pl-9 w-full text-sm bg-white outline-none"
                  >
                    <option value="" disabled>Select industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Retail">Retail</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Company Size</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="h-4 w-4 text-gray-400" />
                  </div>
                  <select 
                    name="companySize"
                    required
                    value={formData.companySize}
                    onChange={handleChange}
                    className="h-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 pl-9 w-full text-sm bg-white outline-none"
                  >
                    <option value="" disabled>Select size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Details */}
          <div>
            <h2 className="text-base font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100 uppercase tracking-wider text-xs">
              2. Company Administrator
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="h-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 pl-9 w-full text-sm outline-none" 
                    placeholder="John Doe" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Work Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <input 
                    type="email" 
                    name="workEmail"
                    required
                    value={formData.workEmail}
                    onChange={handleChange}
                    className="h-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 pl-9 w-full text-sm outline-none" 
                    placeholder="john@acme.com" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-gray-400" />
                  </div>
                  <input 
                    type="tel" 
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="h-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 pl-9 w-full text-sm outline-none" 
                    placeholder="+1 (555) 000-0000" 
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
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="h-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 pl-9 pr-10 w-full text-sm outline-none" 
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

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="h-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 pl-9 pr-10 w-full text-sm outline-none" 
                    placeholder="••••••••" 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 mt-2">
            <input type="checkbox" id="terms" required className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
            <label htmlFor="terms" className="text-xs text-gray-600 leading-relaxed cursor-pointer">
              By creating an account, you agree to our <a href="#" className="text-blue-600 hover:underline font-semibold">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline font-semibold">Privacy Policy</a>.
            </label>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-lg px-4 py-3 transition font-semibold text-sm mt-2 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Creating Company Account...' : 'Create Company Account'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-700">
            Already have an account? <a href="/login" className="text-blue-600 hover:underline font-semibold">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
