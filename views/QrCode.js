import React from 'react'

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking
} from 'react-native';

export default function QrCode(props) {

    const onSuccess = e => {
        Linking.openURL(e.data).catch(err =>
            console.error('An error occured', err)
        );
    }

    return (
        <Text>hello</Text>
    )
}