import { Dialog, Button, Flex, Text, Spinner } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { fetchAllScores, saveScore } from "../../utils/utils";
import { ScoreTable } from "../ScoreTable/ScoreTable";

function GameOverDialog({ open, onStart, score }) {
  const [allScores, setAllScores] = useState([]);
  const [newScore, setNewScores] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveScoreAndFetchScores = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await saveScore({ player: "test", score });
      setNewScores(res.score);
      const scores = await fetchAllScores();
      setAllScores(scores);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      saveScoreAndFetchScores();
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

          {loading && <Spinner />}
          {error && <Text color="red">{error}</Text>}

          {!loading && !error && (
            <Flex direction="column" gap="2">
              <ScoreTable scores={allScores} newScoreId={newScore?.id} />
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
