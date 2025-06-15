import React, { useState } from 'react'
import { Card } from '@geist-ui/core'
import type { CardProps } from '../types/types'


const FlashCard: React.FC<CardProps> = ({ id, question, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false)

  return (
    <Card
      hoverable
      shadow
      onClick={() => setShowAnswer(prev => !prev)}
      key={id}
      style={{
        cursor: 'pointer',
        minHeight: '200px',
        minWidth: '400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        transition: 'transform 0.3s',
      }}
    >
      <h3>{showAnswer ? <span>Answer is: {answer}</span> : <span>Question is: {question}</span>}</h3>
    </Card>
  )
}

export default FlashCard
