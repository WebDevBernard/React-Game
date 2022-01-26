import "./App.css";
import SingleCard from "./components/SingleCard";
import { useState, useEffect, useCallback } from "react";
const cardImages = [
  {
    src: "/img/bullbasaur.png",
    matched: false,
    name: "Bulbasaur",
  },
  {
    src: "/img/eevee.png",
    matched: false,
    name: "Eevee",
  },
  {
    src: "/img/mankey.png",
    matched: false,
    name: "Mankey",
  },
  {
    src: "/img/psyduck.png",
    matched: false,
    name: "Psyduck",
  },
  {
    src: "/img/zubat.png",
    matched: false,
    name: "Zubat",
  },
  {
    src: "/img/rattata.png",
    matched: false,
    name: "Rattata",
  },
  {
    src: "/img/pidgey.png",
    matched: false,
    name: "Pidgey",
  },
  {
    src: "/img/caterpie.png",
    matched: false,
    name: "Caterpie",
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

    setVictory(false);
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

  // finds when all cards match
  const findVictory = useCallback(() => {
    let counter = 0;
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].matched) {
        counter += 1;
      }
    }
    return counter;
  }, [cards]);

  // compare 2 selected cards

  useEffect(() => {
    if (findVictory() === cards.length) {
      setVictory(true);
    }
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
  }, [choiceOne, choiceTwo, cards.length, findVictory]);

  // starts game automatically

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <div className="menu">
        <button onClick={shuffleCards}>New Game</button>
        <span className="score">
          Turns Taken:
          <p> {turns}</p>
        </span>
      </div>
      {victory && <p className="score">You found 'em all!</p>}
      {!victory && <p>Flip the Pokeball to find a matching Pokemon</p>}
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <div className="footer">
        <br />
        <div>
          <a target="_blank" rel="noreferrer" href="https://bulbagarden.net/">
            Background Image from bulbagarden.net
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.flaticon.com/free-icons/pokemon"
            title="pokemon icons"
          >
            Pokemon icons created by Darius Dan - Flaticon
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.flaticon.com/free-icons/pokemon"
            title="pokemon icons"
          >
            Pokemon icons created by Roundicons Freebies - Flaticon
          </a>
        </div>
        <br />
      </div>
    </div>
  );
}

export default App;
