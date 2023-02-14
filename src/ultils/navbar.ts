import { Discover, Navbar } from '../interface';
import { HomeActiveIcon, HomeIcon, LiveActiveIcon, LiveIcon, UserGroupActiveIcon, UserGroupIcon } from './Icon';
import { path } from './path';

export const navbar: Navbar[] = [
    {
        Icon: HomeIcon,
        ActiveIcon: HomeActiveIcon,
        title: 'For You',
        path: path.HOME,
    },
    {
        Icon: UserGroupIcon,
        ActiveIcon: UserGroupActiveIcon,
        title: 'Following',
        path: path.FOLLOWING,
    },
    {
        Icon: LiveIcon,
        ActiveIcon: LiveActiveIcon,
        title: 'Live',
        path: path.LIVE,
    },
];

export const discover: Discover[] = [
    {
        title: 'suthatla',
        hastag: true,
        music: false,
    },
    {
        title: 'mackedoi',
        hastag: true,
        music: false,
    },
    {
        title: 'sansangthaydoi',
        hastag: true,
        music: false,
    },
    {
        title: 'Yêu Đơn Phương Là Gì (MEE Remix) - Mee Media & h0n & BHMedia',
        hastag: false,
        music: true,
    },
    {
        title: 'Về Nghe Mẹ Ru - NSND Bach Tuyet & Hứa Kim Tuyền & 14 Casper & Hoàng Dũng',
        hastag: false,
        music: true,
    },
    {
        title: 'Thiên Thần Tình Yêu - RICKY STAR',
        hastag: false,
        music: true,
    },
    {
        title: '7749hieuung',
        hastag: true,
        music: false,
    },
    {
        title: 'genzlife',
        hastag: true,
        music: false,
    },
    {
        title: 'Tình Đã Đầy Một Tim - Huyền Tâm Môn',
        hastag: false,
        music: true,
    },
    {
        title: 'Thằng Hầu (Thái Hoàng Remix) [Short Version] - Dunghoangpham',
        hastag: false,
        music: true,
    },
];

export const footerNav: string[] = [
    'About',
    'Newsroom',
    'Contact',
    'Careers',
    'ByteDance',
    'TikTok for Good',
    'Advertise',
    'Developers',
    'Transparency',
    'TikTok Rewards',
    'TikTok Browse',
    'TikTok Embeds',
    'Help',
    'Safety',
    'Terms',
    'Privacy',
    'Creator Portal',
    'Community Guidelines',
];
