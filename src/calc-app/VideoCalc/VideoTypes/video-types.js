import React, {useEffect, useState} from 'react'

import VideoType from './VideoType'
import AuxPanel from './VideoType/aux-panel'

import './video-types.scss'

const fadeInTime = 400

const chrono = () => (Wrapped) => {

    return (props) => {
        
        if (props.typePanel === 'chrono'){

            const minType = props.types.find(type=>type.stringCode==='nomoremin')
            const secType = props.types.find(type=>type.stringCode==='nomoresec')
            console.log('CHRONO', minType, secType)

            const error = minType.error && secType.error

            return (
                <div className={`video-types`}>
                    <div className={`question`}>
                        {props.question}
                    </div>
                    <div className={`types`}>
                        <div className={`title`}>
                            Не более
                        </div>
                        <AuxPanel 
                            focused={minType.auxPanel.focused}
                            isSelected={true}
                            auxPanel={minType.auxPanel}
                            open={true} 
                            value={minType.auxPanel.value}
                            stringCode={`nomoremin`} 
                            error ={error}
                        />
                        <AuxPanel 
                            isSelected={true}
                            auxPanel={secType.auxPanel}
                            open={false} 
                            value={secType.auxPanel.value}
                            stringCode={`nomoresec`} 
                            error ={error}
                        />
                    </div>
                </div>
            )
        }
        return <Wrapped {...props}/>
    }
}

const VideoTypes = ({ question, types, typePanel, show=null, prevAuxType=null, clickedAuxTypes=null, prevLanguageType=null,
    clickedLanguageTypes=null}) => {
    console.log('show', show)

    const [changed, setChanged] = useState(false)

    useEffect(()=>{
        console.log('USE_EFFECT', prevAuxType, clickedAuxTypes)
        if((prevAuxType && clickedAuxTypes.length!==0 && clickedAuxTypes[0]!==prevAuxType) || 
        (prevAuxType===null && clickedAuxTypes)){
            setChanged(true)
        }
        setTimeout(()=>{
            setChanged(false)
        }, fadeInTime)
    }, [prevAuxType, clickedAuxTypes])

    useEffect(()=>{
        console.log('USE_EFFECT', prevLanguageType, clickedLanguageTypes)
        if((prevLanguageType && clickedLanguageTypes.length!==0 && clickedLanguageTypes[0]!==prevLanguageType)||
        (prevLanguageType===null && clickedLanguageTypes)){
            setChanged(true)
        }
        setTimeout(()=>{
            setChanged(false)
        }, fadeInTime)
    }, [prevLanguageType, clickedLanguageTypes])

    return (
        (show===null || show) && <div className={`video-types `}>
            <div className={`question`}>
                {question}
            </div>
            <div className={`types ${changed? 'changed': ''}`}>
                {types.map(type => {
                    return (
                        !type.open || type.open !== 'hide') && <VideoType
                            key={type.stringCode}
                            type={type}
                            typePanel={typePanel}
                        />
                })}
            </div>
        </div>
    )
}

export default chrono()(VideoTypes)