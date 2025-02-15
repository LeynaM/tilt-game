import { Dialog, Button, Flex, Text, Box, Skeleton } from "@radix-ui/themes";
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
    } catch {
      setError("Something went wrong. Please refresh the page and try again.");
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
            <Skeleton loading={loading}>
              {(() => {
                if (error) {
                  return "Error!";
                }
                if (allScores[0]?.id === newScore?.id) {
                  return "New Highscore!";
                }
                return "Game Over!";
              })()}
            </Skeleton>
          </Dialog.Title>

          <Skeleton loading={loading} minHeight={"176px"}>
            {error ? (
              <Text color="red">{error}</Text>
            ) : (
              <Box>
                <ScoreTable scores={allScores} newScoreId={newScore?.id} />
              </Box>
            )}
          </Skeleton>

          <Flex justify="center">
            <Skeleton loading={loading}>
              <Button
                onClick={error ? () => window.location.reload() : onStart}
                size="3"
              >
                {error ? "Refresh page" : "Play again"}
              </Button>
            </Skeleton>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default GameOverDialog;
