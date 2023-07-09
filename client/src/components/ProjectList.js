import React, { useEffect, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import ApiAgent from '../services/ApiAgent';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await ApiAgent.Projects.getProjects(token);
        if (response.status === 200) {
          const responseData = response.data;
          setProjects(responseData);
        }
      } catch (error) {
        setProjects([]);
        throw error;
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (id) => {
    console.log(`Project clicked: ${id}`);
  };

  return (
    <div>
      {projects.map((project) => (
        <ListItem key={project._id} onClick={() => handleProjectClick(project._id)}>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary={project.title} />
        </ListItem>
      ))}
    </div>
  );
};

export default ProjectList;
