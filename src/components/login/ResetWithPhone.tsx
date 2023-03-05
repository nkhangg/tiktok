import React, { useState } from 'react';
import { ButtonGray, ButtonSendCode } from '../button';
import { Input, InputPhoneNumber } from '../input';

const ResetWithEmail = () => {
    // state

    // state value
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');

    // handle funtion

    return (
        <div className="flex flex-col gap-2">
            <InputPhoneNumber value={phone} setValue={setPhone} />
            <ButtonSendCode value={code} setValue={setCode} />
            <Input type="password" value={password} setValue={setPassword} placeholder="Password" />

            <ButtonGray className="w-full mt-[21px]" title="Log in" />
        </div>
    );
};

export default ResetWithEmail;
