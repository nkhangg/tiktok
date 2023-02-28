import React, { useState } from 'react';
import { ButtonGray, ButtonSendCode } from '../button';
import { InputPhoneNumber } from '../input';

const SignToPhone = () => {
    const [phone, setPhone] = useState('');
    const [codePhone, setCodePhone] = useState('');
    return (
        <div className="flex gap-3 flex-col">
            <InputPhoneNumber value={phone} setValue={setPhone} />
            <ButtonSendCode value={codePhone} setValue={setCodePhone} />
            <ButtonGray title="Next" width="100%" />
        </div>
    );
};

export default SignToPhone;
