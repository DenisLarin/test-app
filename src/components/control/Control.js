import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Button from "../button/Button";
import {getDataByText} from "../../apiService";
import HintComponent from "../hintField/HintComponent";
import css from './control.module.css'
import Input from "../input/Input";

const Control = (props) => {
    const inputRef = React.createRef();

    const [hint, setHint] = useState([]);
    const [textValue, setTextValue] = useState("");

    const cleanButtonHandler = () => {
        inputRef.current.value = "";
    };
    const changeTextButtonHandler = () => {
        inputRef.current.value = "Hello world!"
    };
    const alertButtonHandler = (text = "") => {
        if (!inputRef.current.value)
            return;
        alert(inputRef.current.value);
    };
    const alertIfNumberButtonHandler = () => {
        if (!inputRef.current.value)
            return;

        if (!Number.isNaN(Number(inputRef.current.value))) {
            alertButtonHandler(inputRef.current.value);
        }
    };

    const onTextChangeHandler = (event) => {
        const currentValue = event.target.value;
        setTextValue(currentValue);
        getDataByText(currentValue).then(response => {
            const temp = response.slice(0, props.numberOfHints);
            const total = [];

            for (let item of temp) {
                if (!total.includes(item)) {
                    total.push(item);
                }
            }

            setHint(total);
        }).catch(error => {
            console.log(error);
        })
    };

    let renderItem = null;
    if (props.numberButtons) {
        if (props.isTwoSideBtn && props.numberButtons === 2) {
            renderItem = <>
                <Button name="alert" callback={alertButtonHandler}/>
                <Input placeholder={props.inputPlaceHolder} refLink={inputRef}/>
                <Button name="alert if number" callback={alertIfNumberButtonHandler}/>
            </>;
        } else if (props.numberButtons === 2) {
            renderItem = <>
                <Input placeholder={props.inputPlaceHolder} refLink={inputRef}/>
                <Button name="clean" callback={cleanButtonHandler}/>
                <Button name="change text to 'hello world'" callback={changeTextButtonHandler}/>
            </>;
        } else {
            renderItem = <>
                <Input placeholder={props.inputPlaceHolder} refLink={inputRef}/>
                <Button name="clean" callback={cleanButtonHandler}/>
            </>;
        }
    } else {
        renderItem = <div className={css.control__withHint}><Input value={textValue} onChange={(event => onTextChangeHandler(event))}
                              placeholder={props.inputPlaceHolder}/>
            <HintComponent hints={hint}/></div>
    }
    return (
        <div className={css.control}>
            {renderItem}
        </div>
    );
};
Control.propTypes = {
    inputPlaceHolder: PropTypes.string,
    isTwoSideBtn: PropTypes.bool,
    numberButtons: PropTypes.number,
    numberOfHints: PropTypes.number,
};

export default Control;