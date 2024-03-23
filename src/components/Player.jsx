import React, { useEffect, useState } from "react";

const Player = ({initialName,symbol,isActive,onChangeName,isStarted, reMatch}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);
    const [showEdit, setShowEdit] = useState(true)
    function handleEdit(){
        setIsEdit(!isEdit)
        if(isEdit){
            onChangeName(symbol, playerName)
        }
    }
    function handleNameChange(event){
        const inputValue = event.target.value;
        if(inputValue.length<=15){
            setPlayerName(inputValue)
        }
        else{
            alert('Player name should not exceed more than 15 characters')
        }
    }
    useEffect(()=>{
        if(isStarted === 0 && !reMatch){
            setIsEdit(true)
            setShowEdit(true)
        }
        else if(isStarted === 0 && reMatch){
            setIsEdit(false)
            setShowEdit(true)
        }
        else{
            setIsEdit(false)
            setShowEdit(false)
        }
    },[isStarted])
  return (
    <li className={`player-list`}>
      <span className="player">
        <span className={`${isActive ? 'player-active':undefined} player-symbol`}>{symbol}</span>
        {(!isEdit) && <span className={`${isActive ? 'player-name-active':undefined} player-name`}>{playerName}</span>}
        {(isEdit) && <input type="text" maxLength={16} required className="player-input" value={playerName} onChange={handleNameChange} /> }
      </span>
      {showEdit && <button onClick={handleEdit} >{(isEdit) ? 'Save' : 'Edit' }</button>}
    </li>
  );
};

export default Player;
