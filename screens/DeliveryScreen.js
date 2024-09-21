import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, { useEffect, useRef } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Icon from 'react-native-feather';
import COLORS from '../constants/colors';



const DeliveryScreen = ({navigation}) => {
    const mapRef = useRef(null);

    const initialLocation = {
        latitude: 10.029200,
        longitude: 105.768852,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    const markerLocation = {
        latitude: 10.031,
        longitude: 105.762,
    };

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.animateToRegion({
                ...markerLocation,
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
                    coordinate={markerLocation}
                    title="Foody"
                    description="Fast Food, Full Flavor!"
                />
            </MapView>

            <View className="rounded-t-3xl -mt-12 bg-white relative">
                <View className="flex-row justify-between px-5 pt-10">
                    <View>
                        <Text className="text-lg text-gray-700 font-semibold">
                            Estimated Arrival
                        </Text>

                        <Text className="text-3xl font-extrabold text-gray-700">
                            15-20 minutes
                        </Text>

                        <Text className="mt-2 text-gray-700 font-semibold">Your order is own its way!</Text>
                    </View>

                    <Image className="w-24 h-24" source={require("../assets/deliveryman.png")}/>
                </View>

                <View style={{backgroundColor: "rgba(249, 129, 58, 0.8)"}}
                    className="p-2 flex-row justify-between items-center rounded-full my-5 mx-2">

                    <View className="p-1 rounded-full" style={{backgroundColor: "rbga(255,255,255,0.4)"}}>
                        <Image className="w-16 h-16 rounded-full" source={require("../assets/deliveryman-avatar.png")}/>
                    </View>

                    <View className="flex-1 ml-3">
                        <Text className="text-lg font-bold text-white">Michael Brown</Text>
                        <Text className="font-semibold text-white">Delivery Driver</Text>
                    </View>

                    <View className="flex-row items-center space-x-3 mr-3">
                        <TouchableOpacity className="bg-white p-2 rounded-full">
                            <Icon.Phone fill={COLORS.primary} stroke={COLORS.primary} strokeWidth={1}/>
                        </TouchableOpacity>

                        <TouchableOpacity className="bg-white p-2 rounded-full">
                            <Icon.X fill={COLORS.primary} stroke="red" strokeWidth={3}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default DeliveryScreen
