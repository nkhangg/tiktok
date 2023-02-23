import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { Logins } from '../interface';

export const logins: Logins[] = [
    { type: 'qr', title: 'Use QR code', icon: faQrcode },
    { type: 'qr', title: 'Use phone / email / username', icon: faUser },
    { type: 'qr', title: 'Continue with Facebook', icon: faFacebook },
];

export const signups: Logins[] = [
    { type: 'qr', title: 'Use phone or email', icon: faUser },
    { type: 'qr', title: 'Continue with Facebook', icon: faFacebook },
];
