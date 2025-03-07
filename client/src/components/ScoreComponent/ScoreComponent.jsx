import { Callout, Portal, Theme } from "@radix-ui/themes";
import "./ScoreComponent.css";

function ScoreComponent({ score }) {
  return (
    <Portal>
      <Theme
        appearance="dark"
        accentColor="teal"
        grayColor="slate"
        hasBackground={false}
      >
        <Callout.Root size="2">
          <Callout.Text size="7">Score: {score}</Callout.Text>
        </Callout.Root>
      </Theme>
    </Portal>
  );
}

export { ScoreComponent };
