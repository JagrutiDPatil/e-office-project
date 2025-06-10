import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Grid
} from '@mui/material';
import {
  ArrowBack,
  CheckCircle,
  Pending,
  Cancel,
  Description,
  Edit,
  Share,
  Download
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

const mockDocument = {
  id: 'DOC-2023-001',
  title: 'Annual Budget Proposal',
  type: 'Financial',
  department: 'Finance',
  status: 'pending',
  created: '2023-05-15',
  deadline: '2023-06-15',
  description: 'Proposal for the annual budget allocation across departments',
  author: 'John Doe',
  file: 'budget_proposal_2023.pdf',
  history: [
    { date: '2023-05-15', action: 'Created', by: 'John Doe' },
    { date: '2023-05-16', action: 'Sent for approval', by: 'John Doe' }
  ]
};

export default function DocumentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const document = mockDocument; // In real app, fetch by ID

  const getStatusChip = () => {
    switch (document.status) {
      case 'pending':
        return <Chip icon={<Pending />} label="Pending" color="warning" />;
      case 'approved':
        return <Chip icon={<CheckCircle />} label="Approved" color="success" />;
      case 'rejected':
        return <Chip icon={<Cancel />} label="Rejected" color="error" />;
      default:
        return <Chip label="Unknown" />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back to Documents
      </Button>

      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4">
              <Description color="primary" sx={{ mr: 1, verticalAlign: 'middle' }} />
              {document.title}
            </Typography>
            {getStatusChip()}
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>Details</Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Document ID" secondary={document.id} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Type" secondary={document.type} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Department" secondary={document.department} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Description" secondary={document.description} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Author" secondary={document.author} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Created" secondary={document.created} />
                </ListItem>
                {document.deadline && (
                  <ListItem>
                    <ListItemText primary="Deadline" secondary={document.deadline} />
                  </ListItem>
                )}
              </List>

              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button variant="contained" startIcon={<Download />}>
                  Download
                </Button>
                <Button variant="outlined" startIcon={<Share />}>
                  Share
                </Button>
                <Button variant="outlined" startIcon={<Edit />}>
                  Edit
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>Document History</Typography>
              <List>
                {document.history.map((item, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={item.action}
                        secondary={`${item.date} by ${item.by}`}
                      />
                    </ListItem>
                    {index < document.history.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}