import './Card.css';

const Card = (props) => {
    const { pattern, number, isHidden } = props;
    const className = isHidden ? 'card back' : 'card';
    const outsideNumberMap = {
        11 : 'J',
        12 : 'Q',
        13 : 'K',
    }
    const numberToString = number <= 10 ? number.toString() : outsideNumberMap[number];

    return (
        <div className={className}>
            <span>{pattern}{numberToString}</span>
        </div>
    )
}

export default Card;