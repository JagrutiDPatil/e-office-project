import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Button,
  Chip,
  Tabs,
  Tab,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Search,
  Add,
  FilterList,
  MoreVert,
  CheckCircle,
  Pending,
  Cancel,
  Description
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const documentStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

const mockDocuments = [
  {
    id: 'DOC-2023-001',
    title: 'Annual Budget Proposal',
    type: 'Financial',
    department: 'Finance',
    status: documentStatus.PENDING,
    created: '2023-05-15',
    deadline: '2023-06-15'
  },
  {
    id: 'DOC-2023-002',
    title: 'HR Policy Update',
    type: 'Policy',
    department: 'Human Resources',
    status: documentStatus.APPROVED,
    created: '2023-05-10',
    approved: '2023-05-12'
  },
  {
    id: 'DOC-2023-003',
    title: 'Office Renovation Plan',
    type: 'Project',
    department: 'Administration',
    status: documentStatus.REJECTED,
    created: '2023-05-01',
    rejected: '2023-05-05',
    reason: 'Exceeds budget'
  }
];

export default function Documents() {
  const [documents, setDocuments] = useState(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());
  const handleFilterChange = (event, newValue) => setFilterStatus(newValue);
  const handleMenuOpen = (event, doc) => {
    setAnchorEl(event.currentTarget);
    setSelectedDoc(doc);
  };
  const handleMenuClose = () => setAnchorEl(null);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm) || 
                         doc.id.toLowerCase().includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusChip = (status) => {
    switch (status) {
      case documentStatus.PENDING:
        return <Chip icon={<Pending />} label="Pending" color="warning" />;
      case documentStatus.APPROVED:
        return <Chip icon={<CheckCircle />} label="Approved" color="success" />;
      case documentStatus.REJECTED:
        return <Chip icon={<Cancel />} label="Rejected" color="error" />;
      default:
        return <Chip label="Unknown" />;
    }
  };

  const handleCreateNew = () => navigate('/documents/new');
  const handleViewDetails = (id) => navigate(`/documents/${id}`);

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Documents</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleCreateNew}
        >
          New Document
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search documents..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              value={searchTerm}
              onChange={handleSearch}
              sx={{ mr: 2 }}
            />
            <IconButton aria-label="filter">
              <FilterList />
            </IconButton>
          </Box>

          <Tabs
            value={filterStatus}
            onChange={handleFilterChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="All" value="all" />
            <Tab label="Pending" value={documentStatus.PENDING} />
            <Tab label="Approved" value={documentStatus.APPROVED} />
            <Tab label="Rejected" value={documentStatus.REJECTED} />
          </Tabs>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow 
                    key={doc.id}
                    hover
                    onClick={() => handleViewDetails(doc.id)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{doc.id}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Description color="primary" sx={{ mr: 1 }} />
                        {doc.title}
                      </Box>
                    </TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>{doc.department}</TableCell>
                    <TableCell>{getStatusChip(doc.status)}</TableCell>
                    <TableCell>{doc.created}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMenuOpen(e, doc);
                        }}
                      >
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          handleViewDetails(selectedDoc?.id);
          handleMenuClose();
        }}>
          View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>Download</MenuItem>
        <MenuItem onClick={handleMenuClose}>Share</MenuItem>
        {selectedDoc?.status === documentStatus.PENDING && (
          <MenuItem onClick={handleMenuClose}>Approve/Reject</MenuItem>
        )}
      </Menu>
    </Box>
  );
}