
import './Profile.css';
import React, { useState, useEffect } from 'react';
import Goal from './Goal';
function Profile(){
    var [excer,setlist] = useState([]);
    var uname=sessionStorage.getItem('uname');
    var l=[];

    (async function addexercise(){
        console.log(l);
        try{
         l=await fetch("http://localhost:5000/todos/list",{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify({"uname":uname}) });
         l=await l.json();
          
       }catch(e){
         alert(e)
        }
      })()
      
      function del(id){
        const newList = excer.filter((iteam) => {
            return iteam.id !== id;
          });
      
          setlist(newList);
      }

      function update(idc,a,b){
          console.log("inupdate");
        const newList = excer;
        
        newList.forEach((iteam) => {
            if(iteam.id === idc){
                iteam.current=a;
                iteam.goal=b;
            }
          });
      
          setlist([]);
          setlist(newList);
          
      }
   
      var x=[];
     if(uname===""){
       
        window.location.href='/';
    }
        else
    return(
        <div className="profile">
            <h2>Hi, {uname}</h2>
            <h1>Choose Your Instrument</h1>
            <div className="choice">
            <button className="buttongd" onClick={()=>{window.location.href='/guitar';}}><span>Guitar</span></button>
            <button className="buttongd" onClick={()=>{window.location.href='/drum';}}><span>Drum</span></button>
            </div>
                    
            <button className="view" onClick={()=>{
                for(var ih of l){x.push({'key':ih.id,...ih});};
               x.forEach(e=>{console.log(e);})
               setlist([...x]);
               console.log(excer);
                }}>View Exercises</button>

          <Goal list={excer} del={del} modify={update}></Goal>
        </div>

    );
}

export default Profile;