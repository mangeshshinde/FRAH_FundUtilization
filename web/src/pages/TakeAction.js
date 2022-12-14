import {filter, sample} from 'lodash';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import Slider from '@mui/material/Slider';

// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box,
} from '@mui/material';
import {faker} from "@faker-js/faker";

// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';


// ----------------------------------------------------------------------
const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.findName(),
  seats: faker.random.numeric(),
  from: sample(['06-02-2022']),
  to: sample(['09-11-2022']),
}));

const TABLE_HEAD = [
  { id: 'name', label: 'Customer Name', alignRight: false },
  { id: 'seats', label: 'Amount', alignRight: false },
  { id: 'from', label: 'Request Date', alignRight: false },
  { id: 'to', label: 'Due Date', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function TakeAction() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [seats,setSeats] = useState(0)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="TakeAction">

      <Container>
        <Dialog PaperProps={{
          style: {
            width: 500,
            height:500
          },
        }} open={open} onClose={handleClose}>
          <DialogTitle>New Request</DialogTitle>
          <DialogContent>
            <TextField style={{width:300}}
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
            />
              <Box sx={{
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column',
                p: 1,
                m: 1,
                borderRadius: 1,
              }}>
                From: <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                To:   <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </Box>
            <Box sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  flexDirection: 'column',
                  p: 1,
                  m: 1,
                  borderRadius: 1,
                }}>
              Select login time: <TimePicker onChange={(time)=>{}} value={new Date()} />
              Select logout time: <TimePicker onChange={(time)=>{}} value={new Date()} />
            </Box>
            <Box style={{width:300}}>
              Amount : <Slider
                  defaultValue={100000}
                  valueLabelDisplay="auto"
                  onChange={(seats)=>setSeats(seats)}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Crete Request</Button>
          </DialogActions>
        </Dialog>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Take Action
          </Typography>
          {/*<Button variant="contained" component={RouterLink} to="#" onClick={handleClickOpen} startIcon={<Iconify icon="eva:plus-fill"/>}>*/}
          {/*  New Request*/}
          {/*</Button>*/}
        </Stack>

        <Card>
          <Grid item xs={16} md={10} lg={12}>
            <UserListToolbar numSelected={selected.length} filterName={filterName} placeholder={'Search request...'} onFilterName={handleFilterByName} />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={USERLIST.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { id, avatarUrl,name, seats, from, to } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                          <TableRow
                              hover
                              key={id}
                              tabIndex={-1}
                              role="checkbox"
                              selected={isItemSelected}
                              aria-checked={isItemSelected}
                          >
                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar alt={name} src={avatarUrl} style={{marginLeft:7}} />
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{seats}</TableCell>
                            <TableCell align="left">{from}</TableCell>
                            <TableCell align="left">{to}</TableCell>
                            <TableCell align="right">
                              <UserMoreMenu moreOption={['Accept', 'Reject']} />
                            </TableCell>
                          </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                    )}
                  </TableBody>

                  {isUserNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <SearchNotFound searchQuery={filterName} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={USERLIST.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Card>
      </Container>
    </Page>
  );
}
