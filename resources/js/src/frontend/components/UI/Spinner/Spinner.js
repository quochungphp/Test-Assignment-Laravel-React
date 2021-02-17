import React from 'react';

import './Spinner.css';

export const Spinner = ({show}) => (
    <div id="overlayLoader" style={{ display: show == true ? "block" : "none"}}>
        <div className="Loader">Loading...</div>
    </div>
);

export const SpinnerDot = ({ show }) => (
    <div id="overlayLoader" style={{ display: show == true ? "block" : "none" }}>
        <div className="loading">
            <div className="dot-pulse"></div>
        </div>
    </div>
);
