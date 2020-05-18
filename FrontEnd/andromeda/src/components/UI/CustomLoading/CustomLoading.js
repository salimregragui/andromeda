import React from 'react';
import classes from './CustomLoading.module.css';

const CustomLoading = (props) => {
    return (
        <div className={classes.CustomLoading} style={
            {
                width: props.width, 
                height: props.height,
                marginLeft: props.marginLeft,
                marginBottom: props.marginBottom,
                marginTop: props.marginTop,
                float: props.float
            }
        }>
            
        </div>
    )
}

export default CustomLoading;
