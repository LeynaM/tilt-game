import { Table } from "@radix-ui/themes";
import { useEffect } from "react";
import { useState } from "react";
import "./ScoreTable.css";

function ScoreTable({ scores, newScoreId }) {
  const [topFive, setTopFive] = useState([]);

  useEffect(() => {
    const sorted = scores.toSorted((a, b) => b.score - a.score);
    setTopFive(sorted.slice(0, 5));
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
        {topFive.map((s, index) => (
          <Table.Row
            key={s.id}
            className={s.id === newScoreId ? "highlight-row" : ""}
          >
            <Table.Cell> {index + 1} </Table.Cell>
            <Table.Cell> {s.player} </Table.Cell>
            <Table.Cell> {s.score} </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

export { ScoreTable };
