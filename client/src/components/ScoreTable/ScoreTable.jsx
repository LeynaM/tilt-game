import { Table } from "@radix-ui/themes";
import { useEffect } from "react";
import { useState } from "react";
import { TableRow } from "./TableRow/TableRow";

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
          <Table.ColumnHeaderCell>Time</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {scores.slice(0, 3).map((s) => (
          <TableRow key={s.id} highlight={s.id === newScoreId} row={s} />
        ))}
        {index > 4 && (
          <Table.Row>
            <Table.Cell>⋮</Table.Cell>
            <Table.Cell>⋮</Table.Cell>
            <Table.Cell>⋮</Table.Cell>
            <Table.Cell>⋮</Table.Cell>
          </Table.Row>
        )}
        {index > 3 && <TableRow row={scores[index - 1]} />}
        {index > 2 && <TableRow highlight={true} row={scores[index]} />}
        {index > 2 && scores.length - 1 > index && (
          <TableRow row={scores[index + 1]} />
        )}
        {((index < 3 && scores.length > 3) ||
          (index > 2 && scores.length - 2 > index)) && (
          <Table.Row>
            <Table.Cell>⋮</Table.Cell>
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
