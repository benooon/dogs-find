import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext } from '@mui/lab';
import TabList from '@mui/lab/TabList';
import React, { useState, useEffect } from 'react';

export default function LabTabs({ changestae ,counter,label1}) {
    const [value, setValue] = React.useState('1');
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
      changestae();
    };
  
    return (
  <Box sx={{ width: '100%', typography: 'body1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="כל השאלות" value="1" onClick={changestae} />
              <Tab label={`${counter} שאלות שטעיתי`} value="2" onClick={changestae} disabled={label1}/>
            </TabList>
          </Box>
  
        </TabContext>
      </Box>
    );
  }