import React, {Component} from "react";
import './components.css';

class Toggle extends Component{
    state = {speed: 0};

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

    render(){
        return(
            <div>
                <UpToggle speed={this.state.speed} onUp={this.handleUp}/>
                <DownToggle speed={this.state.speed} onDown={this.handleDown}/>
                <GamenPrevew speed={this.state.speed}/>
            </div>
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
            <p speed={props.speed}/>
        </div>
    )
}