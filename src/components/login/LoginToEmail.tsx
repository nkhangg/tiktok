import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { apiLogin } from '../../api/users';
import { slSetUser, slSetTypeMode, slOpenLogin, slSetLogin, slSetToken, slSetImageUser, slSetLoginLoading } from '../../store/action/slice/slice';
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

    const [error, setError] = useState(false);

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
            dispatch(slSetLoginLoading(true));
            const res = await apiLogin(email, password);
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
            // show error
            setError(true);
            dispatch(slSetLoginLoading(false));
        }
    };

    useEffect(() => {
        invalidButton();
    }, [invalidButton]);

    return (
        <div className="flex flex-col gap-2 ">
            <Input error={error} type="text" value={email} setValue={setEmail} placeholder="Email or username" />
            <Input error={error} type="password" value={password} setValue={setPassword} placeholder="Password" />

            {error && <span className="text-xs text-error w-full text-center">Usernmae or Passwrod incorect</span>}
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
            <ButtonGray width="100%" onClick={handleLogin.bind(this)} ready={readyButton} title="Log in" />
        </div>
    );
};

export default LoginToEmail;
