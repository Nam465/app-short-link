import React from 'react';
import { Pressable } from 'react-native';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';

export default function Launch({ navigation }) {

    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => {
                    navigation.navigate('Login')
                }}
            >
                <Image 
                    source={require('../media/launch-img-1.png')}
                />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
