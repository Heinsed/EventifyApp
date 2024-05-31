import { makeObservable, observable, action, runInAction, flow } from "mobx";
import { fetchEvents } from "../utils/getEvents";

class EventsStore {
    @observable events = [];
    @observable lastVisible = null;
    @observable refreshing = false;
    @observable loadingMore = false;
    @observable searchQuery = '';
    @observable selectedCategories = [];

    constructor() {
        this.fetchData(false);
        makeObservable(this);
    }

    @action.bound setRefreshing(value) {
        this.refreshing = value;
    }

    @action.bound setLoadingMore(value) {
        this.loadingMore = value;
    }

    @action.bound setEvents(events) {
        this.events = events;
    }

    @action.bound appendEvents(newEvents) {
        this.events = [...this.events, ...newEvents];
    }

    @action.bound setLastVisible(lastVisible) {
        this.lastVisible = lastVisible;
    }

    @action.bound setSearchQuery(query) {
        if (!this.refreshing && !this.loadingMore) {
            this.searchQuery = query;
        }
    }

    @action.bound setCategories(categories) {
        if (!this.refreshing && !this.loadingMore) {
            this.selectedCategories = categories;
        }
    }

    @action fetchData(isLoadMore = false) {
        if (!isLoadMore) {
            this.setRefreshing(true);
            this.setLoadingMore(false);
        } else {
            this.setRefreshing(false);
            this.setLoadingMore(true);
        }

        fetchEvents(
            isLoadMore ? this.lastVisible : null,
            this.searchQuery,
            this.selectedCategories
        ).then(({ events: newEvents, lastVisible: newLastVisible }) => {
            runInAction(() => {
                if (isLoadMore) {
                    if (newEvents.length > 0) {
                        this.appendEvents(newEvents);
                        this.setLastVisible(newLastVisible);
                    }
                } else {
                    this.setEvents(newEvents);
                    this.setLastVisible(newLastVisible);
                }
            });
        }).catch(error => {
            console.error(error.message);
        }).finally(() => {
            runInAction(() => {
                this.setRefreshing(false);
                this.setLoadingMore(false);
            });
        });
    }
}

export default EventsStore;
