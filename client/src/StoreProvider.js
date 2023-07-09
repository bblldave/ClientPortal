import StoreContext from "./StoreContext";
import ProjectStore from "./stores/ProjectStore";
import UserStore from "./stores/UserStore";

const StoreProvider = ({ children }) => {
    return (
        <StoreContext.Provider
            value={{
                userStore: UserStore,
                projectStore: ProjectStore,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;