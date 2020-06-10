import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import './aux-panel.scss'

const AuxPanel = ({
    isSelected,
    open,
    auxPanel, //все параметры вспомогательной панели
    setChosen,
    setOpen,



    clicked, //
    show, //виден список или нет
    params, // коды возможных вариантов выбора выпадающего списка
    stringCode, // код выпадающего списка
    auxPanelsSelected, // коды выделенных вариантов во всех списках
    setAuxPanelsSelected, // функция для установки выбранного варианта списка
    auxPanelsTypes, // все возможные варианты для выпадающего списка
    chosen //код, выбранного варианта
}) => {

    const [showHide, setShowHide] = useState('hide')
    //const [open, setOpen] = useState(false)

    const [first, setFirst] = useState(true)

    useEffect(() => {
        if (isSelected) {
            setFirst(false)
            setShowHide('show')
        } else {
            setShowHide('hide')
        }
    }, [isSelected])

    console.log('auxpanel', auxPanel, auxPanel.open)

    const isAlone = auxPanel.params.length === 1

    return (
        <div className={`aux-panel ${first && 'first'} ${showHide}`}>
            <div className={`input`}>
                <input type='text' />
            </div>
            <div className={`choice-panel `}>
                <div className={`selected ${open && `open`} ${isAlone? 'alone': ''}`} onClick={() => { setOpen(stringCode) }}>
                    {auxPanel.types[auxPanel.chosen].name}
                </div>
                {open && !isAlone && <div className={`choices`}>
                    {auxPanel.params.map(param => {
                        return (
                            <div
                                className={`param ${param === auxPanel.chosen && 'chosen'}`}
                                key={param}
                                onClick={() => {
                                        setChosen(stringCode, param)
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

const mapStateToProps = ({ calc }) => ({
    auxPanelsSelected: calc.auxPanelsSelected,
    auxPanelsTypes: calc.auxPanelsTypes
})

const mapDispatchToProps = ({
    setChosen: (stringCode, param) => ({ type: 'SET_CHOSEN', payload: { stringCode, param } }),
    setOpen: (stringCode)=>({type: 'SET_AUX_OPEN', payload: {stringCode}})
})

export default connect(mapStateToProps, mapDispatchToProps)(AuxPanel)
