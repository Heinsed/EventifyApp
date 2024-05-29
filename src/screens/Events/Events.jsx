import React, { useEffect, useCallback } from 'react';
import {
    FlatList,
    Platform,
    StatusBar,
    Text,
    RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from "../../components/SearchInput";
import UIStyles from "../../styles/UI";
import styled from "styled-components/native";
import FilterEvents from "../../components/Filter/Filter";
import EventCard from "./components/EventCard";
import { observer } from "mobx-react-lite";
import mainStore from "../../stores/MainStore";


const Events = observer(() => {
    const { eventsStore } = mainStore;

    const {
        events,
        refreshing,
        loadingMore,
        fetchData,
        lastVisible,
        setRefreshing,
        setLoadingMore,
        searchQuery,
        selectedCategories
    } = eventsStore;

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
        <EventCard itemID={item.id} title={item.title} image={item.image} date={item.date} location={item.location} />
    );

    return (
        <EventsScreen>
            <StatusBar barStyle={Platform.OS === 'ios' ? "dark-content" : 'dark-content'} backgroundColor={'white'} />
            <SearchInput onSearchChange={handleSearchChange} title={'Івенти'} />
            <FilterEvents onFilterChange={handleCategoryChange} />
            <EventsList
                data={events}
                renderItem={eventCard}
                keyExtractor={item => item.id}
                keyboardShouldPersistTaps='handled'
                keyboardDismissMode="on-drag"
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={() => eventsStore.fetchData()} />
                }
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loadingMore ? <Text>Завантаження...</Text> : null}
            />
        </EventsScreen>
    );
});

const EventsScreen = styled(SafeAreaView)(() => ({
    background: UIStyles.colors.white,
    flex: 1,
}));

const EventsList = styled(FlatList)(() => ({
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: UIStyles.colors.grey,
    marginTop: 20,
    paddingLeft: 24,
    paddingRight: 24,
}));

export default Events;
