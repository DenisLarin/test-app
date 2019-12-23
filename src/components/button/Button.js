import React from 'react';
import PropTypes from 'prop-types';
import css from './button.module.css'

const Button = (props) => {
    return (
        <div className={css.button} onClick={props.callback}>{props.name}</div>
    );
};

Button.propTypes = {
    name: PropTypes.string,
    callback: PropTypes.func
};

export default Button;