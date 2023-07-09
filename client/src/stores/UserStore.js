import { makeAutoObservable } from 'mobx';

class UserStore {
    user = null;

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user) {
        this.user = user;
    }

    clearUser() {
        this.user = null;
    }
}

export default new UserStore();