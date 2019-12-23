import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Button from "../button/Button";
import {getDataByText} from "../../apiService";
import HintComponent from "../hintField/HintComponent";
import css from './control.module.css'
import Input from "../input/Input";
import Error from "../error/Error";

const Control = (props) => {
    const inputRef = React.createRef();

    const [hint, setHint] = useState([]);
    const [textValue, setTextValue] = useState("");
    const [error, setError] = useState("");

    const cleanButtonHandler = () => {
        inputRef.current.value = "";
    };
    const changeTextButtonHandler = () => {
        inputRef.current.value = "Hello world!"
    };
    const alertButtonHandler = (text = "") => {
        if (!inputRef.current.value) {
            setError("введите значение в строку");
            return;
        }
        if (error) {
            setError("");
        }
        alert(inputRef.current.value);
    };
    const alertIfNumberButtonHandler = () => {
        if (!inputRef.current.value || inputRef.current.value.indexOf(" ") !== -1) {
            setError("введите значение или удалите из строки пробелы");
            return;
        }
        if (error) {
            setError("");
        }
        if (!Number.isNaN(Number(inputRef.current.value))) {
            alertButtonHandler(inputRef.current.value);
        } else {
            setError("не удалось преобразовать в число")
        }
    };

    const onTextChangeHandler = (event, isSearch = false) => {
        if (!isSearch) {
            if (error) {
                setError("");
            }
        } else {
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
        }
    };

    let renderItem = null;
    if (props.numberButtons) {
        if (props.isTwoSideBtn && props.numberButtons === 2) {
            renderItem = <>
                <Button name="alert" callback={alertButtonHandler}/>
                <Input onChange={onTextChangeHandler} placeholder={props.inputPlaceHolder} refLink={inputRef}/>
                <Button name="alert if number" callback={alertIfNumberButtonHandler}/>
                <Error error={error}/>
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
        renderItem = <div className={css.control__withHint}><Input value={textValue}
                                                                   onChange={(event => onTextChangeHandler(event,true))}
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