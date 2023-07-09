import { makeAutoObservable } from "mobx";
import ApiAgent from '../services/ApiAgent';

class ProjectStore {
    projects = [];

    constructor() {
        makeAutoObservable(this);
    }

    setProjects(projects) {
        this.projects = projects;
    }

    addProject(project) {
        this.projects.push(project);
    }

    fetchProjects = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await ApiAgent.Projects.getProjects(token);
          if (response.status === 200) {
            const responseData = response.data;
            this.setProjects(responseData);
          }
        } catch (error) {
          this.setProjects([]);
          throw error;
        }
      };
}

export default new ProjectStore();

