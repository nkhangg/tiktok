import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { slSetTypeMode } from '../../store/action/slice/slice';
import { ButtonGray, ButtonSendCode } from '../button';
import { Input, InputPhoneNumber } from '../input';

const LoginToPhone = () => {
    // state
    const [loginPassword, setLoginPassword] = useState(false);

    // redux
    const dispatch = useDispatch();

    // state value
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');

    // handle funtion

    const handleClickChange = () => {
        setLoginPassword(true);
        if (loginPassword) {
            //handle forgot password
            dispatch(slSetTypeMode('forgotPassword'));
        }
    };
    return (
        <div className="flex flex-col gap-2">
            <InputPhoneNumber value={phone} setValue={setPhone} />
            {!loginPassword && <ButtonSendCode value={code} setValue={setCode} />}
            {loginPassword && <Input type="password" value={password} setValue={setPassword} placeholder="Password" />}
            <div className="mb-[21px]">
                <div className="flex items-center gap-3">
                    <span
                        onClick={handleClickChange.bind(this)}
                        className="font-bold hover:underline text-xs text-white-opacity-75 
                    cursor-pointer "
                    >
                        {!loginPassword ? 'Log in with password' : 'Forgot password?'}
                    </span>
                    {loginPassword && <span className="h-[10px] w-[1px] bg-gray-300"></span>}
                    {loginPassword && (
                        <span
                            onClick={() => setLoginPassword(false)}
                            className="font-bold hover:underline text-xs text-white-opacity-75 
                    cursor-pointer "
                        >
                            Log in with code
                        </span>
                    )}
                </div>
            </div>
            <ButtonGray width="100%" title="Log in" />
        </div>
    );
};

export default LoginToPhone;
