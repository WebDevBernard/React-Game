import "./SingleCard.css";

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt={card.name} />
        <img
          className="back"
          src="/img/pokeball.png"
          alt="card back"
          onClick={handleClick}
          onDoubleClick={handleClick}
        />
      </div>
    </div>
  );
}
