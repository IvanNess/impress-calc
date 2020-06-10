import React from 'react'
import {connect} from 'react-redux'

import AuxPanel from './aux-panel'

import './video-type.scss'

const VideoType = ({type, typePanel, clicked, typeClicked})=>{

    console.log(type)

    const isSelected = clicked[typePanel].includes(type.stringCode)
    return(
        <div className={`video-type`}>
            <div className={`${isSelected && 'clicked'} title`} onClick={()=>typeClicked(type, typePanel)}>
                {type.name}
            </div>
            {type.auxPanel && <AuxPanel 
                isSelected={isSelected}
                auxPanel={type.auxPanel}
                open={type.auxPanel.open}

                show={type.auxPanel && isSelected}
                clicked={clicked} 
                stringCode={type.stringCode} 
                params={type.auxPanel.params} 
                chosen = {type.auxPanel.chosen}
                key={type.stringCode} 
            />}
        </div>
    )
}

const mapStateToProps = ({calc})=>({
    clicked: calc.clicked
})

const mapDispatchToProps = ({
    typeClicked: (type, typePanel)=>({type: 'TYPE_CLICKED', payload: {stringCode: type.stringCode, typePanel}})
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoType)