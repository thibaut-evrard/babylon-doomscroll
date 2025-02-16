import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    pointerEvents: "none",
    userSelect: "none",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  tile: {
    pointerEvents: "none",
    userSelect: "none",
    transform: "translateX(20px)",
  },
  text: {
    pointerEvents: "none",
    userSelect: "none",
  },
});
