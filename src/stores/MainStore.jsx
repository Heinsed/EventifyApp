import EventsStore from "./EventsStore";

class MainStore {
    constructor() {
        this.eventsStore = new EventsStore();
    }
}

const mainStore = new MainStore();
export default mainStore;
