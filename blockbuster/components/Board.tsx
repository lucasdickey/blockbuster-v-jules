import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import GameContext from '../context/GameContext';

const Board = () => {
  const context = useContext(GameContext);
  if (!context) {
    return null;
  }
  const { gameState } = context;
  const { board } = gameState;

  return (
    <View style={styles.board}>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, cellIndex) => (
            <View key={cellIndex} style={[styles.cell, { backgroundColor: cell ? 'blue' : 'grey' }]} />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'black',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default Board;
