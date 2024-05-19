import { Animated, StyleSheet, Text, View } from "react-native";
import React from "react";

interface props {
  duration: number;
  delay?: number;
  children: React.ReactNode;
}
const OpacityAnimation = ({ duration, children, delay = 0 }: props) => {
  const [animation] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      useNativeDriver: true,
      duration,
      delay,
    }).start();
    return () => {
      animation.removeAllListeners();
    };
  }, []);

  return (
    <Animated.View style={{ opacity: animation }}>{children}</Animated.View>
  );
};

export default OpacityAnimation;

const styles = StyleSheet.create({});
