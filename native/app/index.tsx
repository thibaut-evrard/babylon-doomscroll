import Stats from "@/src/components/Stats";
import Track from "@/src/components/Track";
import { useFrame } from "@/src/hooks/useFrame";
import { useScrollSystem } from "@/src/hooks/useScrollHandler";
import { globalStyle } from "@/src/style/global";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scroll = useScrollSystem();

  useFrame(() => {
    scroll.update();
    const { position } = scroll.status.current;
    setScrollPosition(position);
  });

  return (
    <View style={globalStyle.container} {...scroll.handlers.panHandlers}>
      <Track transformY={scrollPosition} />
      <Stats scrollDistance={scrollPosition} />
    </View>
  );
}
