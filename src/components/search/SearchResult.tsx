import React from 'react';

interface SearchResultProps {
    title: string;
    dark: boolean;
    view?: boolean;
}

const SearchResult = ({ title, dark, view }: SearchResultProps) => {
    return (
        <div
            className={`text-[16px] ${dark ? 'text-white' : 'text-black hover:bg-[rgba(22,24,35,0.03)]'} 
            px-4 py-[15px]  flex gap-2 font-[600] items-center cursor-pointer`}
        >
            <span className="w-full overflow-hidden pr-10 whitespace-nowrap">
                {view ? `View all results for"${title}"` : title}
            </span>
        </div>
    );
};

export default SearchResult;
