import React from 'react';
import PropTypes from 'prop-types';
import css from './input.module.css';

const Input = (props) => {
    return (
        <input className={css.input} type="text" ref={props.refLink} value={props.value} onChange={props.onChange} placeholder={props.placeholder}/>
    );
};

Input.propTypes={
    refLink: PropTypes.object,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string
}
export default Input;