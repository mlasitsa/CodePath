import { useState } from 'react'
import './App.css'
import FleshCard from './components/FleshCard'
import { cards } from './utils/cards'
import { ArrowLeft, ArrowRight } from 'lucide-react'

function App() {
  const [cardIndex, setCardIndex] = useState<number>(0)
  const length = cards.length

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

  return (
    <div>
      <h1>Welcome to this Trivia on React</h1>
      <h3>Here you will have {cards.length} cards</h3>

      <FleshCard
        id={cards[cardIndex].id}
        question={cards[cardIndex].question}
        answer={cards[cardIndex].answer}
      />

      <div className='box'>
        <ArrowLeft size={24} onClick={goPrev} />
        <ArrowRight size={24} onClick={showRandomCard} />
      </div>
    </div>
  )
}

export default App
