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

export function dataURLtoFile(dataurl: string) {
    let arr = dataurl.split(',');
    let afterMine = arr[0].match(/:(.*?);/);
    if (!afterMine?.length) return;
    let mine: string = afterMine[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], 'fileImage.png', { type: mine });
}
