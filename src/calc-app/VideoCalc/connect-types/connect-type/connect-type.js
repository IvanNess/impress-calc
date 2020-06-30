import React, { useRef, useEffect } from 'react'
import { connect } from 'react-redux'

import './connect-type.scss'

const ConnectType = ({ stringCode, value, placeholder, setValue, error, focused, setUnfocused }) => {
    const inputRef = useRef(null)

    useEffect(() => {
        if (focused && ([''].includes(value) || error)) {
            inputRef.current.focus()
        }
    }, [focused, error])

    return (
        <div className={`connect-type ${stringCode} `}>
            <input
                type='text'
                className={`${error ? 'error' : ''}`}
                placeholder={placeholder}
                value={value}
                onClick={(e) => {
                    e.stopPropagation()
                }}
                onChange={(e) => {
                    setValue(e.target.value, stringCode)
                }}
                ref={inputRef}
                onBlur={(e)=>{
                    e.stopPropagation()
                    setUnfocused()
                }}
            />
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = ({
    setValue: (value, stringCode) => ({ type: 'SET_VALUE', payload: { value, stringCode } }),
    setUnfocused: ()=>({type: 'SET_UNFOCUSED_CONNECT'})
})

export default connect(mapStateToProps, mapDispatchToProps)(ConnectType)