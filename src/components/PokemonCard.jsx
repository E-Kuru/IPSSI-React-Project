import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Card = styled.div`
        height: 20rem;
        width: 25%;
        border : 1px solid rgb(254,202,27);
        margin-bottom: 2rem;  
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        border-radius: 10%;
        background-color: rgba(79, 93, 225, 1);
    
        img{
            height: 40%;
        }  
    
        .info{
            text-align: center;
        }
    
        .types{
            display: flex;
            justify-content:space-around;
            align-items: center;
            width: 200px;
            list-style: none;
        }
    
        .actions{
            height: 20%;
            width: 100%;
            display: flex;
            align-items:center;
            flex-direction: column;
            justify-content: space-around;
    
            button{
                height: 45%;
                width: 80%;
                border-radius: 10rem;
                border: 2px solid rgb(254,202,27);
            }
    
            button:hover{
                background-color: rgb(254,202,27);
                color: rgb(55,97,167);
                border: 1px solid red;
            }
        }
`

export const PokemonCard = (props) => {
    
    const {name, team, setTeam} = props

    const navigate = useNavigate()
    
    const [OnePokemon, setOnePokemon] = useState()
    

    useEffect(()=>{
        getOnePokemon()
    },[])

    const getOnePokemon = async () =>{
        try{
            await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(res => res.json())
            .then(res => setOnePokemon(res))
        } catch(err) {
            console.log(err);
        }
    }

    const addToTeam = () => {
        const item = JSON.parse(localStorage.getItem("team"))

        if(item !== null && item.length !== 6){
            localStorage.setItem("team" , JSON.stringify([...item,OnePokemon.name]))
        }
         else if (item === null){
            localStorage.setItem("team" , JSON.stringify([OnePokemon.name]))
         } else{
            alert('You have reached the maximum capacity of your team !');
         }
    }

    const removeFromTeam = (name) => {
        const item = JSON.parse(localStorage.getItem("team"))
        const filteredItem = item.filter( e => e !== name )
        localStorage.setItem("team" , JSON.stringify(filteredItem))
        const newItem = JSON.parse(localStorage.getItem("team"))
        setTeam(newItem)
        
    }
 
    const navigateToStats = () => {
        navigate(`/stats/${OnePokemon.name}`)
    }

  return (
    <>
    {
        OnePokemon !== undefined && (
            <Card>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${OnePokemon.id}.png`} alt="image" />
                {OnePokemon !== undefined && (
                    <div className="info">
                        <h3>{OnePokemon.name}</h3>
                        {OnePokemon.types.length > 1 ?
                            <p className='types'>Types : {OnePokemon.types.map((e,i) => <li key={i}>{e.type.name}</li>)}</p>
                        :
                        <p>Type : {OnePokemon.types[0].type.name}</p> }
                    </div>
                )}
                {team === true ? (
                <div className="actions">
                    <button onClick={() => removeFromTeam(OnePokemon.name)}>Rétirer de l'équipe</button>
                    <button onClick={() => navigateToStats()}>Stats</button>
                </div>
                )  : (
                <div className="actions">
                    <button onClick={() => addToTeam()}>Ajouter à l'équipe</button>
                    <button onClick={() => navigateToStats()}>Stats</button>
                </div>

                )}
            </Card>
    
        )
    }
  </>
  )}


export default PokemonCard;