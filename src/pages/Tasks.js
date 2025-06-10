import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  TextField,
  Button,
  Chip,
  Tabs,
  Tab,
  Badge
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Assignment,
  FilterList
} from '@mui/icons-material';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

const initialTasks = [
  { id: 1, title: 'Complete project proposal', status: 'completed', priority: 'high' },
  { id: 2, title: 'Review team tasks', status: 'in-progress', priority: 'medium' },
  { id: 3, title: 'Prepare presentation', status: 'pending', priority: 'high' },
  { id: 4, title: 'Update documentation', status: 'pending', priority: 'low' },
  { id: 5, title: 'Meeting with client', status: 'completed', priority: 'medium' },
];

const priorityColors = {
  high: 'error',
  medium: 'warning',
  low: 'primary'
};

export default function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');
  const [tabValue, setTabValue] = useState('all');
  const [openFilter, setOpenFilter] = useState(false);

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: tasks.length + 1,
          title: newTask,
          status: 'pending',
          priority: 'medium'
        }
      ]);
      setNewTask('');
    }
  };

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

  const filteredTasks = tasks.filter(task => {
    if (tabValue === 'all') return true;
    if (tabValue === 'completed') return task.status === 'completed';
    if (tabValue === 'pending') return task.status === 'pending';
    if (tabValue === 'in-progress') return task.status === 'in-progress';
    return true;
  });

  const pendingCount = tasks.filter(t => t.status !== 'completed').length;

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4">Tasks</Typography>
            <Box display="flex" alignItems="center">
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                onClick={() => setOpenFilter(!openFilter)}
                sx={{ mr: 2 }}
              >
                Filter
              </Button>
              <Badge badgeContent={pendingCount} color="primary">
                <Assignment color="action" />
              </Badge>
            </Box>
          </Box>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" mb={2}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Add new task..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                />
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Add />}
                  onClick={handleAddTask}
                  sx={{ ml: 2 }}
                >
                  Add
                </Button>
              </Box>

              <Tabs
                value={tabValue}
                onChange={(e, newValue) => setTabValue(newValue)}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="All" value="all" />
                <Tab label="Pending" value="pending" />
                <Tab label="In Progress" value="in-progress" />
                <Tab label="Completed" value="completed" />
              </Tabs>

              <List>
                {filteredTasks.map((task) => (
                  <ListItem key={task.id} divider>
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
                    <ListItemSecondaryAction>
                      <Chip
                        label={task.priority}
                        color={priorityColors[task.priority]}
                        size="small"
                        sx={{ mr: 2 }}
                      />
                      <IconButton edge="end" aria-label="edit">
                        <Edit />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      </motion.div>
    </Layout>
  );
}