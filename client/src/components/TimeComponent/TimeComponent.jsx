import { Callout, Portal, Theme } from "@radix-ui/themes";
import { useEffect, useState, useRef } from "react";
import styles from "./TimeComponent.module.css";
import { formatElapsedTime } from "../../utils/utils";

function TimeComponent({ startTime, finishTime }) {
  const [elapsedTime, setElapsedTime] = useState(null);
  const intervalId = useRef(null); // Use a ref to persist the intervalId across renders

  useEffect(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }

    if (startTime) {
      intervalId.current = setInterval(() => {
        console.log("interval");
        const currentElapsedTime = Date.now() - startTime;
        setElapsedTime(formatElapsedTime(currentElapsedTime));
      }, 100);
    }
  }, [startTime]);

  useEffect(() => {
    if (!finishTime) return;

    clearInterval(intervalId.current);
    const elapsedTime = finishTime - startTime;
    setElapsedTime(formatElapsedTime(elapsedTime));
  }, [startTime, finishTime]);

  return (
    <Portal>
      <Theme
        appearance="dark"
        accentColor="teal"
        grayColor="slate"
        hasBackground={false}
      >
        <Callout.Root className={styles.time} size="2">
          <Callout.Text size="7">Time: {elapsedTime}</Callout.Text>
        </Callout.Root>
      </Theme>
    </Portal>
  );
}

export { TimeComponent };
