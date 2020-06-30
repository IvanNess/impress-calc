import React from 'react'
import {connect} from 'react-redux'

import VideoTypes from './VideoTypes'
import ConnectTypes from './connect-types'

import './video-calc.scss'

const VideoCalc = ({wannaTypes, languageTypes, auxTypes, budgetTypes, serviceTypes, connectTypes, clicked, prevAuxType, prevLanguageType})=>{

    const serviceTypesShow =  clicked.auxTypes.length !==0 

    return(
        <div className={`video-calc`}>
            <VideoTypes question={`Какой ролик Вы хотите сделать?`} types={wannaTypes} typePanel={`wannaTypes`}/>
            <VideoTypes question={`Выберите тип видео.`} types={auxTypes} typePanel={`auxTypes`}/>
            <VideoTypes question={`Какой хронометраж?`} types={serviceTypes} typePanel={`chrono`}/>
            <VideoTypes question={`На каком языке?`} types={languageTypes} typePanel={`languageTypes`}/>
            <VideoTypes question={`Ожидаемый бюджет:`} types={budgetTypes} typePanel={`budgetTypes`}/>
            <VideoTypes question={`Отметьте услуги, которые Вам понадобятся? Не отмечайте услуги, которые планируете взять на себя.`}
                types={serviceTypes} typePanel={`serviceTypes`} show={serviceTypesShow} 
                prevAuxType={prevAuxType} clickedAuxTypes={clicked.auxTypes} prevLanguageType={prevLanguageType} clickedLanguageTypes={clicked.languageTypes}/>
            <ConnectTypes question={`Контактная информация`} types={connectTypes}/>
        </div>
    )
}

const mapStateToProps = ({calc})=>({
    wannaTypes: calc.wannaTypes,
    languageTypes: calc.languageTypes,
    auxTypes: calc.auxTypes,
    budgetTypes: calc.budgetTypes,
    serviceTypes: calc.serviceTypes,
    connectTypes: calc.connectTypes,
    clicked: calc.clicked,
    prevAuxType: calc.prevAuxType,
    prevLanguageType: calc.prevLanguageType
})

export default connect(mapStateToProps)(VideoCalc)