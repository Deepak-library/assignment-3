
import './Goal.css';
function Goal(props){
    console.log(props);
async function del(id){
    try{
        await fetch("http://localhost:5000/todos",{method:"DELETE",headers:{"content-type":"application/json"},body:JSON.stringify({"id":id}) });
    }catch(e){
        console.log(e);
    }

    props.del(id);
};

async function update(id){
    let a=prompt("enter current tempo-");
    let b=prompt("enter goal tempo-");
    a=parseInt(a);
    b=parseInt(b);
    try{
        await fetch("http://localhost:5000/todos",{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify({"current":a,"goal":b,"id":id}) });
    }catch(e){
        console.log(e);
    }
    props.modify(id,a,b);
}
    const renderList = props.list.map((iteam) => {
        return (
        <div key={iteam.id}>
            <button className="b1" disabled>{iteam.instrument}</button><button className="b1" disabled>{iteam.exercise}</button><button className="b1" disabled><span className="title">Current </span>{iteam.current}</button><button className="b1" disabled><span className="title">Goal </span>{iteam.goal}</button>
            <button className="delete" onClick={()=>del(iteam.id)}>delete</button>
            <button className="modify" onClick={()=>{update(iteam.id)}}>modify</button>
        </div>
        );
      });

    return(
        <div>
                {renderList}
        </div>
    );
};

export default Goal;