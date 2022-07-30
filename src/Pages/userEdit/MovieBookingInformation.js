import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import dayjs from 'dayjs';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {row.tenPhim}
        </TableCell>
        <TableCell align="center">
          <img src={row.hinhAnh} alt="" width="200px" height="200px"/>
        </TableCell>
        <TableCell align="center">{row.maVe}</TableCell>
        <TableCell align="center">
          {dayjs(row.ngayDat).format("HH:mm - DD/MM/YYYY")}
        </TableCell>
        <TableCell align="center">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.giaVe)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Theater Information
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Theater ID</TableCell>
                    <TableCell align="center">Theater Name</TableCell>
                    <TableCell align="center">Seat ID</TableCell>
                    <TableCell align="center">Seat Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.danhSachGhe.map((theaterRow) => (
                    <TableRow key={Math.random()}>
                      <TableCell component="th" scope="row" align="center">
                        {theaterRow.maRap}
                      </TableCell>
                      <TableCell align="center">{theaterRow.tenHeThongRap}</TableCell>
                      <TableCell align="center">{theaterRow.maGhe}</TableCell>
                      <TableCell align="center">
                        {theaterRow.tenGhe}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function MovieBookingInformation(rows) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center">Movie Name</TableCell>
            <TableCell align="center">Movie Image</TableCell>
            <TableCell align="center">Ticket ID</TableCell>
            <TableCell align="center">Booking Time</TableCell>
            <TableCell align="center">Payment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.rows.map((row) => (
            <Row key={row.maVe} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
