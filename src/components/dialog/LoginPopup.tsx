import { faChevronLeft, faClose } from '@fortawesome/free-solid-svg-icons';
import { MouseEvent, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../type';
import { slOpenLogin, slSetIsLogin, slSetTypeMode } from '../../store/action/slice/slice';
import { ForgotPassword, Login, SelectionLogin, Signup } from '../login';
import Scrollbars from 'react-custom-scrollbars-2';
import { title } from '../../ultils/app';
import Popup from './Popup';
import { Loading } from '../loading';

const LoginPopup = () => {
    //redux
    const { isOpenLogin } = useSelector((state: RootState) => state.app);
    const { typeMode, isLogin, loginLoading } = useSelector((state: RootState) => state.login);
    const dispatch = useDispatch();

    // state
    const [list, setList] = useState<JSX.Element[]>([<SelectionLogin />]);
    const [loading, setLoading] = useState(loginLoading);

    // variable
    const lastList = list[list.length - 1];

    // handle funtion

    const handleHiddePopup = (e: MouseEvent<HTMLElement>) => {
        dispatch(slOpenLogin());
        e.stopPropagation();
    };

    const handleChageMode = () => {
        if (list.length > 1) {
            setList([<SelectionLogin />]);
            return;
        }

        if (isLogin) {
            dispatch(slSetIsLogin(false));
        } else {
            dispatch(slSetIsLogin(true));
        }
    };

    const handleBack = () => {
        setList(list.slice(0, list.length - 1));
    };

    const setNewList = (item: JSX.Element) => {
        setList([...list, item]);
        dispatch(slSetTypeMode(null));
    };

    // use Effect

    useEffect(() => {
        setList([<SelectionLogin />]);

        if (isOpenLogin) {
            document.title = title.login;
            document.body.style.overflow = 'hidden';
        } else {
            document.title = title.home;
            document.body.style.overflow = 'overlay';
        }
    }, [isOpenLogin, dispatch]);

    useEffect(() => {
        switch (typeMode) {
            case 'suPhone': {
                setNewList(<Signup />);
                break;
            }
            case 'lgphone': {
                setNewList(<Login />);
                break;
            }
            case 'forgotPassword': {
                setNewList(<ForgotPassword />);
                break;
            }
            default:
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typeMode]);

    useEffect(() => {
        setLoading(loginLoading);
    }, [loginLoading]);

    return (
        <Popup width="" slice={slOpenLogin} visible={isOpenLogin}>
            <div className="w-[483px] h-[70vh]  flex flex-col justify-between">
                <div className="flex-1">
                    <Scrollbars
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        autoHide
                    >
                        {lastList}
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
                    <span>{isLogin ? 'Already have an account ?' : "Don't have an account ?"}</span>
                    <span
                        onClick={handleChageMode.bind(this)}
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

            {list.length > 1 ? (
                <span
                    onClick={handleBack.bind(this)}
                    className="absolute top-4 left-4 text-xl cursor-pointer text-gray-500"
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </span>
            ) : (
                ''
            )}

            {loading ? (
                <div className="absolute w-full h-full bg-white-opacity-12 inset-0 flex items-center justify-center">
                    <Loading />
                </div>
            ) : (
                ''
            )}
        </Popup>
    );
};

export default LoginPopup;
