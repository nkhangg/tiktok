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
