import React from 'react';
import classes from './Modal.module.css';

const Modal = (props) => {
    return (
        <div className={classes.Modal}>
            <div className={classes.ModalContent} style={
                        {width:props.width + '%',
                         height:props.fullscreen ? '100%': props.height,
                         marginLeft:((100 - parseFloat(props.width)) / 2) + '%',
                         marginTop: props.fullscreen ? '0px' : '10%',
                         borderRadius: props.fullscreen ? '0px' : '10px'
                        }
            }>
                {props.children}
            </div>
        </div>
    )
}

export default Modal;
