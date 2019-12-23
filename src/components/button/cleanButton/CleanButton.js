import React from 'react';
import Button from "../Button";
import PropTypes from 'prop-types';

const CleanButton = (props) => {
    const cleanButtonHandler = () => {
        props.inputRef.current.value = "";
    };
    return (
        <Button name="clean" callback={cleanButtonHandler}/>
    );
};
CleanButton.propTypes ={
    inputRef: PropTypes.object
};

export default CleanButton;