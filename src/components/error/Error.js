import React from 'react';
import PropTypes from 'prop-types';
const Error = (props) => {
    return (
        <span style={{color: "red", display: "block", width: "100%", ...props.style}}>{props.error}</span>
    );
};
Error.propTypes ={
    error: PropTypes.string
}
export default Error;