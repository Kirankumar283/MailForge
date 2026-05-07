import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts } from '../store/slices/contactSlice';

export default function Dashboard() {
  const dispatch = useDispatch();
  const templateCount = useSelector((state) => state.templates.items.length);
  const { items: contacts, loading: loadingContacts } = useSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const stats = [
    {
      label: 'Total Templates',
      value: templateCount,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'from-indigo-500 to-blue-600',
      shadow: 'shadow-indigo-500/20',
      link: '/dashboard/templates',
    },
    {
      label: 'Total Contacts',
      value: loadingContacts ? '…' : contacts.length,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: 'from-emerald-500 to-teal-600',
      shadow: 'shadow-emerald-500/20',
      link: '/dashboard/contacts',
    },
    {
      label: 'Campaigns Sent',
      value: 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      color: 'from-amber-500 to-orange-600',
      shadow: 'shadow-amber-500/20',
      link: '#',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-700 p-6 sm:p-8">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        <div className="relative">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Welcome to MailForge 👋
          </h2>
          <p className="text-indigo-200 text-sm sm:text-base max-w-lg">
            Manage your email templates, view contacts, and launch campaigns — all from one dashboard.
          </p>
          <div className="flex gap-3 mt-5">
            <Link
              to="/dashboard/templates"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white text-indigo-700 hover:bg-indigo-50 transition-colors shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Template
            </Link>
            <Link
              to="/dashboard/contacts"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white/15 text-white hover:bg-white/25 transition-colors backdrop-blur-sm"
            >
              View Contacts
            </Link>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            to={stat.link}
            className={`group relative overflow-hidden rounded-xl bg-slate-800/50 border border-slate-700/50 p-5 hover:border-slate-600/50 transition-all duration-300 hover:shadow-lg ${stat.shadow}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg ${stat.shadow}`}>
                {stat.icon}
              </div>
            </div>
            {/* Subtle hover glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300`} />
          </Link>
        ))}
      </div>

      {/* Quick tips */}
      <div className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-6">
        <h3 className="text-white font-semibold text-base mb-4">Quick Tips</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-200">Use Placeholders</p>
              <p className="text-xs text-slate-400 mt-0.5">Use {"{{name}}"} in templates for personalized emails.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-200">Data Persistence</p>
              <p className="text-xs text-slate-400 mt-0.5">Templates are saved via Redux with localStorage and persist across sessions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
