import React from 'react';

export const Songs = {
  AlphaDecay: require('../../Assets/Music/AlphaDecay.mp3'),
  Autobahn: require('../../Assets/Music/Autobahn.mp3'),
  Mastret: require('../../Assets/Music/Mastret.mp3'),
};

export default ({ song, muted }) => <audio autoPlay loop src={song} muted={muted || false} />