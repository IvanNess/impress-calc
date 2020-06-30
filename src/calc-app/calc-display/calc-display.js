import React, { useEffect, useRef } from 'react'
import {connect} from 'react-redux'

import './calc-display.scss'

const CalcDisplay = ({error, data, isLoading})=>{
    const calcRef = useRef(null)

    useEffect(()=>{
        console.log(window.getComputedStyle(calcRef.current).height)
        window.scrollBy(0, parseFloat(window.getComputedStyle(calcRef.current).height))
    }, [data, isLoading])
    return(
        <div className={`calc-display`} ref={calcRef}>
            {data && <div className={`header`} >
                <p>Предполагаемая стоимость:</p>
            </div>}
            {data && <div className={`result`} >
                <p>от {data.min} USD до {data.max} USD</p>
            </div>}
            {isLoading && <div className={`loading`} >
                <p>Подождите. Происходит просчет...</p>
            </div>}
            {error && <div className={`error`}>
                <p>Ивините, произошла ошибка...</p>
            </div>}
        </div>
    )
}

const mapStateToProps = ({calc: {fetch}})=>({
    error: fetch.error,
    data: fetch.data,
    isLoading: fetch.isLoading
})

export default connect(mapStateToProps)(CalcDisplay)