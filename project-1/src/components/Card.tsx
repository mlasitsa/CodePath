import React from 'react'
import '../styles/general.css'
import { type CardProp }  from '../types/types'
import Button from './Button'


const Card = ({urlPic, name, kitchenType} : CardProp) => {
  return (
    <div className='card'>
        <img src={`${urlPic}`} width="500px" height='250px'></img>
        <h1>{name}</h1>
        <p>{kitchenType}</p>
        <Button text="Learn More"/>
    </div>
  )
}

export default Card