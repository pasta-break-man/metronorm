import react, {useEffect, useRef} from "react";
import './components.css'

export default function BackCanvas(){
    return(
        <div className="canvas">
            <div className="gamen"></div>
            <div className='playsrightnormal'></div>
            <div className='playsleftnormal'></div>
        </div>
    )
}