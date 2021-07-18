import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import Icon3 from 'react-native-vector-icons/MaterialIcons'
import AuthContext from '../AuthContext';

const UrlIcon = () => (
    <Icon
        name="link"
        color="#00E199"
        style={{
            fontSize: 24,
            marginRight: 12
        }}
    />
)

const MagicIcon = () => (
    <Icon2
        name="magic"
        color="#00E199"
        style={{
            fontSize: 24,
            marginRight: 12
        }}
    />
)

const QrcodeIcon = () => (
    <Icon
        name="qrcode"
        color="white"
        size={24}
        style={{
            marginRight: 8
        }}
    />
)

const PasteIcon = () => (
    <Icon3
        name="content-paste"
        color="white"
        size={24}
        style={{
            marginRight: 8
        }}
    />
)

const OpenBrowerIcon = () => (
    <Icon3
        name="open-in-new"
        color="white"
        style={{
            fontSize: 24,
        }}
    />
)


export default function Homepage(props) {

    const navigation = props.navigation
    const [showOutput, setShowOutput] = React.useState(false)
    const [state, dispatch] = React.useContext(AuthContext)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Icon
                        onPress={() => { navigation.navigate('Management') }}
                        name='table'
                        color='white'
                        size={24}
                        style={{ marginRight: 16 }}
                        underlayColor="#333"
                    />

                    <Icon
                        onPress={() => { navigation.navigate('Setting') }}
                        name='setting'
                        color='white'
                        size={24}
                        style={{ marginRight: 16 }}
                        underlayColor="#333"
                    />
                </View>
            }
        })
    }, [navigation])

    return (
        <View style={styles.container}>

            <View style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}>

                {/* INPUT ORIGIN URL */}
                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                }}>
                    <UrlIcon />
                    <Text
                        h4
                        h4Style={{ color: '#5F5F5F' }}
                    >
                        Your long link
                    </Text>
                </View>
                <Input />

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
                            backgroundColor: '#00E199'
                        }}
                        icon={QrcodeIcon}
                    />
                    <Button
                        onPress={() => { }}
                        title="Paste"
                        buttonStyle={{
                            backgroundColor: '#00E199'
                        }}
                        icon={PasteIcon}
                    />
                </View>

                {/* GENERATE SHORT LINK BUTTON */}
                {showOutput == false &&
                    <Pressable
                        onPress={()=>{setShowOutput(true)}}
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
                }

                {/* OUTPUT SERVER RETURN */}
                {showOutput && <>
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        marginTop: 24
                    }}>
                        <MagicIcon />
                        <Text
                            h4
                            h4Style={{ color: '#5F5F5F' }}
                        >
                            Beauty and short link
                        </Text>
                    </View>
                    <Input />

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        width: '100%'
                    }}>
                        <Button
                            onPress={() => { }}
                            title=""
                            buttonStyle={{
                                backgroundColor: '#00E199',
                                marginRight: 12
                            }}
                            icon={OpenBrowerIcon}
                        />
                        <Button
                            onPress={() => { }}
                            title="QR"
                            buttonStyle={{
                                marginRight: 12,
                                backgroundColor: '#00E199'
                            }}
                            icon={QrcodeIcon}
                        />
                        <Button
                            onPress={() => { }}
                            title="Paste"
                            buttonStyle={{
                                backgroundColor: '#00E199'
                            }}
                            icon={PasteIcon}
                        />
                    </View>


                    <View style={{
                        width: '100%',
                        marginTop: 36
                    }}>
                        <Button
                            onPress={()=>{setShowOutput(false)}}
                            title="Link another"
                            buttonStyle={{
                                backgroundColor: '#EF264B',
                                height: 53,
                            }}
                            raised
                        />
                    </View>
                </>}




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
