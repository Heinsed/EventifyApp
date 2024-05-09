import { ScrollView, StyleSheet, Text, View, Image, StatusBar, Platform} from 'react-native';
import React, {useEffect, useState} from "react";
import {getCurrentUser} from '../../utils/User/getUser';



const Profile = () => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getCurrentUser();
                setUser(data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchUser();
    }, []);

    return (
        <>
          <Text>Profile, {user.name}</Text>
        </>


    );
};



export default Profile;