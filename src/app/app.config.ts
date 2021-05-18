const appConfig = {
  header: {
    navMenu: [
      {
        page: 'game',
        title: 'about game',
        url: '#/about-game',
        svgIconLink: './svg/sprite.svg#icon-question-mark',
      },
      {
        page: 'score',
        title: 'best score',
        url: '#/best-score',
        svgIconLink: './svg/sprite.svg#icon-star',
      },
      {
        page: 'settings',
        title: 'game settings',
        url: '#/game-settings',
        svgIconLink: './svg/sprite.svg#icon-gear',
      },
    ],
    btn: {
      signUp: 'register new player',
      start: 'start game',
      stop: 'stop game',
    },
  },
};

export default appConfig;
