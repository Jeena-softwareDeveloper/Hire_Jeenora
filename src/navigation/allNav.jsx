import {
  AiOutlineDashboard,
} from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { MdPayment, MdWorkOutline, MdOutlineTrackChanges, MdSupportAgent } from 'react-icons/md';
import { IoNotificationsOutline } from 'react-icons/io5';
import { FaRegFileAlt, FaCoins } from 'react-icons/fa';
import { MdBookmarkBorder } from 'react-icons/md';
import { RiFileList2Line } from 'react-icons/ri';

export const allNav = [
  {
    id: 1,
    title: 'Dashboard',
    icon: <AiOutlineDashboard />,
    role: 'hireuser',
    path: '/hire/dashboard'
  },
  {
    id: 2,
    title: 'Profile',
    icon: <CgProfile />,
    role: 'hireuser',
    path: '/hire/profile'
  },
  //   {
  //     id: 3,
  //     title: 'Resume',
  //     icon: <FaRegFileAlt />,
  //     role: 'hireuser',
  //     path: '/hire/resume'
  //   },
  {
    id: 4,
    title: 'Jobs',
    icon: <MdWorkOutline />,
    role: 'hireuser',
    path: '/hire/jobs'
  },
  {
    id: 5,
    title: 'Saved Jobs',
    icon: <MdBookmarkBorder />,
    role: 'hireuser',
    path: '/hire/saved'
  },
  {
    id: 6,
    title: 'Applications',
    icon: <RiFileList2Line />,
    role: 'hireuser',
    path: '/hire/applications'
  },

  {
    id: 8,
    title: 'Payments',
    icon: <MdPayment />,
    role: 'hireuser',
    path: '/hire/payments'
  },
  {
    id: 9,
    title: 'Notifications',
    icon: <IoNotificationsOutline />,
    role: 'hireuser',
    path: '/hire/notifications'
  },
  {
    id: 10,
    title: 'Support',
    icon: <MdSupportAgent />,
    role: 'hireuser',
    path: '/hire/support'
  },
  {
    id: 12,
    title: 'Tickets Support',
    icon: <MdSupportAgent />,
    role: 'admin',
    path: '/hire/admin/chat'
  },
  {
    id: 13,
    title: 'Credit Settings',
    icon: <FaCoins />,
    role: 'admin',
    path: '/hire/admin/settings'
  },
  //   {
  //     id: 11,
  //     title: 'Resume Editor',
  //     icon: <FaRegFileAlt />, // Reuse icon or find meaningful one
  //     role: 'hireuser',
  //     path: '/hire/resume-editor',
  //     featureFlag: 'resumeEditorEnabled'
  //   }
];