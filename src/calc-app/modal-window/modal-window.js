import React from 'react'
import {connect} from 'react-redux'

import './modal-window.scss'

const ModalWindow = ({ show, errorParts, contactErrors, onOk, appClicked }) => {

    window.onkeydown = (e)=>{
        console.log(e.code)
        if(e.code==='Enter') onOk()
    }

    const errorString = errorParts? errorParts.reduce((res, part, idx, arr)=>{
        const after = idx + 1 === arr.length? '. '
            :  idx + 2 === arr.length? ' и ': ', '
        const movieWord = idx + 1 === arr.length? ' ролика': ''

        res += part==='wannaTypes'? `тип${movieWord}${after}`:
               part==='chrono'? `хронометраж${movieWord}${after}`: 
               part==='languageTypes'? `язык${movieWord}${after}`: 
               part==='serviceTypes'? `требуемые услуги${movieWord}${after}`: 
               part==='auxTypes'? `тип видео${movieWord}${after}`: ''
        console.log('res', res)
        return res
    }, ''): ''

    if(!show)
        return null 

    return (
        <div className='modal-window' onClick={() => { onOk() }}>
            <div className='card' onClick={(e) => { e.stopPropagation() }}>
                <div className='title'>Error</div>
                <div className='text'>
                    {errorParts.length!==0? `Не выбрано: ${errorString}`: null}
                    {contactErrors.emptyFields && `Не заполнена контактная информация.`}
                    {!contactErrors.emptyFields && contactErrors.wrongEmail && contactErrors.wrongMessengers
                        && `Укажите корректный E-mail или телефон/мессенджер.`}
                </div>
                <div
                    className='btn'
                    onClick={() => {
                        onOk()
                        appClicked()
                    }}
                    onKeyDown={(e)=>{
                        console.log(e.target)
                        if(e.target.code==='Enter') onOk()
                    }}
                >
                    OK
                </div>
            </div>

        </div>
    )
}

const mapStateToProps = ({calc})=>({
    show: calc.modalWindow.show,
    errorParts: calc.modalWindow.errorParts,
    contactErrors: calc.modalWindow.contactErrors
})

const mapDispatchToProps = ({
    onOk: ()=>({type: 'CLOSE_WINDOW'}),
    appClicked: ()=>({type: 'APP_CLICKED'})
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow)

