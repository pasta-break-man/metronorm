import React, {Component, useEffect, useState} from "react";
import './components.css';
import Sound from './beat_440.wav';
import useSound from 'use-sound';

class Toggle extends Component{
    state = {speed: 60, onoff: false, text: "", setText: ""};

    handleUp = () => {
        this.setState(prev => ({
            speed: prev.speed < 500 ? prev.speed + 1 : prev.speed
        }));
    };

    handleDown = () => {
        this.setState(prev => ({
            speed: prev.speed > 0 ? prev.speed - 1: prev.speed,
        }));
    };

    Getonoff = () => {
        this.setState(prev => ({
            onoff: !prev.onoff
        }))
    }

    render(){
        return(
            <>
                <UpToggle onUp={this.handleUp}/>
                <DownToggle onDown={this.handleDown}/>
                <GamenPrevew speed={this.state.speed} onspeedChange={(n) => this.setState({speed: n})}/>
                <On_Off_swich swich={this.Getonoff} onoff={this.state.onoff}/>
                <Roop_wav isOn={this.state.onoff} speed={this.state.speed}/>
            </> //ラップしないことにより，親子関係を正しくできるっぽい
        );
    }
}

function Roop_wav({isOn, speed}){
    const [play, {stop}] = useSound(Sound, {interrupt: true});
    useEffect(() => {
        if(!isOn || speed <= 0){
            stop?.();
            return;
        }

        const bpm = 60000 / speed;
        const id = setInterval(() => {
            play();
        }, bpm);

        return() => clearInterval(id);
    }, [isOn, speed, play, stop]);
    
    return null;
}

function Text_in({speed, onspeedChange}){
    const [text, setText] = useState("");

    const handleChange = (e) => {
        const set = e.target.value;
        setText(set);

        const set_number = Number(set);
        onspeedChange(set_number);
    }

    return(
        <div>
            <input
            type="text"
            value={text}
            onChange={handleChange}
            placeholder="数字を入力して"
            />
            <p>BPM: {text}</p>
        </div>
    )
}

export function UpToggle(props){
    return(
        <div className='playsrightnormal'>
            <button onClick={props.onUp}></button>
        </div>
    )
}

export function DownToggle(props){
    return(
        <div className='playsleftnormal'>
            <button onClick={props.onDown}></button>
        </div>
    )
}

function GamenPrevew({speed, onspeedChange}){
    const [isPopUpVisible, setPopUpVisible] = useState(false);

    const togglePopUp = () => {
        setPopUpVisible(!isPopUpVisible);
    };

    return(
        <div className='gamen'>
            <button onClick={togglePopUp}></button>

            {isPopUpVisible && (
                <div className="Popup">
                    <Text_in speed={speed} onspeedChange={onspeedChange}/>
                    <button onClick={togglePopUp}>close</button>
                </div>
            )}
            <h1>speed: {speed}</h1>
        </div>
    )
}

export function On_Off_swich({swich, onoff}){
    return(
        <div className='playmetro'>
            <button onClick={swich}>{onoff ? 'ON': 'OFF'}</button>
        </div>
    )
}

export default Toggle;