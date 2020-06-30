import React from 'react'
import { connect } from 'react-redux'

import VideoCalc from './VideoCalc'
import CalcHeader from './calc-header'
import ModalWindow from './modal-window'
import CalcButton from './calc-btn'
import CalcDisplay from './calc-display'
import { getFormErrors } from './utils'

import './app.scss'

const CalcApp = ({ calcAppClicked, outsideCalcAppClicked, showApp }) => {

    return (
        <div className={`calc-app-wrapper ${showApp? 'show': 'hide'}`} onClick={(e)=>{
            console.log('TARGET', e.target.className.includes('calc-app-wrapper'))
            if(e.target.className.includes('calc-app-wrapper')){
                console.log('HIDE')
                outsideCalcAppClicked()
            }
        }}>
            <div className={`calc-app ${showApp? 'show': 'hide'}`} onClick={(e) => { 
                calcAppClicked() 
            }}>
                <CalcHeader />
                <VideoCalc />
                <CalcButton />
                <CalcDisplay />
                <ModalWindow />
            </div>
        </div>

    )
}

const mapStateToProps = ({ calc }) => ({
    showApp: calc.showApp
})

const mapDispatchToProps = ({
    calcAppClicked: () => ({ type: 'CALC_APP_CLICKED' }),
    outsideCalcAppClicked: ()=>({type: 'OUTSIDE_CALC_APP_CLICKED'})
})

export default connect(mapStateToProps, mapDispatchToProps)(CalcApp)