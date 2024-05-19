import { Animated, StyleSheet, Text, View } from "react-native";
import React from "react";
import IconButton from "./IconButton";

interface props {
  title: string;
  children: React.ReactNode;
  onCloseCard?: Function;
}
const Card = ({ title, children, onCloseCard }: props) => {
  const [animation] = React.useState(new Animated.Value(0));

  const onClose = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => onCloseCard());
  };

  React.useEffect(() => {
    Animated.timing(animation, { toValue: 1, useNativeDriver: true }).start();
    return () => {
      animation.removeAllListeners();
    };
  }, []);

  return (
    <Animated.View
      style={[styles.container, { transform: [{ scaleY: animation }] }]}
    >
      {onCloseCard && (
        <IconButton
          style={styles.close}
          name="close"
          color="#ffffff"
          size={45}
          onPress={onClose}
        />
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </Animated.View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    overflow: "hidden",
  },
  content: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#ffffff",
    height: "90%",
    width: "100%",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "500",
    fontSize: 30,
    fontFamily: "NovaSquareRegular",
    color: "#ffffff",
    alignSelf: "center",
    paddingTop: 20,
  },
  close: {
    position: "absolute",
    right: 10,
    top: 20,
    color: "#ffffff",
    backgroundColor: "#2d2d2d",
    width: 45,
    height: 45,
    borderRadius: 7,
  },
});
