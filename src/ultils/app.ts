import { OptionsRange } from '../interface';

export const title = {
    home: 'Watch trending videos for you | TikTok',
    login: 'Login | TikTok',
};

export const filterDulicate = <T>(arr: T[]) =>
    new Promise((resolve) => {
        const res = arr.filter((item, index) => {
            return (
                index ===
                arr.findIndex((i) => {
                    return JSON.stringify(item) === JSON.stringify(i);
                })
            );
        });

        resolve(res);
    });

export const range = (to: number, from: number = 1, option: OptionsRange = {}) => {
    const arr = [];
    for (let i = from; i <= to; i++) {
        arr.push(i);
    }

    if (option) {
        arr.reverse();
    }

    return arr;
};
