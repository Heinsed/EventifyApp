import EventsStore from "./EventsStore";
import { observable, makeObservable, action, runInAction } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";

class WishlistStore {
    @observable wishlist = [];

    constructor() {
        makeObservable(this);
        this.loadWishlist();
    }

    @action addToWishlist(event) {
        if (event && !this.isEventInWishlist(event)) {
            this.wishlist.push(event);
            this.saveWishlist();
        }
    }

    @action removeFromWishlist(event) {
        if (event) {
            this.wishlist = this.wishlist.filter(e => e.id !== event.id); // Используем фильтрацию по идентификатору события
            this.saveWishlist();
        }
    }

    @action async loadWishlist() {
        try {
            const wishlist = await AsyncStorage.getItem('wishlist');
            if (wishlist !== null) {
                runInAction(() => {
                    this.wishlist = JSON.parse(wishlist);
                });
            }
            return this.wishlist; // Возвращаем текущий вишлист после загрузки из AsyncStorage
        } catch (error) {
            console.error("Error loading wishlist:", error);
            return []; // Возвращаем пустой массив в случае ошибки
        }
    }

    @action async saveWishlist() {
        try {
            const wishlistCopy = this.wishlist.map(item => {
                const { category, date, geo, ...rest } = item;
                return rest;
            });
            await AsyncStorage.setItem('wishlist', JSON.stringify(wishlistCopy));
        } catch (error) {
            console.error("Error saving wishlist:", error);
        }
    }

    isEventInWishlist(event) {
        if (event && typeof event === 'object') {
            return event.id && this.wishlist.some(e => e.id === event.id);
        } else {
            return this.wishlist.includes(event);
        }
    }
}

export default WishlistStore;
