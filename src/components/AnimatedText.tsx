import {
  Animated,
  RegisteredStyle,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import React from "react";

interface props {
  text: string;
  style?: TextStyle;
  delay?: number;
}

const AnimatedText = ({ style, text, delay = 0 }: props) => {
  const [movAnim] = React.useState(new Animated.Value(-300));
  const [scaleAnim] = React.useState(new Animated.Value(0.5));

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(movAnim, {
        toValue: 0,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
    ]).start();
    return () => {
      movAnim.removeAllListeners();
      scaleAnim.removeAllListeners();
    };
  }, []);

  return (
    <Animated.Text
      style={[
        style,
        { transform: [{ translateY: movAnim }, { scale: scaleAnim }] },
        {
          opacity: movAnim.interpolate({
            inputRange: [-300, 0],
            outputRange: [0, 1],
          }),
        },
      ]}
    >
      {text}
    </Animated.Text>
  );
};

export default AnimatedText;

const styles = StyleSheet.create({});
