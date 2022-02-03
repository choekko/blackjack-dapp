import './InteractionBundle.css'
import {useEffect, useState} from 'react';

const InteractionBundle = (props) => {
    const { onBet, onStay, onHit, gameStatus } = props;
    const [btnStatus, setBtnStatus] = useState({});

    useEffect(() => {
        switch (gameStatus) {
            case 'BET':
                setBtnStatus({'BET': true, 'STAY': false, 'HIT': false});
                break;
            case 'SELECT':
                setBtnStatus({'BET': false, 'STAY': true, 'HIT': true});
                break;
            case 'HIT':
            case 'WAIT':
            case 'WIN':
            case 'LOSE':
                setBtnStatus({'BET': false, 'STAY': false, 'HIT': false});
                break;
            default:
                break;
        }
    }, [gameStatus]);

    const getBtnClass = (btnType) => {
        return btnStatus[btnType] ? 'interaction-btn' : 'interaction-btn off';
    }

    const handleBtnClick = (e, btnType) => {
        switch (btnType) {
            case 'BET':
                onBet(e);
                break;
            case 'STAY':
                onStay();
                break;
            case 'HIT':
                onHit();
                break;
            default:
                break;
        }
    }

    return (
        <>
            <input type='number' className="betting-input" disabled={btnStatus['BET'] === false} placeholder='배팅금액(ETH)'/>
            {Object.keys(btnStatus).map(btnType => (
                <button
                    type='button'
                    className={getBtnClass(btnType)}
                    onClick={(e) => handleBtnClick(e, btnType)}
                    disabled={btnStatus[btnType] === false}
                >
                    {btnType}
                </button>
            ))}
        </>
    )
}

export default InteractionBundle;