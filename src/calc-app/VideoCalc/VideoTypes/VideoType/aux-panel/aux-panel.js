import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'

import './aux-panel.scss'

const AuxPanel = ({
    isSelected,
    open,
    value,
    stringCode,
    auxPanel, //все параметры вспомогательной панели
    setChosen,
    setOpen,
    setValue,
    setUnfocused,
    appClicked,
    focused, 
    error
}) => {

    const [showHide, setShowHide] = useState('hide')

    const [first, setFirst] = useState(true)

    const inputRef = useRef(null)

    useEffect(() => {
        console.log('IS_SELECTED', isSelected, stringCode)
        if (isSelected) {
            setFirst(false)
            setShowHide('show')
            if(stringCode!=='nomoresec')
                inputRef.current.focus()
            console.log('FOCUSED')
        } else {
            setShowHide('hide')
        }
    }, [isSelected, stringCode])

    useEffect(() =>{
        console.log("FOCUS_CHANGED", focused, stringCode)
        if(focused){
            inputRef.current.focus()
        }
    }, [focused])

    const isAlone = auxPanel.params.length === 1

    return (
        <div className={`aux-panel ${first && 'first'} ${showHide} ${stringCode}`}>
            <div className={`input`} >
                <input type='text' ref={inputRef} className={error? 'error': ''}
                    onChange={(e)=>{
                        //e.stopPropagation()
                        setValue(stringCode, e.target.value)
                    }}
                    value={value}
                    onClick={
                        (e)=>{
                            e.stopPropagation()
                            appClicked(true)
                        }
                    }
                    onBlur={(e)=>{
                        if(focused) setUnfocused()
                    }}
                />
            </div>
            <div className={`choice-panel `}>
                <div className={`selected ${open && `open`} ${isAlone? 'alone': ''}`} onClick={(e) => { 
                        //!isAlone && e.stopPropagation()
                        e.stopPropagation()
                        if(!isAlone){
                            console.log('SET_OPEN_CLICKED', stringCode)
                            return setOpen(stringCode) 
                        }
                        //appClicked()
                        inputRef.current.focus()
                    }}
                >
                    {auxPanel.types[auxPanel.chosen].name}
                </div>
                {open && !isAlone && <div className={`choices`}>
                    {auxPanel.params.map(param => {
                        return (
                            <div
                                className={`param ${param === auxPanel.chosen && 'chosen'}`}
                                key={param}
                                onClick={(e) => {
                                        e.stopPropagation()
                                        setChosen(stringCode, param)
                                        inputRef.current.focus()
                                    }
                                }
                            >
                                {auxPanel.types[param].name}
                            </div>
                        )
                    })}
                </div>}
            </div>

        </div>
    )
}

const mapDispatchToProps = ({
    setChosen: (stringCode, param) => ({ type: 'SET_CHOSEN', payload: { stringCode, param } }),
    setOpen: (stringCode)=>({type: 'SET_AUX_OPEN', payload: {stringCode}}),
    setValue: (stringCode, value)=>({type: 'SET_VALUE', payload: {value, stringCode}}),
    setUnfocused: ()=>({type: 'SET_UNFOCUSED'}),
    appClicked: (isInput)=>({type: 'CALC_APP_CLICKED', payload: {isInput}})
})

export default connect(null, mapDispatchToProps)(AuxPanel)
