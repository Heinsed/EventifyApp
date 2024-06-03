import EventsStore from "./EventsStore";
import ThemeStore from './ThemeStore';
import WishlistStore from "./WishlistStore";

class MainStore {
    constructor() {
        this.eventsStore = new EventsStore();
        this.themeStore = new ThemeStore();
        this.wishlistStore = new WishlistStore();
    }
}

const mainStore = new MainStore();
export default mainStore;
