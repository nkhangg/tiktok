import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { Logins } from '../interface';
import { Apple, Facebook, Google, Instagram, KakaoTalk, Line, Twitter } from './Icon';

export const logins: Logins[] = [
    { type: 'lgQr', title: 'Use QR code', icon: faQrcode },
    { type: 'lgphone', title: 'Use phone / email / username', icon: faUser },
    { type: 'lgFacebook', title: 'Continue with Facebook', IconSocial: Facebook },
    { type: 'lgGoogle', title: 'Continue with Google', IconSocial: Google },
    { type: 'lgTwitter', title: 'Continue with Twitter', IconSocial: Twitter },
    { type: 'lgLine', title: 'Continue with LINE', IconSocial: Line },
    { type: 'lgKakaoTalk', title: 'Continue with KakaoTalk', IconSocial: KakaoTalk },
    { type: 'lgApple', title: 'Continue with Apple', IconSocial: Apple },
    { type: 'lgInstagram', title: 'Continue with Instagram', IconSocial: Instagram },
];

export const signups: Logins[] = [
    { type: 'suPhone', title: 'Use phone or email', icon: faUser },
    { type: 'suFacebook', title: 'Continue with Facebook', IconSocial: Facebook },
    { type: 'suGoogle', title: 'Continue with Google', IconSocial: Google },
];

export const moreSignups: Logins[] = [
    { type: 'suTwitter', title: 'Continue with Twitter', IconSocial: Twitter },
    { type: 'suLine', title: 'Continue with LINE', IconSocial: Line },
    { type: 'suKakaoTalk', title: 'Continue with KakaoTalk', IconSocial: KakaoTalk },
];

export const months = [
    'January',
    'February ',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
