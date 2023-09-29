import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const NavBar = styled.div`
    height : 10vh;
    background-color: rgb(39, 54, 196);
    
    .link{
        height : 100%;
        width : 40%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        
        a{
            color: rgb(254,202,27); 
            text-decoration: none;
        }

        a:hover{
            text-decoration: underline;
            font-weight: bold;
        }

    }

`

const Nav = () => {
  return (
    <NavBar>
        <div className="link">
            <Link to='/' >Home</Link>
            <Link to='/team' >Mon équipe</Link>
        </div>
    </NavBar>
  )
}

export default Nav