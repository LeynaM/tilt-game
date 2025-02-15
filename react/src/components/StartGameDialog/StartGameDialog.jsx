import { Dialog, Button, Flex, Link, TextField, Text } from "@radix-ui/themes";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { useState } from "react";

function StartGameDialog({ onStart, name, setName }) {
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
          <Flex justify="center" align="center" gap="2">
            <Text>Name:</Text>
            <TextField.Root
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setName(name.trim())}
            />
          </Flex>
          <Flex justify="center">
            <Button
              disabled={name.trim().length === 0}
              onClick={start}
              size="3"
            >
              Play
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default StartGameDialog;
