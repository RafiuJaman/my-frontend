import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";

function TableComponent() {
  const data = [
    {
      id: 1,
      name: "John Doe",
      job: "Software Engineer",
    },
    {
      id: 2,
      name: "Jane Doe",
      job: "Product Manager",
    },
    {
      id: 3,
      name: "James Smith",
      job: "Data Scientist",
    },
    {
      id: 4,
      name: "Jenny Smith",
      job: "UX Designer",
    },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Job</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.job}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableComponent;
