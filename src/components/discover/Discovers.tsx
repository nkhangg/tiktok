import React from 'react';
import { discover } from '../../ultils/navbar';
import Discover from './Discover';

const Discovers = () => {
    return (
        <div className="p-2 flex flex-wrap pt-4 pb-0">
            {discover.map((item) => {
                return <Discover key={item.title} title={item.title} music={item.music} hastag={item.hastag} />;
            })}
        </div>
    );
};

export default Discovers;
