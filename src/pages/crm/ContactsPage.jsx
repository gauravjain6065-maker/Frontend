import React from 'react';
import { Search, Plus, Mail, Phone, Building2, ChevronRight, Eye, Edit } from 'lucide-react';

const ContactsPage = () => {
  const contacts = [
    { id: 1, name: 'Sarah Jenkins', role: 'VP of Technology', email: 'sarah@acme.com', phone: '+1 (555) 234-5678', org: 'Acme Corp', lastContacted: '2 days ago' },
    { id: 2, name: 'Mike Ross', role: 'Lead Architect', email: 'mike@techstart.io', phone: '+1 (555) 987-6543', org: 'TechStart Inc', lastContacted: 'Yesterday' },
    { id: 3, name: 'David Miller', role: 'CTO', email: 'david@nexus.com', phone: '+1 (555) 345-6789', org: 'Nexus Software', lastContacted: '5 hours ago' }
  ];

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans flex flex-col gap-6">
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <span>CRM</span> <ChevronRight className="w-3 h-3 text-gray-400" /> <span className="font-medium text-gray-800">Contacts</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
          <p className="text-sm text-gray-700 mt-1">Directory of individual client contact persons.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition text-sm font-medium flex items-center gap-2 self-start sm:self-auto">
          <Plus className="w-4 h-4" /> Add Contact
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col gap-5">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input type="text" placeholder="Search contacts..." className="h-10 w-full rounded-lg border border-gray-300 px-3 pl-9 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-gray-500 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="p-4">Contact</th>
                <th className="p-4">Organization</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Last Contacted</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {contacts.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition">
                  <td className="p-4">
                    <div className="font-semibold text-gray-900">{c.name}</div>
                    <div className="text-xs text-gray-500">{c.role} • {c.email}</div>
                  </td>
                  <td className="p-4 text-gray-800">{c.org}</td>
                  <td className="p-4 text-gray-700">{c.phone}</td>
                  <td className="p-4 text-xs text-gray-500">{c.lastContacted}</td>
                  <td className="p-4 text-right">
                    <button className="p-1.5 text-gray-500 hover:text-blue-600 rounded hover:bg-slate-100"><Eye className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
