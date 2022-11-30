import React from 'react';
import './App.css';

import { Box, Tab, Tabs, Typography } from '@mui/material';
import CreatePostTab from './components/tabs/CreatePostTab';
import CreateTypeTab from './components/tabs/CreateTypeTab';
import TableTab from './components/tabs/TableTab';
import TimelineTab from './components/tabs/TimelineTab';
import TypesTab from './components/tabs/TypesTab';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="Timeline" {...a11yProps(0)} />
          <Tab label="Table" {...a11yProps(1)} />
          <Tab label="Create Post" {...a11yProps(2)} />
          <Tab label="Types" {...a11yProps(3)} />
          <Tab label="Create Type" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TimelineTab></TimelineTab>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TableTab></TableTab>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CreatePostTab></CreatePostTab>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TypesTab></TypesTab>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <CreateTypeTab></CreateTypeTab>
      </TabPanel>
    </Box>
  )
}

export default App
