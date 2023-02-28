import { faChevronLeft, faClose } from '@fortawesome/free-solid-svg-icons';
import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../type';
import { logins, signups, moreSignups } from '../../ultils/login';
import { slOpenLogin, slSetSignWithUsername } from '../../store/action/slice/slice';
import { SelectionLogin, Signup } from '../login';
import { Logins } from '../../interface';
import Scrollbars from 'react-custom-scrollbars-2';
import { title } from '../../ultils/app';
import Popup from './Popup';

const LoginPopup = () => {
    //redux
    const { isOpenLogin } = useSelector((state: RootState) => state.app);
    const { signUsername } = useSelector((state: RootState) => state.login);
    const dispatch = useDispatch();

    // state
    const [listLogins, setListLogins] = useState<Logins[]>(logins);
    const [isLogin, setIsLogin] = useState(false);

    // handle funtion
    const handleChageLogin = () => {
        setIsLogin((prev) => !prev);
        dispatch(slSetSignWithUsername(false));
        if (isLogin) {
            setListLogins(logins);
        } else {
            setListLogins(signups);
        }
    };

    // handle funtion
    const handleMoreListSign = useCallback(() => {
        setListLogins([...listLogins, ...moreSignups]);
    }, [listLogins]);

    const handleHiddePopup = (e: MouseEvent<HTMLElement>) => {
        dispatch(slOpenLogin());
        e.stopPropagation();
    };

    // use Effect

    useEffect(() => {
        // dispatch a action to back to list login or sign
        dispatch(slSetSignWithUsername(false));

        if (isOpenLogin) {
            document.title = title.login;
            document.body.style.overflow = 'hidden';
        } else {
            document.title = title.home;
            document.body.style.overflow = 'auto';
        }
    }, [isOpenLogin, dispatch]);

    return (
        <Popup slice={slOpenLogin} visible={isOpenLogin}>
            <div className="w-full h-[70vh]  flex flex-col justify-between">
                <div className="flex-1">
                    <Scrollbars
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        autoHide
                    >
                        {!signUsername ? (
                            <SelectionLogin onClickMore={handleMoreListSign} listItem={listLogins} isLogin={isLogin} />
                        ) : (
                            ''
                        )}
                        {signUsername ? <Signup /> : ''}
                    </Scrollbars>
                </div>

                {isLogin ? (
                    <div className="px-[54px] text-[12px] text-white-opacity-50 text-center py-4">
                        <span>By continuing, you agree to TikTok’s </span>
                        <span className="font-bold hover:underline cursor-pointer">Tems of Service </span>
                        <span>and comfirm that you have read TikTok's </span>
                        <span className="font-bold hover:underline cursor-pointer">Privacy Policy</span>
                    </div>
                ) : (
                    ''
                )}
                <div
                    className="h-16 flex items-center justify-center border-t
                 border-t-white-opacity-12 gap-2 text-[15px]"
                >
                    <span>{isLogin ? "Don't have an account ?" : 'Already have an account ?'}</span>
                    <span
                        onClick={handleChageLogin.bind(this)}
                        className="text-primary font-bold cursor-pointer hover:underline"
                    >
                        {isLogin ? 'Log in' : 'Sign up'}
                    </span>
                </div>
            </div>

            <div
                onClick={handleHiddePopup.bind(this)}
                className="absolute top-6 text-2xl rounded-full right-6 w-10 h-10 bg-white-opacity-03
            cursor-pointer flex items-center justify-center text-gray-700"
            >
                <FontAwesomeIcon icon={faClose} />
            </div>

            {signUsername ? (
                <span
                    onClick={() => {
                        dispatch(slSetSignWithUsername(false));
                    }}
                    className="absolute top-4 left-4 text-xl cursor-pointer text-gray-500"
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </span>
            ) : (
                ''
            )}
        </Popup>
    );
};

export default LoginPopup;
