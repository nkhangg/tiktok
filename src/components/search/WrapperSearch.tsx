import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../type';
import SearchResult from './SearchResult';
import Scrollbars from 'react-custom-scrollbars-2';
import { ResponceAccount } from '../../interface';
import { Account } from '../accounts';

interface WrapperSearchProps {
    valueSearch: string;
    data: ResponceAccount[];
}

const WrapperSearch = ({ valueSearch, data }: WrapperSearchProps) => {
    const { darkMode } = useSelector((state: RootState) => state.app);

    return (
        <div
            className={`w-[361px] shadow-lg ${darkMode ? 'bg-black' : 'bg-white'} pt-2
            rounded-md overflow-hidden
    `}
        >
            <Scrollbars style={{ width: '100%', height: 228 }}>
                <div className="flex flex-col justify-between h-full">
                    <div>
                        <span className="py-[5px] px-[12px] h-[30px] text-[14px] w-full flex">Accounts</span>
                        {data?.map((item) => {
                            return (
                                <Account
                                    key={item.id}
                                    nickname={item.nickname}
                                    fullname={item.full_name}
                                    image={item.avatar}
                                    tick={item.tick}
                                />
                            );
                        })}
                    </div>
                    {valueSearch.length > 0 ? <SearchResult view title={valueSearch} dark={darkMode} /> : ''}
                </div>
            </Scrollbars>
        </div>
    );
};

export default WrapperSearch;
