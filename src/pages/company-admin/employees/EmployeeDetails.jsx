import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PhoneCall, Flame, DollarSign, Award, Calendar, ArrowLeft, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { employeeService } from '../../../services/employeeService';

export default function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        const data = await employeeService.getById(id || 'e-1');
        setEmployee(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  if (loading || !employee) {
    return (
      <div className="p-8 text-center bg-slate-50 min-h-screen flex items-center justify-center font-sans">
        <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const callsData = employee.daily_calls || [
    { day: 'Mon', calls: 24 },
    { day: 'Tue', calls: 38 },
    { day: 'Wed', calls: 45 },
    { day: 'Thu', calls: 52 },
    { day: 'Fri', calls: 64 },
    { day: 'Sat', calls: 18 },
    { day: 'Sun', calls: 8 }
  ];

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans flex flex-col gap-6">
      {/* Back button & Title Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/admin/employees')}
          className="flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-blue-600 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Employee Directory
        </button>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-100 text-green-800">
          Account Status: {employee.status || 'Active'}
        </span>
      </div>

      {/* Profile Banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-blue-600/30">
            {employee.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{employee.name}</h1>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              {employee.role || 'Senior Telecaller'} • Supervisor: <strong className="text-gray-800">{employee.manager}</strong>
            </p>
            <div className="flex items-center gap-3 text-xs text-gray-600 mt-2">
              <span>Email: <strong className="text-gray-900">{employee.email}</strong></span>
              <span>Phone: <strong className="text-gray-900">{employee.phone}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Performance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Calls Made (Week)</span>
            <h3 className="text-2xl font-black text-gray-900 mt-1">{employee.calls_made || 64}</h3>
            <span className="text-[11px] font-semibold text-green-600 mt-1 inline-block">+18% vs last week</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <PhoneCall className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Hot Leads Handled</span>
            <h3 className="text-2xl font-black text-red-600 mt-1">{employee.hot_leads_handled || 14}</h3>
            <span className="text-[11px] font-semibold text-red-600 mt-1 inline-block">High priority queue</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
            <Flame className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Converted Deals</span>
            <h3 className="text-2xl font-black text-purple-600 mt-1">{employee.closedDeals || 15}</h3>
            <span className="text-[11px] font-semibold text-purple-600 mt-1 inline-block">34.5% conversion rate</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Total Revenue</span>
            <h3 className="text-2xl font-black text-green-600 mt-1">
              ${(employee.revenue_generated || 450000).toLocaleString()}
            </h3>
            <span className="text-[11px] font-semibold text-green-600 mt-1 inline-block">Quota Achieved</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center font-bold">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Chart Section: Calls per Day (7 Days) */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" /> Calling Performance (Calls per Day)
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Outbound & inbound call volume over the last 7 days.</p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={callsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', border: 'none', color: '#FFF', fontSize: '12px' }}
                itemStyle={{ color: '#38BDF8' }}
              />
              <Bar dataKey="calls" fill="#2563EB" radius={[6, 6, 0, 0]} barSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
