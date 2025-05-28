import React from 'react';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SchoolIcon from '@mui/icons-material/School';        // חדש – לקורסים
import GradingIcon from '@mui/icons-material/Grading';      // חדש – לציונים

// מיפוי של אייקונים לפי שם
const iconMap = {
  info: <LightbulbIcon />,
  home: <HomeIcon />,
  forms: <AssignmentIcon />,
  management: <ManageAccountsIcon />,
  help: <HelpOutlineIcon />,
  courses: <SchoolIcon />,    // חדש: אייקון לקורסים
  grades: <GradingIcon />,    // חדש: אייקון לציונים
};

// קומפוננטה המחזירה את האייקון המתאים לפי השם
export default function Icons({ name, sx }) {
  return iconMap[name] ? React.cloneElement(iconMap[name], { sx }) : null;
}
