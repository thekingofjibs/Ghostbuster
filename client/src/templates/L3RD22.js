import React,{useState} from "react"

export default function L3RD2 (props){
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [title2, setTitle2] = useState("")
    const [subtitle2, setSubtitle2] = useState("")

    function addCG(){
        var data
        if (title2 === ""){
            data = {f0: title, f2: subtitle}
        } else {
            data = {f0: title, f2: subtitle, f1: title2, f3: subtitle2}
        }
        props.socket.emit("addCG", props.path, 40, data)
    }

    function killCG(){
        props.socket.emit("killCG", 40)
    }

    return(
        <div className="templateItem">
            <div className="name">{ props.name }</div>
            <div className="inputDiv">Title 1<input value={ title } onChange = { e => setTitle(e.target.value)}></input></div>
            <div className="inputDiv">Subtitle 1<input value={ subtitle } onChange = { e => setSubtitle(e.target.value)}></input></div>
            <div className="inputDiv">(Title 2)<input value={ title2 } onChange = { e => setTitle2(e.target.value)}></input></div>
            <div className="inputDiv">(Subtitle 2)<input value={ subtitle2 } onChange = { e => setSubtitle2(e.target.value)}></input></div>
            <div className="buttonDiv">
                <button onClick={addCG} className="liveButton">LIVE</button>
                <button onClick={killCG} className="killButton">KILL</button>
            </div>
        </div>
    )
}