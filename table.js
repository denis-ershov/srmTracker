import React from "react";
    import { makeStyles } from "@material-ui/core/styles";
    import Table from "@material-ui/core/Table";
    import TableBody from "@material-ui/core/TableBody";
    import TableCell from "@material-ui/core/TableCell";
    import TableContainer from "@material-ui/core/TableContainer";
    import TableHead from "@material-ui/core/TableHead";
    import TableRow from "@material-ui/core/TableRow";
    import Paper from "@material-ui/core/Paper";

    const useStyles = makeStyles({
      table: {
        minWidth: 650,
      },
    });

    function createData(name, orname, amname, season, date, status) {
      return { name, orname, amname, season, date, status };
    }

    const rows = [
      createData(
        "Ведьмак",
        "The Witcher",
        "The Witcher",
        "2 сезон",
        "2021",
        "Производство"
      ),
      createData(
        "Очень странные дела",
        "Stranger Things",
        "Stranger Things",
        "4 сезон",
        "2021",
        "Производство"
      ),
      createData(
        "Мир Дикого Запада",
        "Westworld",
        "Westworld",
        "4 сезон",
        "2021",
        "Производство"
      ),
    ];

    export default function DenseTable() {
      const classes = useStyles();

      return (
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Название</TableCell>
                <TableCell align="right">Оригинальное название</TableCell>
                <TableCell align="right">Английское название</TableCell>
                <TableCell align="right">Сезон</TableCell>
                <TableCell align="right">Дата релиза</TableCell>
                <TableCell align="right">Статус</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.orname}</TableCell>
                  <TableCell align="right">{row.amname}</TableCell>
                  <TableCell align="right">{row.season}</TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }