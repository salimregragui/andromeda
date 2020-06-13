import React from 'react';
import classes from './Modal.module.css';
import {motion} from 'framer-motion';

const Modal = (props) => {
    let pageVariants = {
        initial: {
            opacity: 0,
            y: "-100%"
        },
        in: {
            opacity: 1,
            y: 0
        },
        out: {
            opacity: 0,
            y: "-100%"
        }
    }

    let pageTransition = {
        type: "tween",
        duration: 0.4
    }
    return (
        <div className={classes.Modal}>
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className={classes.ModalContent} style={
                        {width:props.width + '%',
                        height:props.fullscreen ? '100%': props.height,
                        marginLeft:((100 - parseFloat(props.width)) / 2) + '%',
                        marginTop: props.fullscreen ? '0px' : '10%',
                        borderRadius: props.fullscreen ? '0px' : '10px'
                        }
            }>
                {props.children}
            </motion.div>
        </div >
    )
}

export default Modal;
