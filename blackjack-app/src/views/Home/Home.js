import Card from '../../components/Card';
import InteractionBundle from '../../components/InterfactionBundle';
import useCardSelector from '../../hooks/useCardSelector';
import { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
    const [gameStatus, setGameStatus] = useState('BET');
    const [getCard, resetCandidateCards] = useCardSelector();
    const [betAmt, setBetAmt] = useState(0);
    const [dealerCards, setDealerCards] = useState([]);
    const [userCards, setUserCards] = useState([]);


    const sumCardNumber = (cards) => {
        return cards.reduce((acc, card) => card.isHidden ? acc : acc + card.number, 0);
    }

    useEffect(() => {
        console.log('gameStatus', gameStatus);
    }, [gameStatus]);

    useEffect(() => {
        if (!dealerCards.length) return;

        const dealerSum = sumCardNumber(dealerCards);
        const userSum = sumCardNumber(userCards);

        if (gameStatus === 'SELECT') return;
        if (gameStatus === 'WAIT' && dealerSum <= userSum && dealerSum < 21 ) {
            const newCard = getCard(false);
            setTimeout(() => setDealerCards(prevState => [...prevState, newCard]), 1000);
            return;
        }

        let nextGameStatus;

        if (dealerSum > 21 || userSum === 21) nextGameStatus = 'WIN';
        else if (dealerSum === 21 || userSum > 21 || (dealerSum > userSum && gameStatus !== 'HIT')) nextGameStatus = 'LOSE';
        else nextGameStatus = 'SELECT';

        setGameStatus(nextGameStatus);
        if (nextGameStatus === 'LOSE' || nextGameStatus === 'WIN') {
            setTimeout(() => {
                alert(`${userSum === 21 || dealerSum === 21 ? 'BLACK JACK!' : ''} ${nextGameStatus}`);
                setGameStatus('BET');
                resetCandidateCards();
                setDealerCards([]);
                setUserCards([]);
            }, 500)

        }
    }, [dealerCards, userCards])

    const handleBet = ({currentTarget}) => {
        setBetAmt(Number(currentTarget.value));
        setDealerCards(prevState => [...prevState, getCard(false), getCard(true)]);
        setUserCards(prevState => [...prevState, getCard(false), getCard(false)]);
    };
    const handleStay = () => {
        setGameStatus('WAIT');
        const openedDealerCards = [...dealerCards];
        openedDealerCards[1].isHidden = false;
        setDealerCards(openedDealerCards);
    };
    const handleHit = () => {
        setGameStatus('HIT');
        setUserCards(prevState => [...prevState, getCard(false)]);
    };

    return (
        <>
            <div className='contents'>
                <h1>Dealer : {sumCardNumber(dealerCards)}</h1>
                <div className='field-wrap'>
                    <div className='dealer-field'>
                        {dealerCards.map(({pattern, number, isHidden}) => (
                            <Card
                                pattern={pattern}
                                number={number}
                                isHidden={isHidden}
                            />
                        ))}
                    </div>
                    <div className='betting-field'>
                        <div className='interaction-bundle-wrap'>
                            <InteractionBundle
                                onBet={handleBet}
                                onStay={handleStay}
                                onHit={handleHit}
                                gameStatus={gameStatus}
                            />
                        </div>
                    </div>
                    <div className='user-field'>
                        {userCards.map(({pattern, number, isHidden}) => (
                            <Card
                                pattern={pattern}
                                number={number}
                                isHidden={isHidden}
                            />
                        ))}
                    </div>
                </div>
                <h1>Me : {sumCardNumber(userCards)}</h1>
            </div>

        </>


    )
}

export default Home;