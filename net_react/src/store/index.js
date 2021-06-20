import {createStore} from 'redux'

const initialState = { 
    participants: [], 
    winner: null,
}

const reducer = (store=initialState, action) =>{
    switch (action.type){
        case 'ADD_PARTICIPANT':
            return {
                ...store,
                participants: [...store.participants, action.payload]
            }
        case 'DELETE_PARTICIPANT':
            return {
                ...store,
                participants: store.participants
                .filter(part => part.id !== action.payload.id)
            }
        case 'SHOW_WINNER':{
            const winner = [...store.participants].sort((a,b)=> a.time - b.time)[0]
            return {
                ...store,
                winner
            }
        }
        default:
            return store
    }
}

const store = createStore(reducer);

export default store;