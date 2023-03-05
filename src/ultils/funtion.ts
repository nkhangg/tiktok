import moment from 'moment';

export const secondsToMinute = (inp: number) => {
    return moment.utc(inp * 1000).format('mm:ss') + '';
};

export const sleep = async (ms: number) => {
    return new Promise((resovle) => setTimeout(resovle, ms));
};
