import React from 'react'

import ConnectType from './connect-type'

import './connect-types.scss'

const ConnectTypes = ({ types, question }) => {
    console.log('connect-types', types)
    return (
        <div className={`connect-types`}>
            <div className='question'>
                <p>{question}</p>
            </div>
            <div className={`connect-types-map`}>
                {types.map(type => <ConnectType
                    key={type.stringCode}
                    stringCode={type.stringCode}
                    placeholder={type.placeholder}
                    value={type.value}
                    error={type.error}
                    focused={type.focused}
                />)}
            </div>
        </div>
    )
}

export default ConnectTypes