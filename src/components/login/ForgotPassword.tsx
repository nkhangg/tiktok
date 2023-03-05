import React, { useState } from 'react';
import { ResetWithEmail, ResetWithPhone } from '.';

const ForgotPassword = () => {
    const [phone, setPhone] = useState(true);

    const handleChageMethodSign = () => {
        setPhone((prev) => !prev);
    };
    return (
        <div className="flex flex-col px-[54px]">
            <h1 className="text-[32px] font-bold text-center my-4">Reset password</h1>

            <div className="flex flex-col gap-4">
                <div>
                    <div className="flex justify-between items-center mb-[5px]">
                        <h4 className="font-semibold text-16 mb-1 text-white-opacity">
                            {phone ? 'Enter phone number' : 'Enter email address'}
                        </h4>
                        <p
                            onClick={handleChageMethodSign.bind(this)}
                            className="text-xs font-medium text-white-opacity-75 hover:underline 
                            cursor-pointer"
                        >
                            {phone ? 'Reset with email' : 'Reset with phone number'}
                        </p>
                    </div>

                    {phone ? <ResetWithPhone /> : <ResetWithEmail />}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
