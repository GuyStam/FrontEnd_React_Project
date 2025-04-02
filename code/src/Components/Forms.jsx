// Forms.jsx
import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const mockData = [
  // ... קיצור לצורך תצוגה
];

export default function Forms() {
  const [courses, setCourses] = useState([]);
  const [filters, setFilters] = useState({ courseName: '', lecturer: '', year: '', semester: '', nextClass: '', nextAssignment: '' });
  const [newCourse, setNewCourse] = useState({ courseName: '', lecturer: '', year: '', semester: '', nextClass: '', nextAssignment: '' });
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(null);
  const [editCourse, setEditCourse] = useState({ courseName: '', lecturer: '', year: '', semester: '', nextClass: '', nextAssignment: '' });

  useEffect(() => {
    const existing = localStorage.getItem('courses');
    if (!existing) {
      localStorage.setItem('courses', JSON.stringify(mockData));
      setCourses(mockData);
    } else {
      setCourses(JSON.parse(existing));
    }
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewCourseChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditCourseChange = (e) => {
    const { name, value } = e.target;
    setEditCourse((prev) => ({ ...prev, [name]: value }));
  };

  const addNewCourse = () => {
    const updatedCourses = [...courses, newCourse];
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    setCourses(updatedCourses);
    setNewCourse({ courseName: '', lecturer: '', year: '', semester: '', nextClass: '', nextAssignment: '' });
  };

  const deleteSelectedCourse = () => {
    if (selectedCourseIndex !== null) {
      const updatedCourses = [...courses];
      updatedCourses.splice(selectedCourseIndex, 1);
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
      setCourses(updatedCourses);
      setSelectedCourseIndex(null);
    }
  };

  const editSelectedCourse = () => {
    if (selectedCourseIndex !== null) {
      const updatedCourses = [...courses];
      updatedCourses[selectedCourseIndex] = editCourse;
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
      setCourses(updatedCourses);
      setEditCourse({ courseName: '', lecturer: '', year: '', semester: '', nextClass: '', nextAssignment: '' });
      setSelectedCourseIndex(null);
    }
  };

  const filteredCourses = courses.filter((course) => {
    return (
      (!filters.courseName || course.courseName.toLowerCase().includes(filters.courseName.toLowerCase())) &&
      (!filters.lecturer || course.lecturer.toLowerCase().includes(filters.lecturer.toLowerCase())) &&
      (!filters.year || course.year.toString() === filters.year) &&
      (!filters.semester || course.semester === filters.semester) &&
      (!filters.nextClass || course.nextClass === filters.nextClass) &&
      (!filters.nextAssignment || course.nextAssignment === filters.nextAssignment)
    );
  });

  useEffect(() => {
    if (selectedCourseIndex !== null) {
      setEditCourse(courses[selectedCourseIndex]);
    }
  }, [selectedCourseIndex]);

  return (
    <div>
      <h2>Course Filter Form</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
        <TextField name="courseName" label="Course Name" value={filters.courseName} onChange={handleFilterChange} />
        <TextField name="lecturer" label="Lecturer" value={filters.lecturer} onChange={handleFilterChange} />
        <TextField select name="year" label="Year" value={filters.year} onChange={handleFilterChange}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="2023">2023</MenuItem>
          <MenuItem value="2024">2024</MenuItem>
        </TextField>
        <TextField select name="semester" label="Semester" value={filters.semester} onChange={handleFilterChange}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="B">B</MenuItem>
        </TextField>
        <TextField name="nextClass" label="Next Class Date" type="date" InputLabelProps={{ shrink: true }} value={filters.nextClass} onChange={handleFilterChange} />
        <TextField name="nextAssignment" label="Next Assignment Date" type="date" InputLabelProps={{ shrink: true }} value={filters.nextAssignment} onChange={handleFilterChange} />
      </div>

      <TableContainer component={Paper} style={{ marginBottom: '2rem' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>Lecturer</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell>Next Class</TableCell>
              <TableCell>Next Assignment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCourses.map((course, idx) => (
              <TableRow
                key={idx}
                onClick={() => setSelectedCourseIndex(courses.indexOf(course))}
                style={{ backgroundColor: selectedCourseIndex === courses.indexOf(course) ? '#fdd' : 'transparent', cursor: 'pointer' }}
              >
                <TableCell>{course.courseName}</TableCell>
                <TableCell>{course.lecturer}</TableCell>
                <TableCell>{course.year}</TableCell>
                <TableCell>{course.semester}</TableCell>
                <TableCell>{course.nextClass}</TableCell>
                <TableCell>{course.nextAssignment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedCourseIndex !== null && (
        <>
          <h3>Edit Selected Course</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <TextField name="courseName" label="Course Name" value={editCourse.courseName} onChange={handleEditCourseChange} />
            <TextField name="lecturer" label="Lecturer" value={editCourse.lecturer} onChange={handleEditCourseChange} />
            <TextField name="year" label="Year" type="number" value={editCourse.year} onChange={handleEditCourseChange} />
            <TextField select name="semester" label="Semester" value={editCourse.semester} onChange={handleEditCourseChange}>
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
            </TextField>
            <TextField name="nextClass" label="Next Class Date" type="date" InputLabelProps={{ shrink: true }} value={editCourse.nextClass} onChange={handleEditCourseChange} />
            <TextField name="nextAssignment" label="Next Assignment Date" type="date" InputLabelProps={{ shrink: true }} value={editCourse.nextAssignment} onChange={handleEditCourseChange} />
            <Button variant="contained" color="primary" onClick={editSelectedCourse}>Save Changes</Button>
          </div>
        </>
      )}

      <h3 style={{ marginTop: '3rem' }}>Add New Course</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '4rem' }}>
        <TextField name="courseName" label="Course Name" value={newCourse.courseName} onChange={handleNewCourseChange} />
        <TextField name="lecturer" label="Lecturer" value={newCourse.lecturer} onChange={handleNewCourseChange} />
        <TextField name="year" label="Year" type="number" value={newCourse.year} onChange={handleNewCourseChange} />
        <TextField select name="semester" label="Semester" value={newCourse.semester} onChange={handleNewCourseChange}>
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="B">B</MenuItem>
        </TextField>
        <TextField name="nextClass" label="Next Class Date" type="date" InputLabelProps={{ shrink: true }} value={newCourse.nextClass} onChange={handleNewCourseChange} />
        <TextField name="nextAssignment" label="Next Assignment Date" type="date" InputLabelProps={{ shrink: true }} value={newCourse.nextAssignment} onChange={handleNewCourseChange} />
        <Button variant="contained" onClick={addNewCourse}>Add Course</Button>
        <Button variant="outlined" color="error" onClick={deleteSelectedCourse} disabled={selectedCourseIndex === null}>Delete Selected</Button>
      </div>
    </div>
  );
}
