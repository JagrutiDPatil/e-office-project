
import React, { useState } from 'react'; // Added useState
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Chip,
  Checkbox, // Added from tasks
  Badge, // Added from tasks
  IconButton // Added from tasks
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  Description as DocumentIcon,
  Event as CalendarIcon,
  //Email as MessageIcon,
  People as PeopleIcon,
  CheckCircle as CompletedIcon,
  PendingActions as PendingIcon,
  Error as OverdueIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Add as AddIcon, // Added from tasks
  Edit as EditIcon, // Added from tasks
  Delete as DeleteIcon, // Added from tasks
  FilterList as FilterIcon // Added from tasks
} from '@mui/icons-material';
import {AppPieChart } from '../components/Charts';
import { motion } from 'framer-motion'; // Added from tasks
import Layout from '../components/Layout';

// Added task priority colors from tasks
const priorityColors = {
  high: 'error',
  medium: 'warning',
  low: 'primary'
};

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data
  const stats = {
    pendingFiles: 8,
    completedFiles: 32,
    overdueFiles: 3,
    totalFiles: 43
  };
    
  const recentFiles = [
    { id: 1, title: 'Annual Budget Proposal', status: 'pending', daysPending: 2 },
    { id: 2, title: 'HR Policy Update', status: 'completed', daysPending: 0 },
    { id: 3, title: 'Infrastructure Project', status: 'overdue', daysPending: 5 }
  ];
  
   const upcomingEvents = [
    {
      id: 1,
      title: 'Quarterly Review Meeting',
      date: new Date(2025, 5, 10, 14, 30), // Note: months are 0-indexed (5 = June)
      location: 'Conference Room A',
      attendees: 8
    },
    {
      id: 2,
      title: 'Project Kickoff',
      date: new Date(2025, 5, 12, 10, 0),
      location: 'Main Auditorium',
      attendees: 15
    },
    {
      id: 3,
      title: 'Client Presentation',
      date: new Date(2025, 5, 15, 13, 45),
      location: 'Zoom Meeting',
      attendees: 5
    }
  ];

  // NEW: Task-related state and functions
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete project proposal', status: 'completed', priority: 'high' },
    { id: 2, title: 'Review team tasks', status: 'in-progress', priority: 'medium' },
    { id: 3, title: 'Prepare presentation', status: 'pending', priority: 'high' },
    { id: 4, title: 'Update documentation', status: 'pending', priority: 'low' }
  ]);

  const pendingTaskCount = tasks.filter(t => t.status !== 'completed').length;

  const handleToggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? {
            ...task,
            status: task.status === 'completed' ? 'pending' : 'completed'
          }
        : task
    ));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Filter tasks to show only pending/in-progress
  const recentTasks = tasks
    .filter(task => task.status !== 'completed')
    .slice(0, 3); // Show max 3 tasks

  const handleNavigation = (path) => {
    navigate(path);
  };

  const completionPercentage = Math.round((stats.completedFiles / stats.totalFiles) * 100);

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Format time for display
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {user?.name || 'User'}
        </Typography>

        {/* Quick Access Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button 
            variant="contained" 
            startIcon={<DocumentIcon />}
            onClick={() => handleNavigation('/documents')}
          >
            Documents
          </Button>
          <Button 
            variant="contained" 
            startIcon={<AssignmentIcon />}
            onClick={() => handleNavigation('/tasks')}
          >
            <Badge badgeContent={pendingTaskCount} color="error" sx={{ mr: 1 }}>
              Tasks
            </Badge>
          </Button>
          <Button 
            variant="contained" 
            startIcon={<CalendarIcon />}
            onClick={() => handleNavigation('/calendar')}
          >
            Calendar
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 1}}>
          {renderStatCard('Pending Files', stats.pendingFiles, PendingIcon, 'warning.main')}
          {renderStatCard('Completed', stats.completedFiles, CompletedIcon, 'success.main')}
          {renderStatCard('Overdue', stats.overdueFiles, OverdueIcon, 'error.main')}
          {renderStatCard('Total Files', stats.totalFiles, DocumentIcon, 'info.main')}
        </Grid>

        {/* Progress and Charts */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Files Completion Progress
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h4" sx={{ mr: 2 }}>
                    {completionPercentage}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ({stats.completedFiles} of {stats.totalFiles} files)
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={completionPercentage}
                  sx={{ height: 10, borderRadius: 5 }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Files by Status
                </Typography>
                <Box sx={{ height: 250 }}>
                  <AppPieChart data={[
                    { name: 'Completed', value: stats.completedFiles, color: '#4caf50' },
                    { name: 'Pending', value: stats.pendingFiles, color: '#ff9800' },
                    { name: 'Overdue', value: stats.overdueFiles, color: '#f44336' }
                  ]} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* NEW: Recent Tasks Section */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">Recent Tasks</Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<FilterIcon />}
                  >
                    Filter
                  </Button>
                </Box>
                <List>
                  {recentTasks.map((task) => (
                    <React.Fragment key={task.id}>
                      <ListItem divider>
                        <Checkbox
                          edge="start"
                          checked={task.status === 'completed'}
                          onChange={() => handleToggleTask(task.id)}
                          color="primary"
                        />
                        <ListItemText
                          primary={task.title}
                          secondary={`Status: ${task.status}`}
                          sx={{
                            textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                            color: task.status === 'completed' ? 'text.secondary' : 'text.primary'
                          }}
                        />
                        <Chip
                          label={task.priority}
                          color={priorityColors[task.priority]}
                          size="small"
                          sx={{ mr: 1 }}
                        />
                        <IconButton edge="end" aria-label="edit">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  startIcon={<AddIcon />}
                  onClick={() => handleNavigation('/tasks')}
                  sx={{ mt: 1 }}
                >
                  Add New Task
                </Button>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Recent Files */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Files
                </Typography>
                <List>
                  {recentFiles.map((file) => (
                    <React.Fragment key={file.id}>
                      <ListItem 
                        button
                        onClick={() => handleNavigation(`/files/${file.id}`)}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: getStatusColor(file.status) }}>
                            {file.status === 'completed' ? <CompletedIcon /> : 
                            file.status === 'overdue' ? <OverdueIcon /> : <PendingIcon />}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={file.title}
                          secondary={`Status: ${file.status.toUpperCase()}`}
                        />
                        {file.status === 'pending' && (
                          <Chip label={`${file.daysPending}d`} color="warning" size="small" />
                        )}
                        {file.status === 'overdue' && (
                          <Chip label={`+${file.daysPending}d`} color="error" size="small" />
                        )}
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Upcoming Events */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Upcoming Events
            </Typography>
            <List>
              {upcomingEvents.map((event) => (
                <React.Fragment key={event.id}>
                  <ListItem 
                    button
                    onClick={() => handleNavigation(`/events/${event.id}`)}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <CalendarIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={event.title}
                      secondary={
                        <React.Fragment>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <TimeIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2" component="span">
                              {formatDate(event.date)} at {formatTime(event.date)}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <LocationIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2" component="span">
                              {event.location}
                            </Typography>
                          </Box>
                        </React.Fragment>
                      }
                    />
                    <Chip 
                      icon={<PeopleIcon />} 
                      label={`${event.attendees}`} 
                      size="small" 
                      color="info"
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
            <Button 
              fullWidth 
              variant="outlined" 
              startIcon={<CalendarIcon />}
              onClick={() => handleNavigation('/calendar')}
              sx={{ mt: 2 }}
            >
              View Full Calendar
            </Button>
          </CardContent>
        </Card>
      </Box>
    </motion.div>
  );
}

// Helper component for stat cards
function renderStatCard(title, value, Icon, color) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: color, mr: 2, width: 56, height: 56 }}>
              <Icon fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h6" color="text.secondary">
                {title}
              </Typography>
              <Typography variant="h4">{value}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

// Helper function for status colors
function getStatusColor(status) {
  switch (status) {
    case 'completed': return 'success.main';
    case 'overdue': return 'error.main';
    default: return 'warning.main';
  }
}