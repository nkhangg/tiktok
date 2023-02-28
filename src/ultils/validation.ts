export const includeNumber = (value: string) => {
    return /\d/.test(value);
};
export const includeSecialCharacters = (value: string) => {
    return /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value);
};

export const passwordCheckLenght = (value: string) => {
    if (value.trim() === '') return false;

    if (value.length < 8 || value.length > 20) return false;

    return true;
};

export const isEmail = (value: string) => {
    return /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/.test(
        value,
    );
};

export const isNumber = (value: string) => {
    return /^[0-9]*$/.test(value);
};

export const passwordCheckCondition = (value: string) => {
    if (!includeNumber(value)) return false;

    if (!includeSecialCharacters(value)) return false;

    return true;
};

export const isCode = (code: string) => {
    if (code.length !== 6) return false;

    if (!isNumber(code)) return false;
    return true;
};
