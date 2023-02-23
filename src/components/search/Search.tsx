import React from 'react';
import { useRef, useState, ChangeEvent, useEffect } from 'react';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { RootState } from '../../type';
import Tippy from '@tippyjs/react/headless';
import useDebounce from '../../hook/useDebounce';
import MiniLoanding from '../loading/MiniLoanding';
import WrapperSearch from './WrapperSearch';
import { ResponceAccount } from '../../interface';
import { apiSearch } from '../../api/app';
const Search = () => {
    //redux
    const { darkMode } = useSelector((state: RootState) => state.app);

    // ref
    const refInput = useRef<HTMLInputElement>(null);

    // state
    const [hideClose, setHideClose] = useState<boolean>(false);
    const [values, setValues] = useState<string>('');
    const [listSearch, setListSearch] = useState<ResponceAccount[]>([]);
    const [hideSearch, setHideSearch] = useState(false);
    const [loading, setLoading] = useState(true);

    // useDebounce
    const valueDebounce = useDebounce(values, 500);

    // handle event
    const handleValueSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setValues(e.target.value);
    };

    const handleClose = () => {
        setValues('');
        setListSearch([]);
        if (refInput.current) {
            refInput.current.focus();
        }
    };

    const handleClickHide = () => {
        valueDebounce !== '' ? setHideSearch(true) : setHideSearch(false);
    };

    // axios funtion
    const fetchValues = async () => {
        if (valueDebounce.trim() === '') return;

        setLoading(true);
        // const responce = await axios.get(
        //     `https://tiktok.fullstack.edu.vn/api/users/search?q=${valueDebounce}&type=less`,
        // );

        const responce = await apiSearch(valueDebounce);

        setListSearch(responce);
        setLoading(false);
    };

    // Effect
    useEffect(() => {
        if (values.length > 0) {
            setHideClose(true);
            setHideSearch(true);
        } else {
            setHideClose(false);
            setHideSearch(false);
        }
    }, [values]);

    useEffect(() => {
        fetchValues();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueDebounce]);

    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className={`w-[361px] h-[46px] ${
                darkMode
                    ? 'bg-[rgba(255,255,255,0.12)] text-[rgba(255,255,255,0.4)]'
                    : 'bg-[#f1f1f2] text-[#a7a7ab] focus-within:border-gray-400'
            } rounded-full flex justify-between items-center 
            px-4 pr-0 font-[400] overflow-hidden border border-transparent `}
        >
            <>
                <Tippy
                    interactive
                    onClickOutside={() => setHideSearch(false)}
                    visible={hideSearch}
                    offset={[0, 20]}
                    placement={'top-start'}
                    render={(attrs) => (
                        <div {...attrs} className={`translate-x-[-4%]`}>
                            <WrapperSearch data={listSearch} valueSearch={values} />
                        </div>
                    )}
                >
                    <div className="flex items-center relative">
                        <input
                            onClick={handleClickHide.bind(this)}
                            ref={refInput}
                            spellCheck={false}
                            className="outline-none w-[292px] h-[22px] bg-transparent caret-pink-500 text-[16px] 
                            leading-3 pr-12"
                            placeholder="Search accounts and videos"
                            type="text"
                            onChange={handleValueSearch}
                            value={values}
                        />
                        {hideClose ? (
                            <span onClick={handleClose} className="absolute right-4 cursor-pointer">
                                {loading ? <MiniLoanding /> : <FontAwesomeIcon icon={faCircleXmark} />}
                            </span>
                        ) : (
                            ''
                        )}
                    </div>
                </Tippy>
            </>
            <span
                className={`${darkMode ? 'bg-[rgba(255,255,255,0.4)]' : 'bg-gray-300'} h-[60%] w-[1px] mr-[1px]`}
            ></span>
            <button
                type="submit"
                className="w-[52px] h-full text-[20px] 
                flex items-center justify-center hover:bg-[#eaeaeb]"
            >
                <FontAwesomeIcon size="1x" icon={faMagnifyingGlass} />
            </button>
        </form>
    );
};

export default Search;
