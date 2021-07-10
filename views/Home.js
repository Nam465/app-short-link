import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';

export default function Launch(props) {

    const navigation = props.navigation

    return (
        <View style={styles.container}>

            <View style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text>Your long link</Text>
                <Input placeholder="origin link" />

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    width: '100%'
                }}>
                    <Button
                        onPress={() => { }}
                        title="QR"
                        buttonStyle={{
                            marginRight: 12,
                            paddingRight: 12,
                            paddingLeft: 12,
                        }}
                    />
                    <Button
                        onPress={() => { }}
                        title="Paste"
                    />
                </View>

                <Pressable
                    onPress={() => {
                        alert('press')
                    }}
                    style={{
                        width: 200,
                        height: 200,
                        backgroundColor: '#EF264B',
                        borderRadius: 500,
                        alignItems: 'center',
                        justifyContent: 'center',
                        elevation: 7,
                        marginTop: 62
                    }}
                >
                    <Text
                        h2
                        style={{ color: 'white' }}
                    >Beauti</Text>
                </Pressable>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24
    },
});
