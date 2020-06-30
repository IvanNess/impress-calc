import React from 'react'
import {connect} from 'react-redux'
import * as R from 'ramda'

import AuxPanel from './aux-panel'

import './video-type.scss'

const VideoType = ({type, typePanel, clicked, typeClicked, prevAuxType})=>{

    const isSelected = clicked[typePanel].includes(type.stringCode)

    const auxShow = type.auxTypes? R.intersection(type.auxTypes, clicked.auxTypes).length >= 1 : true
    const languageShow = type.languageTypes? R.intersection(type.languageTypes, clicked.languageTypes).length >= 1 : true
    const show = auxShow && languageShow

    const error = type.error
    const openAuxPanel = type.error && clicked[typePanel].includes(type.stringCode)

    return(
        show && <div className={`video-type ${isSelected? 'selected': ''} ${error && !openAuxPanel?  'error': ''}`} 
            onClick={(e)=>{
                // if(typePanel==='auxTypes' && prevAuxType===type.stringCode)
                //     return
                typeClicked(type, typePanel)
                if(!isSelected){
                    e.stopPropagation()
                }
        }}>
            <div className={`title`} >
                {type.name}
            </div>
            {type.auxPanel && <AuxPanel 
                isSelected={isSelected}
                auxPanel={type.auxPanel}
                open={type.auxPanel.open} //если просто передать auxPanel, то open изменяться не будет
                value={type.auxPanel.value}
                stringCode={type.stringCode} 
                error={type.error}
                focused={type.auxPanel.focused}
            />}
        </div>
    )
}

const mapStateToProps = ({calc})=>({
    clicked: calc.clicked,
    auxTypes: calc.auxTypes,
    prevAuxType: calc.prevAuxType
})

const mapDispatchToProps = ({
    typeClicked: (type, typePanel)=>({type: 'TYPE_CLICKED', payload: {stringCode: type.stringCode, typePanel}})
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoType)