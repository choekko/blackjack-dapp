import { useState } from 'react';

const CANDIDATE_NUMBER = Array.from({length: 12}, (_, i) => i + 1);
const CANDIDATE_PATTERN = ['♠️', '♣️', '♥️', '♦️'];

const useCardSelector = () => {
    const makeNewCandidateCards = () => CANDIDATE_PATTERN
        .flatMap(pattern => CANDIDATE_NUMBER.map(number => ({pattern: pattern, number: number, isHidden: false})))
        .sort(() => Math.random() - 0.5);

    const [candidateCards, setCandidateCards] = useState(makeNewCandidateCards());

    const resetCandidateCards = () => {
        setCandidateCards(makeNewCandidateCards());
    }

    const getCard = (isHidden) => {
        return { ...candidateCards.pop(), isHidden: isHidden };
    }
    return [ getCard, resetCandidateCards ];
}

export default useCardSelector;