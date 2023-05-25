import React from 'react';

interface ToggleProps {
    setChecked: (value: boolean) => void;
}

const Toggle = ({ setChecked }: ToggleProps) => {
    return (
        <div className="checkbox-wrapper-6">
            <input
                onChange={(e) => setChecked(e.target.checked)}
                className="tgl tgl-light"
                id="cb1-6"
                type="checkbox"
            />
            <label className="tgl-btn" htmlFor="cb1-6"></label>
        </div>
    );
};

export default Toggle;
