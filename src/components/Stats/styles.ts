import { Button, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "30%",
    width: "100%",
    height: 100,
    pointerEvents: "none",
    userSelect: "none",
  },
  score: {
    paddingLeft: 5,
  },
  bar: {
    marginTop: 10,
    marginBottom: 10,
    height: 2,
    width: "100%",
    backgroundColor: "red",
  },
  button: {
    backgroundColor: "black",
    width: 200,
    height: 40,
    borderRadius: 20,
    left: "50%",
    transform: "translateX(-50%)",
  },
  buttonText: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "white",
  },
});
