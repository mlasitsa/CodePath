import type { CheckAnswerProps } from "../types/types"

export const useDetermineAnswer = ({correctAnswer, answer} : CheckAnswerProps) => {
    if (normalize(correctAnswer) == normalize(answer)) {
        return true
    } else {
        return false
    }
}

const normalize = (str?: string) => {
    return str?.toLowerCase().replace(/[\s,.:;!?-]/g, "").trim()
}

