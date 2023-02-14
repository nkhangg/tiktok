import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../type';
import LoginItem from '../login/LoginItem';
import { logins, signups } from '../../ultils/login';
import { slOpenLogin } from '../../store/action/slice/slice';
import { Popup } from '.';
import { title } from '../../ultils/app';

const LoginPopup = () => {
    //redux
    const { isOpenLogin } = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();

    // state
    const [listLogins, setListLogins] = useState(logins);
    const [isLogin, setIsLogin] = useState(true);

    // handle funtion
    const handleChageLogin = () => {
        setIsLogin((prev) => !prev);
        if (isLogin) {
            setListLogins(logins);
        } else {
            setListLogins(signups);
        }
    };

    // use Effect

    useEffect(() => {
        if (isOpenLogin) {
            document.title = title.login;
        } else {
            document.title = title.home;
        }
    }, [isOpenLogin]);

    return (
        <Popup slice={slOpenLogin} visible={isOpenLogin}>
            <span
                onClick={(e) => {
                    e.stopPropagation();
                    dispatch(slOpenLogin());
                }}
                className="absolute w-[40px] h-[40px] bg-[rgba(22,24,35,0.03)] flex items-center justify-center
                    rounded-full text-2xl cursor-pointer top-6 right-6"
            >
                <FontAwesomeIcon icon={faClose} />
            </span>

            <div className={`overflow-hidden h-full`}>
                <div className="px-[50px]">
                    <h1 className="my-4 text-[32px] font-bold w-[375px] text-center">
                        {isLogin ? 'Sign up for TikTok' : 'Login to Tiktok'}
                    </h1>
                    {listLogins.map((item) => {
                        return <LoginItem key={item.title} title={item.title} icon={item.icon} />;
                    })}
                </div>
            </div>
            <div
                className="flex gap-2 items-center justify-center h-[64px] absolute bottom-0 left-0 right-0 border
                 border-gray-200 rounded-b-md"
            >
                <span>{isLogin ? "Don't have an account ?" : 'Already have an account ?'}</span>
                <span
                    onClick={handleChageLogin.bind(this)}
                    className="text-[#fe2c55] font-bold hover:underline cursor-pointer"
                >
                    {isLogin ? 'Log in' : 'Sign up'}
                </span>
            </div>
        </Popup>
    );
};

export default LoginPopup;
