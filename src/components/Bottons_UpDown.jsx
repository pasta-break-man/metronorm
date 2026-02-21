import React, {Component, useEffect, useState} from "react";
import './components.css';
import Sound from './beat_440.wav';
import useSound from 'use-sound';

class Toggle extends Component{
    state = {speed: 60, onoff: false, show: false};

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

    Modalstate = () => {
        this.setState(prev => ({
            show: !prev.show
        }))
    }

    render(){
        return(
            <>
                <UpToggle onUp={this.handleUp}/>
                <DownToggle onDown={this.handleDown}/>
                <GamenPrevew speed={this.state.speed} onspeedChange={(n) => this.setState({speed: n})} show={this.state.show} mstate={this.Modalstate}/>
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
            <p>BPMを{text}に設定しました！</p>
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

function GamenPrevew({speed, onspeedChange, show, mstate}){
    return(
        <div className='gamen'>
            <Modal_set show={show} mstate={mstate} onspeedChange={onspeedChange} speed={speed}/>
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

function Modal_set({show, mstate, onspeedChange, speed}){
    return(
        <div>
            <button onClick={mstate}>click</button>
            {show && (
                <div className="overlay">
                    <div className="content">
                        <Text_in speed={speed} onspeedChange={onspeedChange}/>
                        <button onClick={mstate}>close</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Toggle;