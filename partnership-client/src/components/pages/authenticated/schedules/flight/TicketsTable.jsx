import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  withStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default function TicketsTable({ tickets }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Accordion>
      <AccordionSummary
        style={{
          backgroundColor: 'rgba(0, 0, 0, .03)',
          borderBottom: '1px solid rgba(0, 0, 0, .125)',
          marginBottom: -1,
        }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'>
        <Typography>
          {tickets.length === 1
            ? `${tickets.length} ticket`
            : `${tickets.length} tickets`}
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Grid container direction='column'>
          <Grid item>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align='center'>
                      Seat position
                    </StyledTableCell>
                    <StyledTableCell align='center'>Seat type</StyledTableCell>
                    <StyledTableCell align='center'>
                      Seat position
                    </StyledTableCell>
                    <StyledTableCell align='center'>Is booked</StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {tickets
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((ticket) => (
                      <TableRow
                        hover
                        role='checkbox'
                        tabIndex={-1}
                        key={ticket.id}>
                        <TableCell align='center'>
                          {ticket.seatPosition}
                        </TableCell>
                        <TableCell align='center'>{ticket.seatType}</TableCell>
                        <TableCell align='center'>
                          {ticket.price.toLocaleString()}
                        </TableCell>
                        <TableCell align='center'>
                          {ticket.isBooked ? '✔' : '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component='div'
              count={tickets.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
