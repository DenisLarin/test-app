import React from 'react';
import './App.css';
import Control from "./components/control/Control";

function App() {
    return (
        <div>
            <section className="section-controls">
                <h1>Контролы с кнопками</h1>
                {/*
          <Контрол с 1 кнопкой справа.
            При нажатии на кнопку очищается содерживое в контроле. />
          <Контрол с 2 кнопками справа.
            При нажатии на первую кнопку очищается содерживое в контроле.
            При нажатии на вторую кнопку текст в контроле меняется на 'Hello world!'. />
          <Контрол с 1 кнопкой справа и 1 кнопкой слева.
            При нажатии на кнопку справа вызывается alert с текстом в контроле.
            При нажатии на кнопку слева проверяем, что в контроле введено число и если это так, то выводим число через alert />
        */}


                <Control isTwoSideBtn={false} numberButtons={1} inputPlaceHolder="control 1"/>
                <Control isTwoSideBtn={false} numberButtons={2} inputPlaceHolder="control 2"/>
                <Control isTwoSideBtn={true} numberButtons={2} inputPlaceHolder="control 3"/>
            </section>
            <section className="section-controls">
                <h1>Контролы с подсказками</h1>
                {/*
          <Контрол с выводом подсказок при наборе текста. Максимально кол-во посдказок - 3 />
          <Контрол с выводом подсказок при наборе текста. Максимально кол-во посдказок - 10 />
        */}
        <Control inputPlaceHolder="Search field 1" numberOfHints={3}/>
        <Control inputPlaceHolder="Search field 2" numberOfHints={10}/>
            </section>
        </div>
    );
}

export default App;
