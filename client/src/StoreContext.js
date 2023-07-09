import { React, createContext, useContext } from 'react';
import UserStore from './stores/UserStore';
import ProjectStore from './stores/ProjectStore';

const StoreContext = createContext({
    userStore: UserStore,
    projectStore: ProjectStore
});

export const useStores = () => useContext(StoreContext);

export default StoreContext;