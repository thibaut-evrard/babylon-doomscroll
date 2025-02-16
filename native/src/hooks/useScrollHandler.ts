import { useRef } from "react";
import { PanResponder } from "react-native";
import { lerp } from "../utils/lerp";

interface ScrollStatus {
  isAction: boolean;
  actionY: number | null;
  deltaY: number;
  velocity: number;
  position: number;
}

const DEFAULT_SCROLL_STATUS: ScrollStatus = {
  isAction: false,
  actionY: null,
  deltaY: 0,
  velocity: 0,
  position: 0,
};

const VELOCITY_SCALE = 3;
const SCROLL_DAMPING = 0.05;

export const useScrollSystem = () => {
  const status = useRef<ScrollStatus>(DEFAULT_SCROLL_STATUS);
  const handlers = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove(e, gestureState) {
        const newActionY = gestureState.moveY;

        if (status.current.actionY !== null) {
          const deltaY = newActionY - status.current.actionY;
          status.current.deltaY = deltaY;
        }

        status.current.actionY = newActionY;
        status.current.velocity = gestureState.vy * VELOCITY_SCALE;
      },
      onPanResponderStart() {
        status.current.isAction = true;
        status.current.actionY = null;
        status.current.deltaY = 0;
        status.current.velocity = 0;
      },
      onPanResponderEnd() {
        status.current.isAction = false;
        status.current.actionY = null;
        status.current.deltaY = 0;
      },
    })
  ).current;

  const update = () => {
    if (status.current.isAction) {
      status.current.position += status.current.deltaY;
    } else {
      status.current.position += status.current.velocity;
      status.current.velocity = lerp(
        status.current.velocity,
        0,
        SCROLL_DAMPING
      );
    }
  };

  return {
    update,
    status,
    handlers,
  };
};
