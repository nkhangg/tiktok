import React, { MouseEvent, useCallback, useEffect, useState } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonGray, ButtonSendCode, CheckBox } from '../button';
import { Input } from '../input';
import { isCode, isEmail, passwordCheckCondition, passwordCheckLenght } from '../../ultils/validation';

const SignToPhone = () => {
    const [showCondition, setShowCondition] = useState(false);

    // value state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [checked, setChecked] = useState(false);

    // state error

    const [errorForm, setErrorForm] = useState({ errorEmail: false, errorPassword: false });
    const [readySendocode, setReadySendocode] = useState(false);

    // handle funtion

    const handleInput = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setShowCondition(true);
    };

    const handleClickOutside = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setShowCondition(false);
    };

    // validation funtion

    const errorPassword = () => {
        // when password is empty then error password false
        if (password === '') return true;

        if (!passwordCheckLenght(password)) return false;

        if (!passwordCheckCondition(password)) return false;

        return true;
    };

    const errorEmail = () => {
        if (email === '') return true;

        if (!isEmail(email)) return false;

        return true;
    };

    const handleShowError = useCallback(() => {
        setErrorForm({
            errorEmail: !errorEmail(),
            errorPassword: !errorPassword(),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password, email]);

    const handleReadySendcode = useCallback(() => {
        setReadySendocode(isCode(code));
    }, [code]);

    // handle email

    // use Effect

    useEffect(() => {
        handleShowError();
    }, [handleShowError]);

    useEffect(() => {
        handleReadySendcode();
    }, [handleReadySendcode]);

    useEffect(() => {
        if (password === '') {
            setShowCondition(false);
            return;
        }

        setShowCondition(true);
    }, [password]);

    return (
        <div onClick={handleClickOutside.bind(this)} className="flex gap-3 flex-col pb-5">
            <Input
                error={errorForm.errorEmail}
                type="email"
                placeholder="Email address"
                value={email}
                setValue={setEmail}
            />
            {errorForm.errorEmail ? <span className="text-xs text-error">Enter a valid email address</span> : ''}
            <Input
                error={errorForm.errorPassword}
                onClick={handleInput}
                type="password"
                placeholder="Password"
                value={password}
                setValue={setPassword}
            />
            {showCondition ? (
                <div className="flex flex-col gap-1">
                    <p className="text-white-opacity font-medium text-sm">Your password must have:</p>
                    <span
                        className={`${
                            passwordCheckLenght(password) ? 'text-sucess' : 'text-white-opacity-75'
                        } flex items-center gap-1 text-xs text-white-opacity-75 font-medium`}
                    >
                        <span>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span>8 to 20 characters</span>
                    </span>
                    <span
                        className={`${
                            passwordCheckCondition(password) ? 'text-sucess' : 'text-white-opacity-75'
                        } flex items-center gap-1 text-xs text-white-opacity-75 font-medium`}
                    >
                        <span>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span>Letters, numbers, and special characters</span>
                    </span>
                </div>
            ) : (
                ''
            )}
            <ButtonSendCode ready={readySendocode} value={code} setValue={setCode} />
            <CheckBox checked={checked} setChecked={setChecked} />
            <ButtonGray title="Next" width="100%" />
        </div>
    );
};

export default SignToPhone;
