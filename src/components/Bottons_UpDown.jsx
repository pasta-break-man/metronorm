import React, {Component, useEffect} from "react";
import './components.css';
import Sound from './beat_440.wav';
import useSound from 'use-sound';

class Toggle extends Component{
    state = {speed: 60, onoff: false};

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
                <GamenPrevew speed={this.state.speed}/>
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

export function GamenPrevew(props){
    return(
        <div className='gamen'>
            <h1 speed={props.speed}>speed: {props.speed}</h1>
        </div>
    )
}

export function On_Off_swich({swich, onoff}){
    return(
        <div className='playmetro'>
            <button onClick={swich}>{onoff ? 'ON': 'OFF'}</button>
            <Roop_wav/>
        </div>
    )
}

export default Toggle;