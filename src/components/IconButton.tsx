import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Icons from "@expo/vector-icons/MaterialIcons";

type iconProps = React.ComponentProps<typeof Icons>;

interface props extends iconProps {}

const IconButton = ({ style, ...props }: props) => {
  const [animation] = React.useState(new Animated.Value(0));

  const onPress = () => {
    Animated.spring(animation, { toValue: 1, useNativeDriver: true }).start();
  };

  React.useEffect(() => {
    animation.addListener(({ value }) => {
      if (value === 1) animation.setValue(0);
    });
    return () => animation.removeAllListeners();
  }, []);

  return (
    <Animated.View
      style={{
        transform: [
          {
            rotate: animation.interpolate({
              inputRange: [0, 1],
              outputRange: ["0deg", "360deg"],
            }),
          },
        ],
      }}
    >
      <TouchableOpacity style={style} onPress={onPress}>
        <Icons {...props} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default IconButton;

const styles = StyleSheet.create({});
