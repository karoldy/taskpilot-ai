import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Chip from '@mui/material/Chip';
import Header from '@/components/layouts/Header';
import { useTaskStore } from '@/stores/useTaskStore';
import tokens from '@/tokens/base';
import FilterCard from '@/components/molecules/FilterCard';
import { Smile } from 'lucide-react';

export default function TaskLandingPage() {
  const { t } = useTranslation();
  const [newTitle, setNewTitle] = useState('');
  const { tasks, filters, addTask, removeTask, toggleTask, setFilters, taskCount, filteredTasks } =
    useTaskStore();

  const counts = taskCount();
  const displayTasks = filteredTasks();

  const handleAddTask = () => {
    if (newTitle.trim()) {
      addTask(newTitle.trim());
      setNewTitle('');
    }
  };

  return (
    <>
      <Header>
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            paddingBlock: '16px',
            paddingInline: '24px',
          }}
        >
          <Stack>
            <Typography
              sx={{
                color: tokens.colorTextOnColor,
              }}
            >
              任务
            </Typography>
            <Typography
              sx={{
                color: tokens.colorTextOnColor,
              }}
            >
              100
            </Typography>
          </Stack>
          <Box
            sx={{
              display: 'flex',
              gap: '12px',
            }}
          >
            <FilterCard
              chip={<Chip icon={<Smile color={tokens.colorIconOnColor} />} label="已指派" />}
            />
            <FilterCard
              chip={<Chip icon={<Smile color={tokens.colorIconOnColor} />} label="已指派" />}
            />
          </Box>
        </Box>
      </Header>
      <Box sx={{ flex: 1, maxWidth: 600, mx: 'auto', p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {t('navmenu__task')}
        </Typography>

        {/* Task counts */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Chip label={`${t('all')} ${counts.total}`} size="small" />
          <Chip label={`${t('active')} ${counts.active}`} size="small" color="primary" />
          <Chip label={`${t('completed')} ${counts.completed}`} size="small" color="success" />
        </Box>

        {/* Add task */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            size="small"
            fullWidth
            placeholder={t('add_task_placeholder')}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <Button variant="contained" onClick={handleAddTask}>
            {t('add')}
          </Button>
        </Box>

        {/* Filters */}
        <ToggleButtonGroup
          size="small"
          value={filters.status}
          exclusive
          onChange={(_, val) => val && setFilters({ status: val })}
          sx={{ mb: 2 }}
        >
          <ToggleButton value="all">{t('all')}</ToggleButton>
          <ToggleButton value="active">{t('active')}</ToggleButton>
          <ToggleButton value="completed">{t('completed')}</ToggleButton>
        </ToggleButtonGroup>

        {/* Task list */}
        <List>
          {displayTasks.map((task) => (
            <ListItem
              key={task.id}
              secondaryAction={
                <IconButton edge="end" onClick={() => removeTask(task.id)}>
                  {/* <DeleteIcon /> */}
                </IconButton>
              }
              sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
            >
              <Checkbox checked={task.completed} onChange={() => toggleTask(task.id)} />
              <ListItemText
                primary={task.title}
                sx={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? 'text.disabled' : 'text.primary',
                }}
              />
            </ListItem>
          ))}
        </List>

        {displayTasks.length === 0 && tasks.length === 0 && (
          <Typography color="text.secondary" sx={{ textAlign: 'center' }}>
            {t('no_tasks')}
          </Typography>
        )}
      </Box>
    </>
  );
}
