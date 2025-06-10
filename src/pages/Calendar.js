import { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Popover,
  TextField,
  Grid,
  Divider
} from '@mui/material';
import {
  Add,
  ChevronLeft,
  ChevronRight,
  Today,
  Event,
  MoreVert
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format, addMonths, subMonths, isSameMonth, isSameDay } from 'date-fns';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

const events = [
  { id: 1, title: 'Team Meeting', date: new Date(2023, 5, 15), color: '#4a148c' },
  { id: 2, title: 'Client Call', date: new Date(2023, 5, 18), color: '#ff6f00' },
  { id: 3, title: 'Project Deadline', date: new Date(2023, 5, 22), color: '#d81b60' },
  { id: 4, title: 'Review Session', date: new Date(2023, 5, 25), color: '#00897b' },
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [anchorEl, setAnchorEl] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: '', date: new Date() });

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  const handleAddEvent = () => {
    setAnchorEl(null);
    // Add event logic here
    setNewEvent({ title: '', date: new Date() });
  };

  const renderDays = () => {
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(monthStart);
    startDate.setDate(monthStart.getDate() - monthStart.getDay());
    const endDate = new Date(monthEnd);
    endDate.setDate(monthEnd.getDate() + (6 - monthEnd.getDay()));

    const days = [];
    let day = new Date(startDate);

    while (day <= endDate) {
      days.push(new Date(day));
      day.setDate(day.getDate() + 1);
    }

    return days.map((day, i) => {
      const dayEvents = events.filter(event => isSameDay(event.date, day));
      const isCurrentMonth = isSameMonth(day, currentDate);
      const isSelected = isSameDay(day, selectedDate);

      return (
        <Box
          key={i}
          onClick={() => handleDateClick(day)}
          sx={{
            minHeight: 100,
            border: '1px solid #eee',
            p: 1,
            backgroundColor: isSelected ? 'primary.light' : isCurrentMonth ? 'background.paper' : 'grey.100',
            color: isCurrentMonth ? 'text.primary' : 'text.secondary',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <Typography variant="body2" align="right">
            {format(day, 'd')}
          </Typography>
          <Box sx={{ mt: 1 }}>
            {dayEvents.map(event => (
              <Box
                key={event.id}
                sx={{
                  backgroundColor: event.color,
                  color: 'white',
                  p: '2px 4px',
                  borderRadius: 1,
                  mb: '2px',
                  fontSize: '0.75rem',
                }}
              >
                {event.title}
              </Box>
            ))}
          </Box>
        </Box>
      );
    });
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4">Calendar</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              Add Event
            </Button>
          </Box>

          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Box display="flex" alignItems="center">
                  <IconButton onClick={handlePrevMonth}>
                    <ChevronLeft />
                  </IconButton>
                  <Typography variant="h6" sx={{ mx: 2 }}>
                    {format(currentDate, 'MMMM yyyy')}
                  </Typography>
                  <IconButton onClick={handleNextMonth}>
                    <ChevronRight />
                  </IconButton>
                  <Button
                    variant="outlined"
                    startIcon={<Today />}
                    onClick={handleToday}
                    sx={{ ml: 2 }}
                  >
                    Today
                  </Button>
                </Box>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={['year', 'month']}
                    label="Jump to"
                    value={currentDate}
                    onChange={(newDate) => {
                      setCurrentDate(newDate);
                      setSelectedDate(newDate);
                    }}
                    renderInput={(params) => <TextField {...params} size="small" />}
                  />
                </LocalizationProvider>
              </Box>

              <Grid container spacing={0} columns={7}>
                {daysOfWeek.map(day => (
                  <Grid item xs={1} key={day}>
                    <Box
                      sx={{
                        p: 1,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        backgroundColor: 'grey.200',
                      }}
                    >
                      {day}
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Grid container spacing={0} columns={7}>
                {renderDays()}
              </Grid>
            </CardContent>
          </Card>

          {selectedDate && (
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Events on {format(selectedDate, 'MMMM d, yyyy')}
                </Typography>
                <List>
                  {events
                    .filter(event => isSameDay(event.date, selectedDate))
                    .map(event => (
                      <ListItem key={event.id} divider>
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            backgroundColor: event.color,
                            borderRadius: '50%',
                            mr: 2,
                          }}
                        />
                        <ListItemText primary={event.title} />
                        <ListItemSecondaryAction>
                          <IconButton edge="end">
                            <MoreVert />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                </List>
              </CardContent>
            </Card>
          )}
        </Box>

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Box sx={{ p: 2, width: 300 }}>
            <Typography variant="h6" gutterBottom>
              Add New Event
            </Typography>
            <TextField
              fullWidth
              label="Event Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              sx={{ mb: 2 }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Event Date"
                value={newEvent.date}
                onChange={(date) => setNewEvent({ ...newEvent, date })}
                renderInput={(params) => <TextField fullWidth {...params} sx={{ mb: 2 }} />}
              />
            </LocalizationProvider>
            <Box display="flex" justifyContent="flex-end">
              <Button onClick={() => setAnchorEl(null)} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddEvent}
                disabled={!newEvent.title}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Popover>
      </motion.div>
    </Layout>
  );
}
