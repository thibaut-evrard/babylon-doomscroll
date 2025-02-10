import { View, Text, Button } from "react-native";
import { styles } from "./styles";
import { useEffect, useRef, useState } from "react";

interface Props {
  scrollDistance: number;
}

const CONTENT = {
  cta: "end doomscroll",
};
const PX_TO_M = 0.0005;
const CTA_TIMEOUT = 500;

const Stats = ({ scrollDistance }: Props) => {
  const timeoutRef = useRef<any>(null);
  const distance = (scrollDistance * PX_TO_M).toFixed(4);
  const [isCta, setIsCta] = useState(false);

  useEffect(() => {
    console.log(distance);
    setIsCta(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsCta(true);
    }, CTA_TIMEOUT);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [distance]);

  return (
    <View style={styles.container}>
      <View style={styles.score}>
        <Text>score: {distance}</Text>
      </View>
      <View style={styles.bar}></View>
      {isCta && (
        <View style={styles.button}>
          <Text style={styles.buttonText}>{CONTENT.cta}</Text>
        </View>
      )}
    </View>
  );
};

export default Stats;
