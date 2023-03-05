import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { apiLogin } from '../../api/users';
import {
    slSetUser,
    slSetTypeMode,
    slOpenLogin,
    slSetLogin,
    slSetToken,
    slSetImageUser,
} from '../../store/action/slice/slice';
import { ButtonGray } from '../button';
import { Input } from '../input';

const LoginToEmail = () => {
    // redux
    const dispatch = useDispatch();

    // state
    const [readyButton, setReadyButton] = useState(false);

    // state value
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // handle funtion
    const handleClickForgot = () => {
        dispatch(slSetTypeMode('forgotPassword'));
    };

    const handleLogin = () => {
        fetchApi();
    };

    // validate

    const invalidButton = useCallback(() => {
        if (email === '' || password === '') {
            setReadyButton(false);
            return;
        }
        setReadyButton(true);
    }, [email, password]);

    // call api
    const fetchApi = async () => {
        if (email === '' || password === '') return;

        try {
            const res = await apiLogin(email, password);
            if (res) {
                dispatch(slSetToken(res.meta?.token));
                dispatch(slSetImageUser({ image: res.data.avatar, to: res.data.nickname }));
                dispatch(slOpenLogin());
                dispatch(slSetLogin(true));
            } else {
                dispatch(slSetUser(null));
                dispatch(slSetLogin(false));
            }
        } catch (error) {}
    };

    useEffect(() => {
        invalidButton();
    }, [invalidButton]);

    return (
        <div className="flex flex-col gap-2">
            <Input type="text" value={email} setValue={setEmail} placeholder="Email or username" />
            <Input type="password" value={password} setValue={setPassword} placeholder="Password" />
            <div className="mb-[21px]">
                <div className="flex items-center gap-3">
                    <span
                        onClick={handleClickForgot.bind(this)}
                        className="font-bold hover:underline text-xs text-white-opacity-75 
                        cursor-pointer "
                    >
                        {'Forgot password?'}
                    </span>
                </div>
            </div>
            <ButtonGray onClick={handleLogin.bind(this)} ready={readyButton} title="Log in" />
        </div>
    );
};

export default LoginToEmail;
