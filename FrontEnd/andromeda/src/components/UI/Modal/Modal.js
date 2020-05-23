import React from 'react';
import classes from './Modal.module.css';

const Modal = (props) => {
    return (
        <div className={classes.Modal}>
            <div className={classes.ModalContent} style={
                        {width:props.width + '%',
                         height:props.height,
                         marginLeft:((100 - parseFloat(props.width)) / 2) + '%'
                        }
            }>
                {props.children}
            </div>
        </div>
    )
}

export default Modal;
