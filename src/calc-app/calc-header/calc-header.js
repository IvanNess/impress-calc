import React from 'react'

import './calc-header.scss'

const CalcHeader = ()=>{
    return(
        <div className={`calc-header`}>
            <div className={`title`}>
                <h1>Просчет стоимости видеоролика</h1>
            </div>
            <div className={`description`}>
                <p>Заполните анкету и узнайте примерную стоимость видеоролика.</p>
            </div>
            <div className={`text`}>
                <p>
                    Мы создали интерактивную форму для вашего удобства. Но пока она работает в тестовом режиме и может выдавать
                    не совсем точные результаты. Мы рекомендуем оставить свои контактные данные, чтобы мы смогли проанализировать
                    Ваш запрос и выслать максимально корректную сумму.
                </p>
            </div>
        </div>
    )
}

export default CalcHeader