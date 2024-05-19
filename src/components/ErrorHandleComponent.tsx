import { Animated, StyleSheet, Text, View } from "react-native";
import React, { Fragment } from "react";
import { ApplicationError, NetworkError, ServerError } from "../errors/Errors";

interface props {
  children: React.ReactNode;
  error: Error | null;
}
const ErrorHandleComponent = ({ children, error }: props) => {
  const [animation] = React.useState(new Animated.Value(0.8));

  React.useEffect(() => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    });
    return () => {
      animation.removeAllListeners();
    };
  }, []);

  function handleErrorStatus(error: Error): React.ReactNode {
    switch (true) {
      case error instanceof NetworkError:
        return <ErrorComponent title={error.name} causes={[error.message]} />;
      case error instanceof ServerError:
        return <ErrorComponent title={error.name} causes={[error.message]} />;
      case error instanceof ApplicationError:
        return <ErrorComponent title={error.name} causes={[error.message]} />;
      default:
        return <ErrorComponent title={error.name} causes={[error.message]} />;
    }
  }

  return error !== null ? (
    <Animated.View style={[{ transform: [{ scale: animation }] }]}>
      {handleErrorStatus(error)}
    </Animated.View>
  ) : (
    <Fragment>{children}</Fragment>
  );
};

interface ErrorComponentProps {
  title: string;
  causes: string[];
}

function ErrorComponent({ title, causes }: ErrorComponentProps) {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.title}>{title}</Text>
      <View>
        {causes.map((value) => (
          <Text style={styles.cause} key={value}>
            ● {value};
          </Text>
        ))}
      </View>
    </View>
  );
}

export default ErrorHandleComponent;

const styles = StyleSheet.create({
  errorContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
  },
  title: {
    fontFamily: "NovaSquareRegular",
    fontSize: 35,
    marginBottom: 30,
    textAlign: "center",
  },
  cause: {
    fontFamily: "NovaSquareRegular",
    fontSize: 20,
    color: "#2d2d2d",
  },
});
