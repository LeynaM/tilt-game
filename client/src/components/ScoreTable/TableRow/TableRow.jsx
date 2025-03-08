import { Table } from "@radix-ui/themes";
import { formatElapsedTime } from "../../../utils/utils";
import "./TableRow.css";

function TableRow({ row, highlight = false }) {
  return (
    <Table.Row className={highlight ? "highlight-row" : ""}>
      <Table.Cell>{row.rank}</Table.Cell>
      <Table.Cell>{row.player}</Table.Cell>
      <Table.Cell>{row.score}</Table.Cell>
      <Table.Cell>{formatElapsedTime(row.time)}</Table.Cell>
    </Table.Row>
  );
}

export { TableRow };
