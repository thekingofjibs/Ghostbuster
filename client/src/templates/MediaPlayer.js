import React, { useState } from 'react';
import Select from 'react-select';

export default function MediaPlayer (props){
    const [info, setInfo] = useState({})
    const [thumb, setThumb] = useState("")
    const [loop, setLoop] = useState(false)
    var counter = 0
    const options = props.data.map((media)=>{
        var returner = {}
        returner['label'] = media.name
        returner['value'] = counter
        counter++
        return returner
    }
    )

    function playVideo(){
        console.log(loop);
        props.socket.emit("playVideo", info.name, 45, loop)
    }

    function stopVideo(){
        props.socket.emit("stopVideo", 45)
    }

    function getThumb(label){
        props.socket.emit('getThumb', label)
    }

    props.socket.on('recThumb', (e)=>{
        setThumb(e)
        console.log("got thumb successful")
    })

    return(
        <div style={{marginLeft:"2vw",display:"flex",flexDirection:"column", alignContent: "center",justifyContent:"center", height:"100%", marginTop:"50%", maxWidth:"14vw", borderStyle:"solid"}}>
            <div style={{width:"100%", marginTop:"5%", marginBottom:"1%"}}><Select autosize={true} options={options} onChange={ e => {setInfo(props.data[e.value]); getThumb(e.label)}}/></div>
            <div style={{minHeight:"45vh", display:"flex", flexDirection:"column", alignContent:"center", justifyContent: 'space-between'}}>
                <div id="thunmbnail" style={{width:"90%", borderStyle:"solid", marginLeft:"4.5%", borderRadius:"0", height:"auto"}}>
                    <img src={thumb} style={{width:"100%", paddingTop:"3px"}}></img>
                </div>

                <div>
                    <div style={{padding:"1vw", wordWrap: "break-word"}}>{"Name: " + info.name}</div>
                    <div style={{padding:"1vw", wordWrap: "break-word"}}>{"Type: " + info.type}</div>
                    <div style={{padding:"1vw", wordWrap: "break-word"}}>{"Duration: " + info.duration}</div>
                    <div style={{padding:"1vw", wordWrap: "break-word"}}>{"FPS: " + info.frameRate}</div>
                </div>
                <div style={{marginLeft:"1vw"}}>Loop: 
                    <input type="checkbox" value={loop} onChange={e => {setLoop(!loop)}}></input>
                </div>
                <div className="buttonDiv">
                    <button onClick={playVideo} className="liveButton">Play</button>
                    <button onClick={stopVideo} className="killButton">Stop</button>
                </div>
            </div>
        </div>
    )
}