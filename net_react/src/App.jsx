import React, {useState, useEffect} from "react";
import UserCard from "./component/UserCard";
import NewParticipans from "./component/NewParticipants";
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import { pipeTime } from "./helpers";
import {Route, Switch, Link} from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const participantsData = useSelector(state => state.participants);
  const [participants, setParticipant] = useState([...participantsData]);
  const [state, setState] = useState(true);
  const [sort, setSort] = useState(...participants);
  const winner = useSelector(store => store.winner);

  useEffect(()=>setParticipant([...participantsData]), [participantsData])

  const handleChange = (event) => {
    setState(!event.target.value.length > 0)
    setSort(...participants)
    const result = [];
    participants.forEach(user => {
       if(user.name.toLowerCase().includes(event.target.value.toLowerCase()) || user.id.includes(event.target.value)){
         result.push(user)
       }
    });
    setSort(result)
  }

  const handleWinner = () =>{
    dispatch({type: 'SHOW_WINNER'})
  }
  
  return (
    <div className="flex">
	<div className="mainitem">
  <div className="App">
  <div className="wrapper">
  <input type="text" placeholder="Enter text..." onChange={handleChange}/>
      {
        !winner ? 
      participants.length ?
    <div className="box">
      {
        state ? 
        participants.map(users => <UserCard user={users} />)
        :
        sort.map(users => <UserCard user={users} />)
        }
    </div>
    :
    <h1>Participants not found</h1>
    :
    <div>
    <h1>WINNER</h1>
    <UserCard user={winner} />
    </div>
      }
  </div></div></div>
	<div className="sideitem">
		<div className="item"><NewParticipans setParticipant={setParticipant}></NewParticipans></div>
		<div className="item">
    <form>
    <h2>Total participants: {participants.length}</h2>
    {!winner ?
    <button onClick = {handleWinner}>Show Winner</button>
    :
    <div></div>
    }
    </form>
    </div>
	</div>
</div>
  );
}

const ParticipantInfo = (props) => {
  const user = useSelector(state => state.participants.find(u => u.id == props.match.params.id))
  if(!user) return <h1><Link to='/'>Home</Link></h1>
  return (
    <div className="card">
            <p></p>
            <p>Id: {user.id}</p>
            <p>Name: {user.name}</p>
            <p>Surname: {user.surname}</p>
            <p>Time: {pipeTime(user.time)}</p>
            <Link to="/">Home</Link>
        </div>
  )
}

function App() {
  return (
    <Switch>
      <Route exact path = "/" component = {Dashboard}/>
      <Route exact path = "/:id" component = {ParticipantInfo}/>
    </Switch>
  )
}

export default App;