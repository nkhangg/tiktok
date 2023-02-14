import moment from 'moment';

export const secondsToMinute = (inp: number) => {
    return moment.utc(inp * 1000).format('mm:ss') + '';
};
