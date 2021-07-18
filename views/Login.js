import React from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign'
import * as Facebook from 'expo-facebook';
import ENV from '../env'
import API from '../controller/api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../AuthContext';

const FbIcon = () => (
	<Icon
		name="facebook-square"
		color="white"
		size={24}
		style={{ marginRight: 12 }}
	/>
)

export default function Login(props) {

	const navigation = props.navigation
	const [loading, setLoading] = React.useState(false)

	const [state, dispatch] = React.useContext(AuthContext)

	async function logIn() {
		try {
			setLoading(true)
			await Facebook.initializeAsync({
				appId: ENV.FB_APP_ID,
			});
			const {
				type,
				token,
				expirationDate,
				permissions,
				declinedPermissions,
			} = await Facebook.logInWithReadPermissionsAsync({
				permissions: ['public_profile', 'email'],
			});
			if (type === 'success') { 
				/* Get user Id */
				const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`)
				let data = await response.json()

				/* Authen to server , hope get token */
			    const authenData = await API.loginWithFacebook(token, data.id) 

				/* Save token + fullName to Async Storage */
				await AsyncStorage.setItem('@user', JSON.stringify(data))

				/* Save token to Global State */
				dispatch({ type: 'SIGN_IN',  token: authenData.token, userName: authenData.userName })
			} else {
				throw new Error()
			}
		} catch (error) {
			alert(`Facebook Login Error: ${error.message}`);
		} finally {
			setLoading(false)
		}
	}

	return (
		<View style={styles.container}>
			<View
				style={{
					flex: 2,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text
					h1
					style={{
						color: '#00E199'
					}}
				>
					Short Link
				</Text>
				<Text
					h5
				>
					Beauty and track your link
				</Text>

			</View>

			<View
				style={{
					flex: 1,
					justifyContent: 'flex-end',
					paddingBottom: 100,
					width: '100%'
				}}
			>
				<Button
					onPress={() => {
						navigation.navigate('Homepage')
					}}
					buttonStyle={{
						marginBottom: 24
					}}
					title="😢   Dont care, just go ahead "
					type="outline"
				/>
				<Button
					onPress={logIn}
					loading={loading}
					title="Login now"
					icon={FbIcon}
				/>
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
