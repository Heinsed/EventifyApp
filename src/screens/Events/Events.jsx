import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Platform, StatusBar, Text, RefreshControl, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useAnimatedScrollHandler, useSharedValue, useAnimatedStyle, withTiming, Easing, clamp } from 'react-native-reanimated';
import SearchInput from "../../components/SearchInput";
import UIStyles from "../../styles/UI";
import styled from "styled-components/native";
import FilterEvents from "../../components/Filter/Filter";
import EventCard from "./components/EventCard";
import { observer } from "mobx-react-lite";
import mainStore from "../../stores/MainStore";



const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Events = observer(() => {
    const scrollY = useSharedValue(0);

    const { themeStore } = mainStore;
    const currentTheme = themeStore.theme;

    const { eventsStore } = mainStore;

    const {
        events,
        refreshing,
        loadingMore,
        fetchData,
        lastVisible,
        searchQuery,
        selectedCategories
    } = eventsStore;

    useEffect(() => {
        eventsStore.fetchData(false);
    }, [fetchData]);

    const handleLoadMore = useCallback(() => {
        if (
            events.length > 5 &&
            !loadingMore &&
            lastVisible &&
            (searchQuery !== '' || selectedCategories.length > 0)
        ) {
            eventsStore.fetchData(true);
        }
    }, [events, loadingMore, lastVisible, searchQuery, selectedCategories, eventsStore]);

    const handleCategoryChange = useCallback((categories) => {
        eventsStore.setCategories(categories);
        eventsStore.fetchData(false);
    }, [eventsStore]);

    const handleSearchChange = useCallback((search) => {
        eventsStore.setSearchQuery(search);
        eventsStore.fetchData(false);
    }, [eventsStore]);

    const eventCard = ({ item }) => (
        <EventCard event={item} />
    );

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });


    const headerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: -clamp(scrollY.value, 0, 300),

                },
            ],
        };
    });

    const flatListStyle = useAnimatedStyle(() => {
        return {
            marginTop: -clamp(scrollY.value, 0, 200),
        };
    });

    return (
        <EventsScreen currentTheme={currentTheme}>
            <StatusBar
                barStyle={currentTheme === 'dark' ? "light-content" : "dark-content"}
                backgroundColor={currentTheme === 'dark' ? UIStyles.dark.background : UIStyles.light.background}
            />
            <AnimatedHeader style={headerStyle} currentTheme={currentTheme}>
                <SearchInput onSearchChange={handleSearchChange} title={'Івенти'} />
                <FilterEvents onFilterChange={handleCategoryChange} />
            </AnimatedHeader>
            <EventsList
                data={events}
                renderItem={eventCard}
                keyExtractor={item => item.id}
                keyboardShouldPersistTaps='handled'
                keyboardDismissMode="on-drag"
                style={flatListStyle}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={() => eventsStore.fetchData()} />
                }
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loadingMore ? <Text>Завантаження...</Text> : null}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            />
        </EventsScreen>
    );
});

const EventsScreen = styled(SafeAreaView)(({currentTheme}) => ({
    background: currentTheme === 'dark' ? UIStyles.dark.white : UIStyles.light.white,
    flex: 1,
}));

const EventsList = styled(AnimatedFlatList)(() => ({
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24,
}));

const AnimatedHeader = styled(Animated.View)(({currentTheme}) => ({
    borderBottomWidth: 1,
    borderBottomColor: currentTheme === 'dark' ? UIStyles.dark.lightGrey : UIStyles.light.grey,
    paddingBottom: 20,
}));

export default Events;
