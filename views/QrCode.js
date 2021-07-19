import React, { useState } from 'react'

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking,
    View,
} from 'react-native';
import {Button} from 'react-native-elements'
import { Camera } from 'expo-camera';
import Icon from 'react-native-vector-icons/Ionicons'

const FlashIcon = (props) => (
    <Button 
        icon={() => (
            <Icon 
                name="ios-flashlight"
                color="white"
                size={32}
            />
        )}
        title=""
        onPress={() => props.onPress()}
        buttonStyle={{
            backgroundColor: '#0009',
            width: 60,
            height: 60,
            borderRadius: 50,
        }}
    />
)

const Close = (props) => (
    <Button 
        icon={() => (
            <Icon 
                name="close"
                color="white"
                size={32}
            />
        )}
        title=""
        onPress={() => props.onPress()}
        buttonStyle={{
            backgroundColor: '#0009',
            width: 60,
            height: 60,
            borderRadius: 50,
        }}
    />
)

export default function QrCode(props) {

    /*
        1. Get camera permision 
        - No Permission
        - Refuse Permission
        - Has Permission

        2. If has permission
        - Show BarCodeScanner tag
        - Define onBarCodeScanner callback

    */

    const [hasPermission, setPermission] = React.useState(null)
    const [scanned, setScanned] = React.useState(false)
    const [flash, setFlash] = React.useState('off')

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true)
        props.onQrScanned(data)
    }

    const toggleFlash = () => {
        if (flash == 'off') setFlash('torch')
        if (flash != 'off') setFlash('off')
    }

    React.useEffect(() => {
        (async () => {
            try {
                const { status } = await Camera.requestPermissionsAsync();
                setPermission(status === 'granted')
            } catch (error) { }
        })()
    }, [])

    if (hasPermission == null) {
        return <Text>Requesting for camera permission</Text>
    }

    if (hasPermission == false) {
        return <Text>No access to camera</Text>
    }

    return (
        <View style={styles.container}>
            <Camera
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={styles.qrStyle}
                barCodeTypes={['qr']}
                flashMode={flash}
            >
            </Camera>
            <View style={styles.tooltip_wrap}>
                <Text style={styles.tooltip}>Scan Qr Code</Text>
            </View>
            <View
                style={styles.buttons}
            >
                <FlashIcon onPress={toggleFlash} />
                <Close onPress={props.onClose} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    qrStyle: {
        height: '100%'
    },
    buttons: {
        position: 'absolute',
        bottom: 150,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    tooltip_wrap: {
        position: 'absolute',
        top: 100,
        width: '100%',
        alignItems: 'center',
        borderColor: '#0000',
        borderStyle: 'solid',
        borderWidth: 2
    },
    tooltip: {
        width: 200,
        padding: 10,
        borderRadius: 32,
        textAlign: 'center',
        backgroundColor: '#0009',
        color: 'white',
        fontSize: 18,
    }
})