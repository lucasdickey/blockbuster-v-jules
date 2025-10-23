import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import GameContext from '../context/GameContext';
import Piece from './Piece';

const Tray = () => {
  const context = useContext(GameContext);
  if (!context) {
    return null;
  }
  const { gameState } = context;
  const { pieces } = gameState;

  return (
    <View style={styles.tray}>
      {pieces.map((piece, index) => (
        <Piece key={index} shape={piece} pieceIndex={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tray: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default Tray;
