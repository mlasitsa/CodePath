import React, { useState } from 'react'
import { Button, Input } from '@chakra-ui/react'
import type { FleshFormProps } from '../types/types'
import { useDetermineAnswer } from '../hooks/useDetermineAnswer'

const FleshForm = ({ setStreak, correctAnswer }: FleshFormProps) => {
  const [answer, setAnswer] = useState<string>('')
  const [showColor, setShowColor] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isCorrect = useDetermineAnswer({ correctAnswer, answer })

    if (isCorrect) {
      setStreak((prev: number) => prev + 1)
      setShowColor(true)
    } else {
      setStreak(0)
      setShowColor(false)
    }
    setAnswer('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Type your answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        borderColor={showColor ? 'green.400' : 'red.400'}
      />
      <Button type="submit" color='white' backgroundColor='orange' mt="4">
        Check Answer
      </Button>
    </form>
  )
}

export default FleshForm
