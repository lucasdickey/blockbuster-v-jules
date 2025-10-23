import { View, Text, StyleSheet, Button } from 'react-native';
import Board from '../components/Board';
import Tray from '../components/Tray';
import GameContext from '../context/GameContext';
import { useContext } from 'react';

export default function Game() {
  const context = useContext(GameContext);
  if (!context) {
    return null;
  }
  const { gameState, startNewGame } = context;
  const { score } = gameState;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blockbuster</Text>
      <Text style={styles.score}>Score: {score}</Text>
      <Board />
      <Tray />
      <Button title="New Game" onPress={startNewGame} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  score: {
    fontSize: 20,
    marginBottom: 10,
  },
});
