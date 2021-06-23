import React from 'react';
import ReactDOM from 'react-dom';
import { Card } from 'card/card';
import { CardsField } from 'cards-field/cards-field';

const cardsData = [
  {
    word: 'cry',
    translation: 'плакать',
    image: 'data/img/cry.jpg',
    audio: 'data/audio/cry.mp3',
  },
  {
    word: 'dance',
    translation: 'танцевать',
    image: 'data/img/dance.jpg',
    audio: 'data/audio/dance.mp3',
  },
  {
    word: 'dive',
    translation: 'нырять',
    image: 'data/img/dive.jpg',
    audio: 'data/audio/dive.mp3',
  },
  {
    word: 'draw',
    translation: 'рисовать',
    image: 'data/img/draw.jpg',
    audio: 'data/audio/draw.mp3',
  },
  {
    word: 'fish',
    translation: 'ловить рыбу',
    image: 'data/img/fish.jpg',
    audio: 'data/audio/fish.mp3',
  },
  {
    word: 'fly',
    translation: 'летать',
    image: 'data/img/fly.jpg',
    audio: 'data/audio/fly.mp3',
  },
  {
    word: 'hug',
    translation: 'обнимать',
    image: 'data/img/hug.jpg',
    audio: 'data/audio/hug.mp3',
  },
  {
    word: 'jump',
    translation: 'прыгать',
    image: 'data/img/jump.jpg',
    audio: 'data/audio/jump.mp3',
  },
];

const App = () => {
  return (
    <div>
      <h1>English for kids!</h1>
      <CardsField cards={cardsData} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.body
);
