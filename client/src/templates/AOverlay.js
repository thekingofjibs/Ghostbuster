import React,{useReducer} from "react"
import produce from "immer";

function stateReducer(state, action) {
    return produce(state, newState => {
        switch (action.type) {
            case "change":
                newState.inputs[action.input] = action.value
                break
            case "add":
                newState.inputs.push("")
                newState.numberOfInputs += 1;
                break;
            case "remove":
                newState.inputs.pop();
                newState.numberOfInputs -= 1;
                break;
            default: throw new Error()
        }
    })
}

export default function AOverlay (props){
    const [state, dispatch] = useReducer(stateReducer, null, () => {
        var numberOfInputs
        var name
        var canExpand = false
        if (Array.isArray(props.name)){
            if(props.name[0] === 'n'){
                name = props.name[1]
                numberOfInputs = 0
                canExpand = true
            } else {
                name = props.name[1]
                numberOfInputs = props.name[0]
            }
        } else {
            name = props.name
            numberOfInputs = 0
        }
        var inputs = []
        for (let i = 0; i < numberOfInputs; i++) {
            inputs.push("")
        }
        return {
            name,
            numberOfInputs,
            canExpand,
            inputs
        };
    })

    function addCG(){
        var data = []
        var j
        if (state.canExpand){
            data = state.inputs
        } else {
            for (j=0; j<state.inputs.length; j++) {
                var obj = {}
                obj['f'+j] = state.inputs[j]
                data.push(obj)
            }
        }
        props.socket.emit("addCG", props.path, 42, data)
    }

    function killCG(){
        props.socket.emit("killCG", 42)
    }

    return(
        <div className="templateItem">
            <div className="name">{ state.name }</div>
            <div className="inputDiv" style={{flexDirection: "column"}}>
                {state.inputs.map((value, index) => (
                    <input style= {{marginBottom:"1vh"}} key={index} value={value} onChange={e => dispatch({ type: "change", input: index, value: e.target.value })} />
                ))}
                {state.canExpand && (
                    <div style={{display:"inline-flex", flexDirection:"row", justifyContent:"center"}}> 
                        <button onClick={() => dispatch({ type: "add" })} style={{width:"1.5vw", height:"1.4vw", fontSize:".8vw"}}>+</button>
                        <button onClick={() => dispatch({ type: "remove"})} disabled={state.numberOfInputs === 0} style={{width:"1.5vw",height:"1.4vw", fontSize:".8vw"}}>-</button>
                    </div>
                )}
            </div>
            <div className="buttonDiv">
                <button onClick={addCG} className="liveButton">LIVE</button>
                <button onClick={killCG} className="killButton">KILL</button>
            </div>
        </div>
    )
}