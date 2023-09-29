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

export const PokemonTeamCard = (props) => {
    
    const {poke, remove} = props

    const navigate = useNavigate()
    
    const [OnePokemon, setOnePokemon] = useState(null)

    useEffect(() => {
        setOnePokemon(poke)
    },[])
     
    const navigateToStats = () => {
        navigate(`/stats/${OnePokemon.name}`)
    }

  return (
    <>
    {
        OnePokemon && (
            <Card>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${OnePokemon.data.id}.png`} alt="image" />
                {OnePokemon !== undefined && (
                    <div className="info">
                        <h3>{OnePokemon.data.name}</h3>
                        {OnePokemon.data.types.length > 1 ?
                            <p className='types'>Types : {OnePokemon.data.types.map((e,i) => <li key={i}>{e.type.name}</li>)}</p>
                        :
                        <p>Type : {OnePokemon.data.types[0].type.name}</p> }
                    </div>
                )}
                <div className="actions">
                    <button onClick={() => remove(OnePokemon.data.name)}>Rétirer de l'équipe</button>
                    <button onClick={() => navigateToStats()}>Stats</button>
                </div>
            </Card>
    
        )
    }
  </>
  )}


export default PokemonTeamCard;