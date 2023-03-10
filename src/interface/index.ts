import { IconDefinition } from '@fortawesome/free-regular-svg-icons';

export interface Action<T, P> {
    readonly type: T;
    readonly data?: P;
}

export interface Language {
    code: string;
    title: string;
}

export interface Settings {
    title: string;
    icon?: IconDefinition;
    code?: string;
    btnDark?: IconDefinition;
    btnWhite?: IconDefinition;
    children?: Settings[];
    to?: string;
    separate?: boolean;
    type?: string;
}

export interface ResponceAccount {
    avatar: string;
    bio: string;
    created_at: string;
    facebook_url: string;
    first_name: string;
    followers_count: number;
    followings_count: number;
    full_name: string;
    id: number;
    instagram_url: number;
    last_name: string;
    likes_count: number;
    nickname: string;
    tick: boolean;
    twitter_url: string;
    updated_at: string;
    website_url: string;
    youtube_url: string;
    is_followed?: boolean;
}

export interface ResponceAccountFull {
    data: ResponceAccount[];
    meta: {
        pagination: {
            total: number;
            count: number;
            per_page: number;
            current_page: number;
            total_pages: number;
            links: {
                next: string;
            };
        };
    };
}

export interface Logins {
    type: string;
    title: string;
    icon?: IconDefinition;
    IconSocial?: React.ForwardRefExoticComponent<IconsProps & React.RefAttributes<any>>;
}

export interface SliceRedux {
    type: string;
    data: string | boolean;
}

export interface IconsProps {
    className?: string;
    width?: string;
    height?: string;
}

export interface Navbar {
    Icon: React.ForwardRefExoticComponent<IconsProps & React.RefAttributes<any>>;
    ActiveIcon: React.ForwardRefExoticComponent<IconsProps & React.RefAttributes<any>>;
    title: string;
    path: string;
}

export interface Discover {
    hastag: boolean;
    music: boolean;
    title: string;
}

export interface ResponceUser {
    data: User;
    meta: { token: string };
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    nickname: string;
    avatar: string;
    bio: string;
    tick: boolean;
    is_followed: boolean;
    followings_count: number;
    followers_count: number;
    likes_count: number;
    website_url?: string;
    facebook_url?: string;
    youtube_url?: string;
    twitter_url?: string;
    instagram_url?: string;
    email_verified_at?: string;
    created_at?: string;
    updated_at?: string;
    // meta?: {
    //     token: string;
    // };
}

export interface Video {
    id: number;
    uuid: string;
    user_id: number;
    type: string;
    thumb_url: string;
    file_url: string;
    description: string;
    music: string;
    is_liked: boolean;
    likes_count: number;
    comments_count: number;
    shares_count: number;
    views_count: number;
    viewable: string;
    allows: [];
    published_at: string;
    created_at: string;
    updated_at: string;
    user: User;
}

export interface ProfileInterface {
    id: number;
    first_name: string;
    last_name: string;
    nickname: string;
    avatar: string;
    bio: string;
    tick: boolean;
    is_followed: boolean;
    followings_count: number;
    followers_count: number;
    likes_count: number;
    website_url?: string;
    facebook_url?: string;
    youtube_url?: string;
    twitter_url?: string;
    instagram_url?: string;
    email_verified_at?: string;
    created_at?: string;
    updated_at?: string;
    videos: Video[];
}

export interface OptionsRange {
    reverse?: boolean;
}

export interface PhoneNumberFormat {
    country: string;
    format: string;
}

export interface Active {
    value: string;
    initBorder: number;
    left: number;
}

export interface ResponceCheckingUsername {
    message: string;
    status_code: number;
}

export interface UpdateProps {
    firstname: string;
    lastname: string;
    avatar?: File | FormData;
    bio: string;
}

export interface EditAvatar {
    state: boolean;
    image: File | null;
}

export interface AvatarEdited {
    preview: string;
    image: File | null | undefined | FormData;
    state: boolean;
}
