import React, { useState } from 'react';
import { SignToEmail, SignToPhone } from '.';
import { range } from '../../ultils/app';
import { months } from '../../ultils/login';
import { ButtonOption } from '../button';

const Signup = () => {
    // useState
    const [isLoginToPhone, setIsLoginToPhone] = useState(true);

    // handle funtion

    const handleChageMethodSign = () => {
        setIsLoginToPhone((prev) => !prev);
    };

    return (
        <div className="flex flex-col px-[54px]">
            <h1 className="text-[32px] font-bold text-center my-4">Sign up</h1>

            <div className="flex flex-col gap-4">
                <div className="">
                    <h4 className="font-semibold text-16 mb-1 text-white-opacity">When’s your birthday?</h4>

                    <div className="flex gap-2">
                        <ButtonOption type="month" initContent="Month" listContent={months} />
                        <ButtonOption type="day" initContent="Day" listContent={range(30)} />
                        <ButtonOption
                            type="year"
                            initContent="Year"
                            listContent={range(new Date().getFullYear(), 1990)}
                        />
                    </div>
                    <span className="text-sm text-white-opacity-50 leading-5 mb-4">
                        Your birthday won't be shown publicly.
                    </span>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-[5px]">
                        <h4 className="font-semibold text-16 mb-1 text-white-opacity">
                            {isLoginToPhone ? 'Phone' : 'Email'}
                        </h4>
                        <p
                            onClick={handleChageMethodSign.bind(this)}
                            className="text-xs font-medium text-white-opacity-75 hover:underline 
                        cursor-pointer"
                        >
                            {isLoginToPhone ? 'Sign up with email' : 'Sign up with phone'}
                        </p>
                    </div>

                    {isLoginToPhone ? <SignToPhone /> : <SignToEmail />}
                </div>
            </div>
        </div>
    );
};

export default Signup;
