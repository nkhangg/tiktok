import React, { MouseEvent, useCallback, useEffect, useState } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonGray, ButtonSendCode, CheckBox } from '../button';
import { Input } from '../input';
import { isEmail, passwordCheckCondition, passwordCheckLenght } from '../../ultils/validation';
import { apiRegister } from '../../api/users';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../type';
import { slOpenLogin, slSetImageUser, slSetLogin, slSetLoginLoading, slSetToken, slSetUser } from '../../store/action/slice/slice';

const SignToPhone = () => {
    const [showCondition, setShowCondition] = useState(false);

    // redux
    const { month, day, year } = useSelector((state: RootState) => state.login);
    // const { user } = useSelector((state: RootState) => state.app);

    const dispatch = useDispatch();

    // value state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [checked, setChecked] = useState(false);

    const [error, setError] = useState(false);

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
        if (!day || !month || !year) {
            setReadySendocode(false);
            return;
        }

        if (password === '' || email === '') {
            setReadySendocode(false);
            return;
        }

        if (!errorEmail() || !errorPassword()) {
            setReadySendocode(false);
            return;
        }

        if (!errorForm.errorEmail && !errorForm.errorPassword) {
            setReadySendocode(true);
        } else {
            setReadySendocode(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email, password, errorForm.errorEmail, errorForm.errorPassword, day, month, year]);

    // handle sign

    const handleSign = async () => {
        if (!readySendocode) return;

        try {
            dispatch(slSetLoginLoading(true));
            const res = await apiRegister(email, password);

            if (res) {
                // show error
                setError(false);

                dispatch(slSetToken(res.meta?.token));
                dispatch(slSetImageUser({ image: res.data.avatar, to: res.data.nickname }));
                dispatch(slOpenLogin());
                dispatch(slSetLogin(true));
                dispatch(slSetLoginLoading(false));
            } else {
                // show error
                setError(true);

                dispatch(slSetUser(null));
                dispatch(slSetLogin(false));
                dispatch(slSetLoginLoading(false));
            }
        } catch (error) {
            setError(true);
            dispatch(slSetLoginLoading(false));
        }
    };

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
            <Input error={errorForm.errorEmail} type="email" placeholder="Email address" value={email} setValue={setEmail} />
            {errorForm.errorEmail ? <span className="text-xs text-error">Enter a valid email address</span> : ''}
            <Input error={errorForm.errorPassword} onClick={handleInput} type="password" placeholder="Password" value={password} setValue={setPassword} />
            {showCondition ? (
                <div className="flex flex-col gap-1">
                    <p className="text-white-opacity font-medium text-sm">Your password must have:</p>
                    <span
                        className={`${passwordCheckLenght(password) ? 'text-sucess' : 'text-white-opacity-75'} flex items-center gap-1 text-xs text-white-opacity-75 font-medium`}
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
            <ButtonGray ready={readySendocode} onClick={handleSign} title="Next" width="100%" />

            {error && <span className="text-xs text-error w-full text-center">Account already exists</span>}
        </div>
    );
};

export default SignToPhone;
