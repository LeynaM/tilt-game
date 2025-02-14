import { Dialog, Button, Flex, Text, Spinner } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { fetchAllScores, saveScore } from "../../utils/utils";

function GameOverDialog({ open, onStart, score }) {
  const [allScores, setAllScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open) {
      setLoading(true);
      setError(null);
      saveScore({ player: "test", score })
        .then(() =>
          fetchAllScores()
            .then((data) => setAllScores(data))
            .catch((err) => {
              console.log(err);
              setError("Failed to load scores");
            }),
        )
        .finally(() => setLoading(false));
    }
  }, [open]);

  return (
    <Dialog.Root open={open}>
      <Dialog.Content
        maxWidth="450px"
        onOpenAutoFocus={(e) => e.preventDefault()}
        aria-describedby={undefined}
      >
        <Flex p="4" gap="6" direction="column">
          <Dialog.Title size="8" align="center" mb="0">
            Game Over!
          </Dialog.Title>
          <Text>Score: {score}</Text>

          {loading && <Spinner />}
          {error && <Text color="red">{error}</Text>}

          {!loading && !error && (
            <Flex direction="column" gap="2">
              <Text>Top Scores:</Text>
              {allScores.map((s) => (
                <Text key={s.id}>
                  {s.player}: {s.score}
                </Text>
              ))}
            </Flex>
          )}

          <Flex justify="center">
            <Button onClick={onStart} size="3">
              Play again
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default GameOverDialog;
