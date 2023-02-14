import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { Logins } from '../interface';

export const logins: Logins[] = [
    { title: 'Use QR code', icon: faQrcode },
    { title: 'Use phone / email / username', icon: faUser },
    { title: 'Continue with Facebook', icon: faFacebook },
];

export const signups: Logins[] = [
    { title: 'Use phone or email', icon: faUser },
    { title: 'Continue with Facebook', icon: faFacebook },
];
