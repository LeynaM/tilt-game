import { Dialog, Button, Flex, Link } from "@radix-ui/themes";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { useState } from "react";

function StartGameDialog({ onStart }) {
  const [open, setOpen] = useState(true);

  const overrideClose = () => {
    setOpen(true);
  };

  const start = () => {
    onStart();
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={overrideClose}>
      <Dialog.Content
        maxWidth="450px"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Flex p="4" gap="6" direction="column">
          <Dialog.Title size="8" align="center" mb="0">
            Tilt Game
          </Dialog.Title>
          <Dialog.Description align="center" size="4">
            Use the mouse to tilt the platform and guide the ball to the green
            square. Don&apos;t roll into a hole or off the edge!
            <br />
            <Link
              href="https://github.com/LeynaM/tilt-game"
              target="_blank"
              rel="noopener noreferrer"
            >
              Code available on GitHub. <ExternalLinkIcon />
            </Link>
          </Dialog.Description>
          <Flex justify="center">
            <Button onClick={start} size="3">
              Play
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default StartGameDialog;
