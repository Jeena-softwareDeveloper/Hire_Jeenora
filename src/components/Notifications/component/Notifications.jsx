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

    if (loading && notifications.length === 0) {
        return <div className="flex justify-center items-center min-h-[60vh]"><PropagateLoader color='#2563EB' /></div>;
    }

    return (
        <div className="bg-slate-50 min-h-screen py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            My Notifications
                            {unreadCount > 0 && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{unreadCount}</span>}
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">Stay updated with your job applications and alerts</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleMarkAllRead}
                            className="text-blue-600 text-sm font-medium hover:bg-blue-50 px-3 py-1.5 rounded transition"
                            disabled={unreadCount === 0}
                        >
                            Mark all as read
                        </button>
                        <span className="text-slate-300">|</span>
                        <button
                            onClick={handleClearAll}
                            className="text-red-600 text-sm font-medium hover:bg-red-50 px-3 py-1.5 rounded transition"
                            disabled={notifications.length === 0}
                        >
                            Clear all
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {['all', 'unread', 'Job', 'Interview', 'System'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${filter === f ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                        >
                            {f === 'all' ? 'All Notifications' : f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>

                {/* List */}
                <div className="space-y-4">
                    {notifications.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                <FaBell size={24} />
                            </div>
                            <h3 className="text-lg font-medium text-slate-900">No notifications</h3>
                            <p className="text-slate-500">You're all caught up! Check back later for updates.</p>
                        </div>
                    ) : (
                        notifications.map(notif => (
                            <div
                                key={notif._id}
                                className={`bg-white rounded-xl border p-5 flex gap-4 transition group ${notif.isRead ? 'border-slate-200' : 'border-blue-200 shadow-sm bg-blue-50/10'}`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notif.isRead ? 'bg-slate-100' : 'bg-white border border-blue-100'}`}>
                                    {getIcon(notif.type)}
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className={`text-base font-semibold ${notif.isRead ? 'text-slate-800' : 'text-slate-900'}`}>{notif.title}</h4>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-slate-400">{new Date(notif.createdAt).toLocaleString()}</span>
                                            {!notif.isRead && <FaCircle size={8} className="text-blue-500" />}
                                        </div>
                                    </div>
                                    <p className={`text-sm mb-3 ${notif.isRead ? 'text-slate-500' : 'text-slate-700'}`}>{notif.message}</p>

                                    {notif.link && (
                                        <a href={notif.link} className="text-blue-600 text-sm font-medium hover:underline inline-block mb-3">
                                            View Details
                                        </a>
                                    )}

                                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {!notif.isRead && (
                                            <button
                                                onClick={() => handleMarkRead(notif._id)}
                                                className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600"
                                            >
                                                <FaCheck size={10} /> Mark as read
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(notif._id)}
                                            className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-600"
                                        >
                                            <FaTrash size={10} /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notifications;
