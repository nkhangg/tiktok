import React from 'react';
import { RootState } from '../../type';
import { useSelector } from 'react-redux';
import Logined from './Logined';
import NonLogin from './NonLogin';

const Setting = () => {
    //redux
    const { isLoggedIn } = useSelector((state: RootState) => state.app);

    return <>{isLoggedIn ? <Logined /> : <NonLogin />}</>;
};

export default Setting;
