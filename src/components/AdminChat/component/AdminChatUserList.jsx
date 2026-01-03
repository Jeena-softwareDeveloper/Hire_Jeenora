import React from 'react';
import { FaUserFriends, FaSearch } from 'react-icons/fa';

const AdminChatUserList = ({ userGroups, searchTerm, setSearchTerm, selectedUser, onSelectUser }) => {
    return (
        <div className="w-full lg:w-[380px] bg-white rounded-[2rem] shadow-xl border border-slate-100 flex-col overflow-hidden transition-all flex h-full">
            <div className="p-6 pb-4 shrink-0">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-black text-slate-800 tracking-tighter uppercase flex items-center gap-3"><div className="p-2 bg-emerald-50 rounded-xl"><FaUserFriends className="text-emerald-600" /></div>Nodes</h2>
                </div>
                <div className="relative group mb-6">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-600 transition-colors" />
                    <input type="text" placeholder="Scan users..." className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-none text-sm font-bold text-slate-800 focus:ring-4 focus:ring-emerald-500/5 transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto px-4 custom-scrollbar space-y-2 pb-6">
                {userGroups.filter(u => u.name?.toLowerCase().includes(searchTerm.toLowerCase())).map(user => (
                    <div
                        key={user._id} onClick={() => onSelectUser(user)}
                        className={`group p-5 rounded-[2.25rem] cursor-pointer transition-all border relative ${selectedUser?._id === user._id ? 'bg-emerald-50/50 border-emerald-100' : 'bg-white border-transparent hover:bg-slate-50'}`}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-700 flex items-center justify-center font-black text-sm uppercase">{user.name?.charAt(0)}</div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between"><h4 className="font-black text-slate-800 text-[13px] truncate uppercase">{user.name}</h4><span className="text-[8px] font-black text-slate-300 mt-0.5">{new Date(user.lastActivity).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>
                                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest truncate">{user.totalRequests} Telemetry Nodes</div>
                            </div>
                        </div>
                        {selectedUser?._id === user._id && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-600 rounded-r-full" />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminChatUserList;

