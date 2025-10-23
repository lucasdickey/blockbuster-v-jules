import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { PanGestureHandler, Gesture } from 'react-native-gesture-handler';
import GameContext from '../context/GameContext';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

type PieceProps = {
  shape: number[][];
  pieceIndex: number;
};

const Piece = ({ shape, pieceIndex }: PieceProps) => {
  const context = useContext(GameContext);
  if (!context) {
    return null;
  }
  const { gameState, placePiece } = context;
  const { board } = gameState;

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const canPlacePiece = (row: number, col: number) => {
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[0].length; c++) {
        if (
          shape[r][c] &&
          (board[row + r] === undefined || board[row + r][col + c] !== 0)
        ) {
          return false;
        }
      }
    }
    return true;
  };

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      const col = Math.floor(event.absoluteX / 40);
      const row = Math.floor(event.absoluteY / 40);
      if (canPlacePiece(row, col)) {
        runOnJS(placePiece)(shape, row, col, pieceIndex);
      }
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <PanGestureHandler gesture={gesture}>
      <Animated.View style={[styles.piece, animatedStyle]}>
        {shape.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, cellIndex) => (
              <View
                key={cellIndex}
                style={[
                  styles.cell,
                  { backgroundColor: cell ? 'green' : 'transparent' },
                ]}
              />
            ))}
          </View>
        ))}
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  piece: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 20,
    height: 20,
  },
});

export default Piece;
