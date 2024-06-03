import { observable, action, makeObservable, runInAction } from "mobx";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

class ThemeStore {
    @observable theme = null; // начальная тема
    @observable useSystemTheme = true; // использовать ли тему системы
    storageKey = 'themeData'; // ключ для сохранения в AsyncStorage

    constructor() {
        makeObservable(this);
        this.initialize();
    }

    initialize() {
        this.loadThemeFromStorage();
    }

    @action setTheme(newTheme) {
        this.theme = newTheme;

        this.saveThemeToStorage();
    }

    @action setUseSystemTheme(value) {
        this.useSystemTheme = value;
        if (value) {
            this.setTheme(this.getSystemTheme());
        } else if (this.theme === null) {
            this.setTheme(this.getSystemTheme());
        }
    }

    @action getSystemTheme() {
        return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
    }



    async loadThemeFromStorage() {
        try {
            const data = await AsyncStorage.getItem(this.storageKey);
            if (data) {
                const parsedData = JSON.parse(data);
                runInAction(() => {
                    this.theme = parsedData.appTheme;
                    this.useSystemTheme = parsedData.useSystemTheme !== undefined ? parsedData.useSystemTheme : true;
                });
            } else {
                this.setTheme(this.getSystemTheme());
            }
        } catch (error) {
            console.error("Error loading theme from storage:", error);
        }
    }

    async saveThemeToStorage() {
        try {
            const data = JSON.stringify({
                appTheme: this.theme,
                useSystemTheme: this.useSystemTheme
            });
            await AsyncStorage.setItem(this.storageKey, data);
        } catch (error) {
            console.error("Error saving theme to storage:", error);
        }
    }
}


export default ThemeStore;
