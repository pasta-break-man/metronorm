import react, {useEffect, useRef} from "react";
import './components.css';
import { UpToggle } from './Bottons_UpDown';
import { DownToggle } from './Bottons_UpDown';
import { GamenPrevew } from './Bottons_UpDown';

export default function BackCanvas(){
    return(
        <div className="canvas">
            <UpToggle/>
            <DownToggle/>
            <GamenPrevew/>
        </div>
    )
}