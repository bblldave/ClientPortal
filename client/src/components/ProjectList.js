import React, { useEffect, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3001/projects/', {
            headers: {
                'x-auth-token': token,
            }
        });
        const data = await res.json();
        setProjects(data);
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
