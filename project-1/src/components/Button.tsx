import React from 'react'
import '../styles/general.css'

const Button = ({text = 'Learn More'} : {text: string}) => {
  return (
    <button className='button'>{text}</button>
  )
}

export default Button