import React from 'react';
import PropTypes from 'prop-types';
import css from './hints.module.css';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

const HintComponent = (props) => {
    const hints = props.hints.map(item => {
        return <CSSTransition timeout={300} classNames={{enter: css.itemEnter, enterActive: css.itemEnterActive, exit: css.itemExit, exitActive: css.itemExitActive}} key={item}>
            <li>{item}</li>
        </CSSTransition>
    });

    return (
        <TransitionGroup className={css.hints}>
            {hints}
        </TransitionGroup>

    );
};
HintComponent.propTypes = {
    hints: PropTypes.array
};

export default HintComponent;