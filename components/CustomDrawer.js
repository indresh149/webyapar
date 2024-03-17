import React, { useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import { AuthContext } from '../store/auth-context';
import IconButton from '../components/ui/IconButton';
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const CustomDrawer = props => {
    const navigation = useNavigation();
    const [storedEmail, setStoredEmail] = useState(null);
    const [storedFirstName, setStoredFirstName] = useState(null);
    const [storedlastName, setStoredlastName] = useState(null);


    useEffect(() => {
        async function fetchEmail() {
            const storedEmail = await AsyncStorage.getItem('email');
            const storedFirstName = await AsyncStorage.getItem('firstName');
            const storedLastName = await AsyncStorage.getItem('lastName');
            setStoredEmail(storedEmail);
            setStoredFirstName(storedFirstName);
            setStoredlastName(storedLastName);
        }
        fetchEmail();
    }, []);
    const handleEditProfilePress = () => {
        navigation.navigate('ProfileScreen');
    };

    const authCtx = useContext(AuthContext);
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ backgroundColor: '#F3F3F4' }}>
                <ImageBackground

                    style={{ padding: 1, margin: 1 }}>
                    
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <EvilIcons name="user" size={45} color="#53C1BA" />
                        <Text
                            style={{
                                color: '#676A6C',
                                fontSize: 16,
                                marginTop: 5,
                                marginBottom: 5

                            }}>
                            {authCtx.firstName || storedFirstName} {authCtx.lastName || storedlastName}
                        </Text>
                        <Text
                            style={{
                                color: '#676A6C',
                                fontSize: 13,
                                marginBottom: 10

                            }}>
                            {authCtx.email || storedEmail}

                        </Text>
                    </View>

                </ImageBackground>
                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 5, borderTopWidth: 1, borderTopColor: '#1B75BB' }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#1B75BB' }}>
                
                <TouchableOpacity onPress={authCtx.logout} style={{ paddingVertical: 3 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <IconButton
                            icon="exit"
                            color='#53C1BA'
                            size={25}
                            onPress={authCtx.logout}
                        />
                        <Text
                            style={{
                                color: '#676A6C',
                                fontSize: 15,
                              
                                marginLeft: 5,
                            }}>
                            Sign Out
                        </Text>
                    </View>
                </TouchableOpacity>
                
            </View>
        </View>
    );
};

export default CustomDrawer;