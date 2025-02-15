import { Table } from "@radix-ui/themes";
import { useEffect } from "react";
import { useState } from "react";
import "./ScoreTable.css";

function ScoreTable({ scores, newScoreId }) {
  const [index, setIndex] = useState(false);

  useEffect(() => {
    setIndex(scores.findIndex((s) => s.id === newScoreId));
  }, [scores]);

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Rank</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Score</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {scores.slice(0, 3).map((s) => (
          <Table.Row
            key={s.id}
            className={s.id === newScoreId ? "highlight-row" : ""}
          >
            <Table.Cell> {s.rank} </Table.Cell>
            <Table.Cell> {s.player} </Table.Cell>
            <Table.Cell> {s.score} </Table.Cell>
          </Table.Row>
        ))}
        {index > 4 && (
          <Table.Row>
            <Table.Cell>⋮</Table.Cell>
            <Table.Cell>⋮</Table.Cell>
            <Table.Cell>⋮</Table.Cell>
          </Table.Row>
        )}
        {index > 3 && (
          <Table.Row>
            <Table.Cell> {scores[index - 1].rank}</Table.Cell>
            <Table.Cell>{scores[index - 1].player}</Table.Cell>
            <Table.Cell>{scores[index - 1].score}</Table.Cell>
          </Table.Row>
        )}
        {index > 2 && (
          <Table.Row className="highlight-row">
            <Table.Cell> {scores[index].rank}</Table.Cell>
            <Table.Cell>{scores[index].player}</Table.Cell>
            <Table.Cell>{scores[index].score}</Table.Cell>
          </Table.Row>
        )}
        {index > 2 && scores.length - 1 > index && (
          <Table.Row>
            <Table.Cell> {scores[index + 1].rank}</Table.Cell>
            <Table.Cell>{scores[index + 1].player}</Table.Cell>
            <Table.Cell>{scores[index + 1].score}</Table.Cell>
          </Table.Row>
        )}
        {((index < 3 && scores.length > 3) ||
          (index > 2 && scores.length - 2 > index)) && (
          <Table.Row>
            <Table.Cell>⋮</Table.Cell>
            <Table.Cell>⋮</Table.Cell>
            <Table.Cell>⋮</Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table.Root>
  );
}

export { ScoreTable };
