import React, {useEffect, useState} from 'react'
import styled from 'styled-components'

const Card = styled.div`
    height: 90%;
    width : 30%;
    border : 1px solid rgb(254,202,27);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    border-radius: 2rem;
    background-color: rgba(79, 93, 225, 1);
    
    img{
        height: 50%;
    }  

    .info{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: rgb(254,202,27);
        text-align: center;
    }

    h3{
        margin: 0;
    }

    .types{
        text-align: center;
        display: flex;
        justify-content:space-around;
        width: 100%;
        list-style: none;
    }

    .allStats{
        margin: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
    }
    
    .weight{
        margin: 0 0 1rem 0;  
        width: 70%;
        border-top: 1px solid rgb(254,202,27);
        border-bottom: 1px solid rgb(254,202,27);
        padding: 1rem 0 1rem 0;
    }

`

export const PokemonStat = (props) => {

    const {name} = props

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
                            <p className='types'>Types : {OnePokemon.types.map((e,i) => <li key={i}> {e.type.name}</li>)}</p>
                        :
                        <p>Type : {OnePokemon.types[0].type.name}</p> }
                        <p className='weight'>Weight : {OnePokemon.weight}</p>
                        <div className="allStats">
                            {OnePokemon.stats.map((e,i) => <li>{e.stat.name} : {e.base_stat}</li> )}
                        </div>
                    </div>
                )}
            </Card>
    
        )
    }
  </>
  )}


export default PokemonStat;