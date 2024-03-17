import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../store/auth-context';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import BASE_URL from '../config';


const Dashboard = ({ navigation }) => {
    const authCtx = useContext(AuthContext);
    const jwtToken = authCtx.token;
    const [savedCount, setSavedCount] = useState(null);
    const [completedCount, setCompletedCount] = useState(null);
    const [verifiedCount, setVerifiedCount] = useState(null);
    const [approvedCount, setApprovedCount] = useState(null);

    
    return (
        <View style={styles.container}>
        <View>
            <Text style={styles.countText}>Welcome</Text>
            <TouchableOpacity 
                style={styles.submitButton}
            onPress={() => navigation.navigate('Submit Form')}>
                <Text style={styles.NormalText}>Submit New Form</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.submitButton}
            onPress={() => navigation.navigate('Get Form Data')}>
                <Text style={styles.NormalText}>Get Form data</Text>
            </TouchableOpacity>
        </View>
           
           
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    card: {
        width: 130,
        height: 130,
        backgroundColor: 'lightblue',
        borderRadius: 10,
        marginHorizontal: 5,
    },
    countText: {
        alignSelf: 'center',
        padding: 30,
        fontSize: 40,
        fontWeight: 'bold',
        color: "#1B75BB",
    },
    graphStyle: {
        borderRadius: 20,
    },
    NormalText: {
        color: "#05726b",
        alignSelf: 'center',
    },
    submitButton: {
        backgroundColor: '#53C1BA',
        padding: 10,
        margin: 15,
        height: 40,
        borderRadius: 10,
    },

});

export default Dashboard;
