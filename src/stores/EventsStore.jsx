import { makeAutoObservable } from "mobx";
import { fetchEvents } from "../../utils/getEvents";

class EventStore {
    events = [];
    lastVisible = null;
    refreshing = false;
    loadingMore = false;

    constructor() {
        makeAutoObservable(this);
        this.fetchData();
    }

    async fetchData(isLoadMore = false) {
        this.refreshing = !isLoadMore;
        this.loadingMore = isLoadMore;

        try {
            const { events: newEvents, lastVisible: newLastVisible } = await fetchEvents(isLoadMore ? this.lastVisible : null);

            if (isLoadMore) {
                if (newEvents.length > 0) {
                    this.events = [...this.events, ...newEvents];
                    this.lastVisible = newLastVisible;
                }
            } else {
                this.events = newEvents;
                this.lastVisible = newLastVisible;
            }
        } catch (error) {
            console.error(error.message);
        } finally {
            this.refreshing = false;
            this.loadingMore = false;
        }
    }
}

export default EventStore;