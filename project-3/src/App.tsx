import { useState, useEffect} from 'react'
import './App.css'
import FleshCard from './components/FleshCard'
import { cards } from './utils/cards'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button, Input } from '@chakra-ui/react'
import FleshForm from './components/FleshForm'



function App() {
  const [cardIndex, setCardIndex] = useState<number>(0)
  const length = cards.length
  const [streak, setStreak] = useState<number>(0)
  const [maxStreak, setMaxStreak] = useState<number>(0)

  useEffect(() => {
    const checkMax = (count: number) => {
      count > maxStreak && setMaxStreak(count) 
    }
    checkMax(streak)
  }, [streak])

  const showRandomCard = () => {
    let randomIndex = Math.floor(Math.random() * length)
    while (randomIndex === cardIndex && length > 1) {

      randomIndex = Math.floor(Math.random() * length)
    }
    setCardIndex(randomIndex)
  }

  const goPrev = () => {
    setCardIndex(prev => (prev - 1 + length) % length)
  }

  const goNext = () => {
    if (cardIndex > length - 2)
      return 
    else {
      setCardIndex((prev) => prev + 1)
    }
  }

  return (
    <div>
      <h1>Welcome to this Trivia on React</h1>
      <h3>Here you will have {cards.length} cards</h3>
      <h3>Your streak is: {streak} and MAX STREAK IS {maxStreak} </h3>

      <FleshCard
        id={cards[cardIndex].id}
        question={cards[cardIndex].question}
        answer={cards[cardIndex].answer}
      />

      <div className='box'>
        <ArrowLeft size={24} onClick={goPrev} />
        <ArrowRight size={24} onClick={goNext} />
        <Button backgroundColor='green'color='black' onClick={showRandomCard}>Random Card</Button>
      </div>

      <FleshForm setStreak={setStreak} correctAnswer={cards[cardIndex].answer}/>



    </div>
  )
}

export default App
