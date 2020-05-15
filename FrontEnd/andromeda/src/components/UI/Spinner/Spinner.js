import React from 'react';
import classes from './Spinner.module.css';

const Spinner = () => (
    <div className={classes.Spinner}>
        <div className={classes.Loader}>Loading...</div>
    </div>
);

export default Spinner;
