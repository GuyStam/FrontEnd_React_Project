import React from 'react';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

// מיפוי של אייקונים לפי שם
const iconMap = {
  info: <LightbulbIcon />,
  home: <HomeIcon />,
  forms: <AssignmentIcon />,
  management: <ManageAccountsIcon />,
  help: <HelpOutlineIcon />,
};

// קומפוננטה המחזירה את האייקון המתאים לפי השם
export default function Icons({ name, sx }) {
  return iconMap[name] ? React.cloneElement(iconMap[name], { sx }) : null;
}
