import React, { useEffect, useState } from 'react'
import { Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, TablePagination, Box, InputAdornment, Grid, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WcIcon from '@mui/icons-material/Wc';
import { User } from '../Information/user';

function AdminPannel({SetSelectedLink, link}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});

  useEffect(()=>{
     SetSelectedLink(link);
  }, [])

  const handleDeleteProfile = (id) => {
    // Logic to delete a profile goes here
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredUsers = User.filter(user => {
    return Object.keys(filters).every(key => {
      if (!filters[key]) return true;
      return String(user[key]).toLowerCase().includes(filters[key].toLowerCase());
    });
  }).filter(user => {
    if (!searchTerm) return true;
    return Object.values(user).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredUsers.length - page * rowsPerPage);
  
  return (
    <Container>
      <Box sx={{p:1}}> 
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        InputProps={{      
        startAdornment: (
            <InputAdornment position="end">
            <SearchIcon /> 
            </InputAdornment>
          ),
        }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      </Box>
     <Box sx={{ p:1, border:1, borderRadius:2}}>
      <Typography variant='h6'  sx={{pb:2, color:'blue'}}> Filter</Typography>
      <Grid container spacing={2}>
        <Grid xs={3.7} sx={{p:1,ml:2}}><TextField
        name="Name"
        label="Name"
        variant="outlined"
        fullWidth
        InputProps={{      
          startAdornment: (
              <InputAdornment position="end">
              <PersonIcon /> 
              </InputAdornment>
            ),
          }}
        value={filters.Name || ''}
        onChange={handleFilterChange}
      /></Grid>
        <Grid xs={3.7} sx={{p:1}}><TextField
        name="location"
        label="Location"
        variant="outlined"
        fullWidth
        InputProps={{      
          startAdornment: (
              <InputAdornment position="end">
              <LocationOnIcon /> 
              </InputAdornment>
            ),
          }}

        value={filters.location || ''}
        onChange={handleFilterChange}
      /></Grid>
        <Grid xs={3.7} sx={{p:1}}>
      <TextField
        name="gender"
        label="Gender"
        variant="outlined"
        fullWidth
        InputProps={{      
          startAdornment: (
              <InputAdornment position="end">
              <WcIcon /> 
              </InputAdornment>
            ),
          }}
        value={filters.gender || ''}
        onChange={handleFilterChange}
      /></Grid>
      </Grid>
     </Box>
     <Box sx={{display:'flex', justifyContent:'flex-end', m:1}}>
     <Button variant="contained" color="primary">
        Add Profile
      </Button>
     </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Photo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(user => (
                <TableRow key={user.id}>
                  <TableCell>{<Avatar alt={user.Name} src={user.avatar} sx={{ width: 50, height: 50}} />}</TableCell>
                  <TableCell>{user.Name}</TableCell>
                  <TableCell>{user.location}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>
                  <Button variant='contained' color='success'sx={{m:1}} onClick={() => handleDeleteProfile(user.id)}>Edit</Button>
                    <Button variant='contained' color='error' onClick={() => handleDeleteProfile(user.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={5}>
                  <Typography variant="body1" align="center">
                    No data found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 6, 9]}
        component="div"
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  )
}
export default AdminPannel