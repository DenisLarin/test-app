import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Button from "../button/Button";
import {getDataByText} from "../../apiService";
import HintComponent from "../hintField/HintComponent";
import css from './control.module.css'
import Input from "../input/Input";
import Error from "../error/Error";
import CleanButton from "../button/cleanButton/CleanButton";

const Control = (props) => {
    //использую, для того чтобы не перерендеривать компоненты (при дейсвиях с кнопками)
    const inputRef = React.createRef();

    //state
    const [hint, setHint] = useState([]);
    //для отслеживания нажатия на кнопку использую состояние текста (вызывается перерендр тестового поля)
    const [textValue, setTextValue] = useState("");
    // информация об ошибке
    const [error, setError] = useState("");

    //изменение текста на hello world
    const changeTextButtonHandler = () => {
        inputRef.current.value = "Hello world!"
    };
    //вызов alert
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
    //вызов alert если число
    const alertIfNumberButtonHandler = () => {
        if (!inputRef.current.value || inputRef.current.value.indexOf(" ") !== -1) {
            setError("введите значение или удалите из строки пробелы");
            return;
        }
        if (!Number.isNaN(Number(inputRef.current.value))) {
            alertButtonHandler(inputRef.current.value);
        } else {
            setError("не удалось преобразовать в число")
        }
    };

    //изменение текста в inputField
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
                setError(error);
            })
        }
    };

    //формирование компонента для отображения
    let renderItem = null;
    if (props.numberButtons) {
        if (props.isTwoSideBtn && props.numberButtons === 2) {
            renderItem = <>
                <Button name="alert" callback={alertButtonHandler}/>
                <Input onChange={onTextChangeHandler} placeholder={props.inputPlaceHolder} refLink={inputRef}/>
                <Button name="alert if number" callback={alertIfNumberButtonHandler}/>
            </>;
        } else if (props.numberButtons === 2) {
            renderItem = <>
                <Input placeholder={props.inputPlaceHolder} refLink={inputRef}/>
                <CleanButton inputRef={inputRef}/>
                <Button name="change text to 'hello world'" callback={changeTextButtonHandler}/>
            </>;
        } else {
            renderItem = <>
                <Input placeholder={props.inputPlaceHolder} refLink={inputRef}/>
                <CleanButton inputRef={inputRef}/>
            </>;
        }
    } else {
        renderItem = <div className={css.control__withHint}><Input value={textValue}
                                                                   onChange={(event => onTextChangeHandler(event,true))}
                                                                   placeholder={props.inputPlaceHolder}/>
            {textValue ? <HintComponent hints={hint}/> : null}
        </div>
    }
    return (
        <div className={css.control}>
            {renderItem}
            {error ? <Error error={error}/> : null}
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