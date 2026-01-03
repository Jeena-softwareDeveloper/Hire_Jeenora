import React, { useState } from 'react';
import { useGetNotifications, useMarkNotificationRead, useDeleteNotification, useMarkAllNotificationsRead, useDeleteAllNotifications } from '../../../hooks/useNotifications';
import { FaBell, FaCheck, FaTrash, FaCircle, FaInfo, FaCalendarAlt, FaBriefcase, FaMoneyBillWave, FaExclamationTriangle } from 'react-icons/fa';
import { PropagateLoader } from 'react-spinners';
import '../css/Notifications.css';

const Notifications = () => {
    // Pagination (simplified for now)
    const [filter, setFilter] = useState('all'); // all, unread, Job, Interview, System

    const { data: notificationsData, isLoading: loading } = useGetNotifications({ category: filter === 'unread' ? 'all' : filter, unreadOnly: filter === 'unread' });
    const { mutate: markRead } = useMarkNotificationRead();
    const { mutate: deleteNotif } = useDeleteNotification();
    const { mutate: markAllRead } = useMarkAllNotificationsRead();
    const { mutate: clearAll } = useDeleteAllNotifications();

    const notifications = notificationsData?.notifications || [];
    const unreadCount = notificationsData?.unreadCount || 0;

    const handleMarkRead = (id) => {
        markRead(id);
    };

    const handleDelete = (id) => {
        deleteNotif(id);
    };

    const handleMarkAllRead = () => {
        markAllRead();
    };

    const handleClearAll = () => {
        if (window.confirm('Are you sure you want to clear all notifications?')) {
            clearAll();
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'job': return <FaBriefcase className="text-blue-500" />;
            case 'interview': return <FaCalendarAlt className="text-orange-500" />;
            case 'payment': return <FaMoneyBillWave className="text-green-500" />;
            case 'alert': return <FaExclamationTriangle className="text-red-500" />;
            default: return <FaInfo className="text-gray-500" />;
        }
    };

    return (
        <div className="bg-transparent">
            {/* Header - Unified Single Row */}
            <div className="flex flex-row items-center justify-between gap-4 mb-8 w-full">
                {/* Title */}
                <div className="flex-shrink-0">
                    <h1 className="text-xl sm:text-2xl lg:text-xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-2">
                        Inbox
                        {unreadCount > 0 && <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full shadow-md shrink-0">{unreadCount}</span>}
                    </h1>
                </div>

                {/* Actions & Filters Container */}
                <div className="flex items-center gap-3 overflow-x-auto no-scrollbar shrink-0">
                    <div className="hidden md:flex items-center bg-white p-1 rounded-lg border border-slate-100 shadow-sm">
                        {['all', 'unread', 'Job', 'Interview'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f.toLowerCase())}
                                className={`px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest transition whitespace-nowrap ${filter === f.toLowerCase() ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 ml-2">
                        <button
                            onClick={handleMarkAllRead}
                            className="text-blue-600 text-[10px] font-black uppercase tracking-widest hover:text-blue-700 transition whitespace-nowrap disabled:opacity-30"
                            disabled={unreadCount === 0}
                        >
                            Mark All
                        </button>
                        <button
                            onClick={handleClearAll}
                            className="text-red-500 text-[10px] font-black uppercase tracking-widest hover:text-red-600 transition whitespace-nowrap disabled:opacity-30"
                            disabled={notifications.length === 0}
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full pb-8 lg:pb-12 pt-0">
                <div className="max-w-[1400px] mx-auto">
                    {loading && notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <PropagateLoader color='#2563EB' size={10} />
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Updating Feed...</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {notifications.length === 0 ? (
                                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center animate-fadeIn">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FaBell className="text-slate-300 text-2xl" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 mb-2">You're All Caught Up!</h3>
                                    <p className="text-slate-500 text-sm max-w-sm mx-auto">New notifications about your applications and account will appear here.</p>
                                </div>
                            ) : (
                                notifications.map((notif, index) => (
                                    <div
                                        key={notif._id}
                                        className={`group relative bg-white rounded-2xl p-5 border transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-0.5 animate-fadeIn ${!notif.isRead ? 'border-indigo-100 bg-gradient-to-r from-white to-indigo-50/10' : 'border-slate-100'}`}
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <div className="flex gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0 transition-transform group-hover:scale-110 ${!notif.isRead ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                                {getIcon(notif.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className={`text-sm tracking-tight truncate pr-4 ${!notif.isRead ? 'font-black text-slate-900' : 'font-bold text-slate-600'}`}>{notif.title}</h3>
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">{moment(notif.createdAt).fromNow()}</span>
                                                </div>
                                                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 pr-6">{notif.message}</p>

                                                <div className="flex items-center gap-6 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {!notif.isRead && (
                                                        <button
                                                            onClick={() => handleMarkRead(notif._id)}
                                                            className="text-indigo-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 hover:gap-3 transition-all"
                                                        >
                                                            Mark Read <FaCheck />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDelete(notif._id)}
                                                        className="text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 hover:gap-3 transition-all"
                                                    >
                                                        Delete <FaTrash />
                                                    </button>
                                                    {notif.link && (
                                                        <Link
                                                            to={notif.link}
                                                            className="text-slate-900 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 hover:gap-3 transition-all"
                                                        >
                                                            View Details →
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                            {!notif.isRead && (
                                                <div className="absolute top-5 right-5 w-2 h-2 bg-indigo-600 rounded-full shadow-[0_0_10px_#4F46E5] group-hover:animate-pulse"></div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default Notifications;

