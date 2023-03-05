import React, { useState } from 'react';
import { ButtonGray, ButtonSendCode } from '../button';
import { Input } from '../input';
const ResetWithEmail = () => {
    // state value
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className="flex flex-col gap-2">
            <Input placeholder="Email address" type="email" value={email} setValue={setEmail} />
            <ButtonSendCode value={code} setValue={setCode} />
            <Input type="password" value={password} setValue={setPassword} placeholder="Password" />

            <ButtonGray className="w-full mt-[21px]" title="Log in" />
        </div>
    );
};

export default ResetWithEmail;
