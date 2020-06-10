import React from 'react'
import {connect} from 'react-redux'

import VideoTypes from './VideoTypes'

import './video-calc.scss'

const VideoCalc = ({wannaTypes, auxTypes, budgetTypes, serviceTypes})=>{
    return(
        <div className={`video-calc`}>
            <VideoTypes question={`Какой ролик Вы хотите сделать?`} types={wannaTypes} typePanel={`wannaTypes`}/>
            <VideoTypes question={`Выберите тип видео.`} types={auxTypes} typePanel={`auxTypes`}/>
            <VideoTypes question={`Ожидаемый бюджет:`} types={budgetTypes} typePanel={`budgetTypes`}/>
            <VideoTypes question={`Отметьте услуги, которые Вам понадобятся? Не отмечайте услуги, которые планируете взять на себя.`}
                types={serviceTypes} typePanel={`serviceTypes`}/> 
        </div>
    )
}

const mapStateToProps = ({calc})=>({
    wannaTypes: calc.wannaTypes,
    auxTypes: calc.auxTypes,
    budgetTypes: calc.budgetTypes,
    serviceTypes: calc.serviceTypes
})

export default connect(mapStateToProps)(VideoCalc)