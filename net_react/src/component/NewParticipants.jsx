import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { pipeTime } from "../helpers";

const NewParticipans = (props) => {
    const dispatch = useDispatch();
    const [isRegistred, setIsRegistred] = useState(false)
    const [participantData, setParticipantData] = useState({
      name: '',
      surname: ''
    })
    const [time, setTime] = useState(0);
  
    const handleResister = (e) => {
      e.preventDefault();
      const name = e.target.elements.name.value;
      const surname = e.target.elements.surname.value;
      if(!name.length || !surname.length) return;
      setParticipantData({
        ...participantData, 
        name, 
        surname, 
        id: String(new Date().getTime()),
        time: 0
      })
      setIsRegistred(!isRegistred);
    }
  
    const handleSave = (e) =>{
      e.preventDefault();
      dispatch({type: 'ADD_PARTICIPANT', payload: participantData})
      setParticipantData({})
      setIsRegistred(false)
      
    }
  
    const handleChangeTime = e => {
      const time = e.target.value;
      if(Number.isNaN(+time)) return
      setTime(+time);
      setParticipantData({
        ...participantData, 
        time: +time
      })
    }
  
    const hanleCancle = () => {
      setParticipantData({})
      setIsRegistred(false)
    }
  
    const handleZero = () =>{
      setTime('')
    }
    
    return !isRegistred ? (
      <div>
        <h3>New Participant</h3>
        <form onSubmit={handleResister}>
          <input name="name" type="text" placeholder="Name"/>
          <input name="surname" type="text" placeholder="Surname"/>
          <button type="submit">Register</button>
        </form>
      </div>
    ):
    (
      <div>
        <h3>Participant {participantData.name}</h3>
        <form onSubmit={handleSave}>
          <input 
          name="time" 
          type="text" 
          placeholder="Time"
          value = {time}
          onChange={handleChangeTime}
          />
          <h3>Time: {pipeTime(time)}</h3>
          <button onClick={handleZero} type="submit">Register</button>
          <button onClick={hanleCancle} type="button">Cancel</button>
        </form>
      </div>
  
    )
  }

  export default NewParticipans;

