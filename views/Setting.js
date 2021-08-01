import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button, Avatar, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign'
import AuthContext from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FbIcon = () => (
	<Icon
		name="facebook-square"
		color="white"
		size={24}
		style={{ marginRight: 12 }}
	/>
)

export default function Setting(props) {

	const navigation = props.navigation
	const [loading, setLoading] = React.useState(true)
	const [login, setLogin] = React.useState(false)
	const [state, dispatch] = React.useContext(AuthContext)
	const [user, setUser] = React.useState(null)
	const [onLogin, setOnLogin] = React.useState(false)

	const signOut = async () => {
		try {
			await AsyncStorage.clear()
			dispatch({ type: 'SIGN_OUT' })
			navigation.navigate('Login')

		} catch (error) {
			console.log(error)
		}

	}

	React.useEffect(() => {
		if (state.userToken) {
			setLogin(true)
		}
		else {
			setLogin(false)
		}
		setLoading(false)

	}, [])

	const loginNow = () => {
		navigation.navigate('Login')
	}

	if (loading) {
		return (
			<Text></Text>
		)
	}


	return (
		<View style={styles.container}>
			<Card
				containerStyle={{
					borderRadius: 6,
				}}
				wrapperStyle={{
					alignItems: 'center'
				}}
			>
				<Text>Short Link Application</Text>
				<Text>V1.0.0</Text>
				<Text>Contact: namggg462@gmail.com</Text>
			</Card>

			{login &&
				<Button
					title="Logout"
					loading={onLogin}
					type="outline"
					onPress={() => {
						setOnLogin(true)
						signOut()
					}}
				/>
			}

			{!login && <Button
				title="Login now"
				icon={FbIcon}
				buttonStyle={{ marginTop: 64 }}
				onPress={() => {
					loginNow()
				}}
			/>}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'stretch',
		justifyContent: 'space-between',
		padding: 24,
	},
});
