import React, {Component, useEffect, useState, useRef} from "react";
import './components.css';
import Sound from './beat_440.wav';
import HeadSound from './beat_880.wav';
import useSound from 'use-sound';

class Toggle extends Component{
    state = {speed: 60, onoff: false, show: false, tempo: 4};

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

    SetTmpo = () => {
        this.setState(prev => ({
            tempo: prev.tempo+1
        }))
    }
    render(){
        return(
            <>
                <UpToggle onUp={this.handleUp}/>
                <DownToggle onDown={this.handleDown}/>
                <GamenPrevew speed={this.state.speed} 
                onspeedChange={(n) => this.setState({speed: n})} show={this.state.show} mstate={this.Modalstate}/>
                <On_Off_swich swich={this.Getonoff} onoff={this.state.onoff}/>
                <Roop_wav isOn={this.state.onoff} speed={this.state.speed} tempo={this.state.tempo}/>
                <Tempo_change tempo={this.state.tempo} 
                onTempoChange={(n) => this.setState({tempo: n})}/>
                <Tempo_show tempo={this.state.tempo}/>
            </> //ラップしないことにより，親子関係を正しくできるっぽい
        );
    }
}

function Roop_wav({isOn, speed, tempo}){
    const [playhead, {stop: stophead}] = useSound(HeadSound, {interrupt: true});
    const [play, {stop: stopather}] = useSound(Sound, {interrupt: true});
    const TempoCount = useRef(0);

    useEffect(() => {
        if(!isOn || speed <= 0 || tempo <= 0){
            stopather?.();
            stophead?.();
            TempoCount.current = 0;
            return;
        }

        const bpm = 60000 / speed;
        const id = setInterval(() => {
            if(TempoCount.current === 0){
                playhead();
            }else{
                play();
            }
            
        TempoCount.current = (TempoCount.current + 1) % tempo;
        }, bpm);

        return() => clearInterval(id);
    }, [isOn, speed, play, stopather, playhead, stophead, tempo]);
    
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
            <p>BPM: </p>
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
        <div className="bpmbutton">
            <button onClick={mstate}></button>
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

function Tempo_change({tempo, onTempoChange}){
    const TempoUp = () => onTempoChange(tempo + 1);
    const TempoDown = () => onTempoChange(tempo - 1);

    return(
        <>
            <div className="tempoup">
                <button onClick={TempoUp}>+</button>
            </div>
            <div className="tempodown">
                <button onClick={TempoDown}>-</button>
            </div>
        </>
    )
}

function Tempo_show(props){
    return(
        <div className="tempogamen">
            <h1>Tempo: {props.tempo}</h1>
        </div>
    )
}

export default Toggle;