import React, {Component} from "react";
import './components.css';

class Toggle extends Component{
    state = {speed: 0, onoff: true};

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
            </> //ラップしないことにより，親子関係を正しくできるっぽい
        );
    }
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
        </div>
    )
}

export default Toggle;