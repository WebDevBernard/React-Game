import "./App.css";
import SingleCard from "./components/SingleCard";
import { useState, useEffect } from "react";
const cardImages = [
  {
    src: "https://archives.bulbagarden.net/media/upload/thumb/7/73/002Ivysaur.png/600px-002Ivysaur.png",
    matched: false,
    name: "Ivysaur"
  },
  {
    src: "https://archives.bulbagarden.net/media/upload/thumb/7/7e/006Charizard.png/600px-006Charizard.png",
    matched: false,
    name: "Charizard"
  },
  {
    src: "https://archives.bulbagarden.net/media/upload/thumb/3/39/007Squirtle.png/600px-007Squirtle.png",
    matched: false,
    name: "Squirtle"
  },
  {
    src: "https://archives.bulbagarden.net/media/upload/thumb/e/e2/133Eevee.png/600px-133Eevee.png",
    matched: false,
    name: "Eevee"
  },
  {
    src: "https://archives.bulbagarden.net/media/upload/thumb/3/3e/096Drowzee.png/600px-096Drowzee.png",
    matched: false,
    name: "Drowzee"
  },
  {
    src: "https://archives.bulbagarden.net/media/upload/thumb/6/60/037Vulpix.png/600px-037Vulpix.png",
    matched: false,
    name: "Vulpix"
  },
  {
    src: "https://archives.bulbagarden.net/media/upload/thumb/0/0d/025Pikachu.png/600px-025Pikachu.png",
    matched: false,
    name: "Pikachu"
  },
  {
    src: "https://archives.bulbagarden.net/media/upload/thumb/7/7f/209Snubbull.png/600px-209Snubbull.png",
    matched: false,
    name: "Snubbull"
  },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [victory, setVictory] = useState(false);

  // randomizes cards
  const shuffleCards = () => {
    // duplicates each card
    const shuffledCards = [...cardImages, ...cardImages]
      // this randomizes the order of the cards
      .sort(() => Math.random() - 0.5)
      // returns the new array of the sorted array
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // handle a choice

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // reset choices

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };
  // compare 2 selected cards

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // starts game automatically

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <div className="menu">
        <button onClick={shuffleCards}>New Game</button>
        <span className="menu">
          Turns Taken:
          <p> {turns}</p>
        </span>
      </div>
      <p>Flip the Pokeball to find a matching Pokemon</p>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            matched={card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <div className="footer">
        <br />
        <div>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.flaticon.com/free-icons/pokemon"
            title="pokemon icons"
          >
            Pokemon icons created by Darius Dan - Flaticon
          </a>
          <a target="_blank" rel="noreferrer" href="https://bulbagarden.net/">
            All other images and background from bulbagarden.net
          </a>
        </div>
        <br />
      </div>
    </div>
  );
}

export default App;
