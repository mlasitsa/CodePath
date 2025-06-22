export type CardProps = {
    id: number,
    question: string,
    answer: string
}

export type CheckAnswerProps = {
    answer: string,
    correctAnswer: string,
}

export type FleshFormProps = {
    setStreak: React.Dispatch<React.SetStateAction<number>>, 
    correctAnswer: string,
}