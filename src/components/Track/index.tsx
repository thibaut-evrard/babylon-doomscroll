import { useRef } from "react";
import { styles } from "./styles";
import { Text, View } from "react-native";

interface Props {
  transformY: number;
}

const TILES = {
  height: 500,
  count: 5,
  colors: ["#ddd", "#fff"],
};

const Track = ({ transformY }: Props) => {
  const viewRef = useRef<View>(null);
  const tileArray = Array(TILES.count).fill(1);
  const modTransform = transformY % (TILES.height * TILES.count);
  const transform = `translateY(${modTransform}px)`;

  return (
    <View style={styles.container} ref={viewRef}>
      {[0, 1].map((_, index) => (
        <View key={index}>
          {tileArray.map((_, index) => (
            <View
              key={index}
              style={{
                ...styles.tile,
                height: TILES.height,
                backgroundColor: TILES.colors[index % 2],
                transform,
              }}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

export default Track;
