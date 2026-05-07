import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts } from '../store/slices/contactSlice';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function Contacts() {
  const dispatch = useDispatch();
  const { items: contacts, loading, error } = useSelector((state) => state.contacts);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (contacts.length === 0) {
      dispatch(fetchContacts());
    }
  }, [dispatch, contacts.length]);

  const handleRetry = () => dispatch(fetchContacts());

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingSpinner message="Loading contacts..." />;
  if (error) return <ErrorMessage message={error} onRetry={handleRetry} />;

  return (
    <div className="space-y-6">
      <div className="w-full sm:w-72">
        <SearchBar value={search} onChange={setSearch} placeholder="Search contacts..." />
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((contact) => (
            <div key={contact.id} className="group bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 hover:border-indigo-500/30 hover:bg-slate-800/80 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold shrink-0 shadow-lg shadow-indigo-500/20">
                  {contact.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-white font-semibold text-sm truncate">{contact.name}</h3>
                  <p className="text-indigo-400 text-xs truncate mt-0.5">{contact.email}</p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-700/30 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <svg className="w-3.5 h-3.5 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <span className="truncate">{contact.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <svg className="w-3.5 h-3.5 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" /></svg>
                  <span className="truncate">{contact.company?.name || '—'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-slate-400 font-medium mb-1">No contacts match your search</p>
          <p className="text-sm text-slate-500">Try a different search term.</p>
        </div>
      )}
    </div>
  );
}
