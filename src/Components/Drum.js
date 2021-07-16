
import './Drum.css';
import React, { useState } from 'react';



function Drum() {

    let scale = "paradiddles";
    let [showing, setShowing] = useState(0);
    //console.log(scale);
    let [exercise, setExercise] = useState(scale);

    function selected() {
        setExercise(scale);
        setShowing(1);
    }

    let current="",goal="";

    async function addexercise(){
        try{
         await fetch("http://localhost:5000/todos",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({"uname":uname,"instrument":"Drum","exercise":exercise,"current":current,"goal":goal}) }).then(a=>a.json()).then(console.log);
        alert("your exercise is saved !!!")
        }catch(e){
         alert("unable to connect server!")
        }
      }

    function save(){
        current=current.trim();
        goal=goal.trim();
        if(current.length===0 || goal.length===0){
            alert("Fields can not be empty!!!")
        }else{
            if(isNaN(current)||isNaN(goal))
            {
                alert("Value should be number !!!")
            }else{
                addexercise();
            }
        }
        console.log("save");
    }
    let uname=sessionStorage.getItem('uname');
    if(uname===""){
       // alert("You have not Loged In !!! Please Log In");
        window.location.href='/';
    }
        else
    return (
        <div className="drum">
            <h1>My Drum Exercises</h1>
            <h2>Choose an Exercise</h2>
            <div className="select-option">

                <select id="drumexercises" onChange={(event) => { scale = event.target.value; console.log(scale) }}>
                    <option value="singles">Singles</option>
                    <option value="doubles">Doubles</option>
                    <option value="triplets">Triplets</option>
                    <option value="paradiddles" selected>Paradiddles</option>
                    <option value="flams">Flams</option>
                </select>
                <button className="submit" onClick={() => selected()}>Submit</button>
            </div>
            <div className="sep"></div>
            <div className="tempo-box" style={{ display: (showing ? 'flex' : 'none') }}>
                <div className="current-tempo">
                    <h2>{exercise}</h2>
                    <label>
                        <b>Current Tempo -</b>
                    </label>
                    <input type="text" onChange={(e)=>{current=e.target.value}}></input>
                </div>
                <div className="goal-tempo">
                    <label>
                        <b>Goal Tempo -</b>
                    </label>
                    <input type="text" onChange={(e)=>{goal=e.target.value}}></input>
                </div>
                <div>
                    <button className="save" onClick={()=>save()}>Save</button>
                </div>
            </div>

        </div>
    );
}

export default Drum;