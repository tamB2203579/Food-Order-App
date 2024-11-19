import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker, Polyline, Circle } from 'react-native-maps';
import * as Icon from 'react-native-feather';
import COLORS from '../constants/colors';
import * as Location from 'expo-location';

const DeliveryScreen = ({ navigation }) => {
    const [location, setLocation] = useState();
    const mapRef = useRef(null);

    const initialLocation = {
        latitude: 10.031289,
        longitude: 105.769156,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    const current = {
        latitude: 10.031,
        longitude: 105.7691,
    };
    
    const markerLocation = {
        latitude: 10.027034,
        longitude: 105.770529,
    };
    

    useEffect(() => {
        const getPermissions = async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if(status !== 'granted'){
                console.log("Please grant location permission");
                return;
            }
            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
            console.log("Location:", currentLocation);
        }
        getPermissions();
        if (mapRef.current) {
            mapRef.current.animateToRegion({
                ...current,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
            }, 1000);
        }
    }, []);

    return (
        <View style={{ flex: 1 }}>

            <MapView
                style={{ flex: 1 }}
                ref={mapRef}
                initialRegion={initialLocation}
                mapType='standard'
            >
                <Marker
                    coordinate={current}
                    title="Current Location"
                    description="You are here"
                />

                <Marker
                    coordinate={markerLocation}
                    title="Foody"
                    description="Fast Food, Full Flavor!"
                />

                <Circle
                    center={current}
                    radius={30}
                    stroke = "#5b5b5c"
                    fillColor = "#ebf5fb"
                />

                <Polyline
                    coordinates={[current,
                        {
                            latitude: 10.030546,
                            longitude: 105.768730,
                        },
                        {
                            latitude: 10.028967,
                            longitude: 105.771207,
                        },
                        {
                            latitude: 10.027356,
                            longitude: 105.769793,
                        },
                        {
                            latitude: 10.026932,
                            longitude: 105.77044,
                        },
                        markerLocation]}
                    strokeColor="hotpink"
                    strokeWidth={3}
                />
            </MapView>

            <View className="rounded-t-3xl -mt-12 bg-white relative">
                <View className="flex-row justify-between px-5 pt-10">
                    <View>
                        <Text className="text-lg text-gray-700 font-semibold">
                            Estimated Arrival
                        </Text>

                        <Text className="text-3xl font-extrabold text-gray-700">
                            10-20 minutes
                        </Text>

                        <Text className="mt-2 text-gray-700 font-semibold">Your order is own its way!</Text>
                    </View>

                    <Image className="w-24 h-24" source={require("../assets/deliveryman.png")} />
                </View>

                <View style={{ backgroundColor: "rgba(249, 129, 58, 0.8)" }}
                    className="p-2 flex-row justify-between items-center rounded-full my-5 mx-2">

                    <View className="p-1 rounded-full" style={{ backgroundColor: "rbga(255,255,255,0.4)" }}>
                        <Image className="w-16 h-16 rounded-full" source={require("../assets/deliveryman-avatar.png")} />
                    </View>

                    <View className="flex-1 ml-3">
                        <Text className="text-lg font-bold text-white">Michael Brown</Text>
                        <Text className="font-semibold text-white">Delivery Driver</Text>
                    </View>

                    <View className="flex-row items-center space-x-3 mr-3">
                        <TouchableOpacity className="bg-white p-2 rounded-full">
                            <Icon.Phone fill={COLORS.primary} stroke={COLORS.primary} strokeWidth={1} />
                        </TouchableOpacity>

                        <TouchableOpacity className="bg-white p-2 rounded-full">
                            <Icon.X fill={COLORS.primary} stroke="red" strokeWidth={3} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default DeliveryScreen
