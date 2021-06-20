import { pipeTime } from "../helpers"
import React from "react"
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom';


const UserCard = (props) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch({type: 'DELETE_PARTICIPANT', payload: props.user})
  }

  const winner = useSelector(store => store.winner);

    return (
      <div className="card">
            <p></p>
            <p>Id: {props.user.id}</p>
            <p>Name: {props.user.name}</p>
            <p>Surname: {props.user.surname}</p>
            <p>Time: {pipeTime(props.user.time)}</p>
            {!winner ?
            <button onClick={handleDelete}>Delete</button>
            :
            <p></p>
            }
            <p><Link to={'/'+props.user.id} >Show user info</Link></p>
        </div>
    )
  }

  export default UserCard;