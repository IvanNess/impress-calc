import React from 'react'

import VideoType from './VideoType'

import './video-types.scss'

const VideoTypes = ({ question, types, typePanel }) => {

    console.log('types', types)
    return (
        <div className={`video-types`}>
            <div className={`question`}>
                {question}
            </div>
            <div className={`types`}>
                {types.map(type => {
                    return <VideoType key={type.stringCode} type={type} typePanel={typePanel} />
                })}
            </div>
        </div>
    )
}

export default VideoTypes