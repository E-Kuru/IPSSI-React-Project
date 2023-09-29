import React from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import PokemonStat from '../components/PokemonStat';

const PokeStats = styled.div`
    background-color: rgb(0,0,0,0.9);
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

function Stats() {

    const {name} = useParams();

  return (
    <PokeStats>
        <PokemonStat name={name}/>
    </PokeStats>
  )
}

export default Stats