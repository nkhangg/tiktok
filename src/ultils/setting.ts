import { Settings } from '../interface';
import {
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faToggleOn,
    faToggleOff,
    faMoon,
    faCoins,
    faGear,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

export const settings: Settings[] = [
    {
        title: 'English',
        icon: faEarthAsia,
        children: [
            { code: 'vn', title: 'Tiếng Việt' },
            { code: 'en', title: 'Tiếng Anh' },
            { code: 'cn', title: 'Tiếng Trung' },
        ],
    },
    {
        title: 'Feedback and help',
        icon: faCircleQuestion,
        to: '/feedback',
    },
    {
        title: 'Keyboard shortcuts',
        icon: faKeyboard,
    },
    {
        title: 'Dark mode',
        icon: faMoon,
        btnDark: faToggleOff,
        btnWhite: faToggleOn,
    },
];

export const userMenu: Settings[] = [
    {
        icon: faUser,
        title: 'View profile',
        to: '/@hoaa',
    },

    {
        icon: faCoins,
        title: 'Get coins',
        to: '/coins',
    },

    {
        icon: faGear,
        title: 'Settings',
        to: '/settings',
    },
    ...settings,
    {
        type: 'logout',
        icon: faSignOut,
        title: 'Log out',
        separate: true,
    },
];
