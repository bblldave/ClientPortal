import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../StoreContext';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import ApiAgent from '../services/ApiAgent';

const ProjectList = observer(() => {
  const { projectStore } = useStores();
  const projects = projectStore.projects;

  useEffect(() => {
    projectStore.fetchProjects();
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
});

export default ProjectList;
