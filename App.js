import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from './AuthContext';


/*
	Screen
*/
import Splash from './views/Splash'
import Homepage from './views/Home'
import Login from './views/Login'
import Management from './views/Management';
import Setting from './views/Setting';

const Stack = createStackNavigator()

export default function App() {

	/*
		IF USER NOT SINGIN, THEY CAN VISIT:
			- Login
			- Home
			- Setting

		IF USER LOGIN, THEY CAN VISIT:
			- Home
			- Management
			- Setting
	
	*/

	const [state, dispatch] = React.useReducer(
		(prevState, action) => {
			switch (action.type) {
				case 'RESTORE_TOKEN':
					return {
						...prevState,
						userToken: action.token,
						isLoading: false,
						userName: action.userName
					}
				case 'SIGN_IN':
					return {
						...prevState,
						userToken: action.token,
						isSignout: false,
						userName: action.userName

					}
				case 'SIGN_OUT':
					console.log('in sign out case block')
					return {
						...prevState,
						userToken: null,
						isSignout: true,
						userName: null
					}
			}
		},
		{
			isLoading: true,
			isSignout: false,
			userToken: null,
			userName: null
		}
	)

	React.useEffect(() => {
		const bootstrapAsync = async () => {
			let userToken = null
			let userName = null

			try {
				const data = await AsyncStorage.getItem('@user')
				userToken = data.token
				userName = data.userName

			} catch (error) {

			}

			dispatch({ type: 'RESTORE_TOKEN', token: userToken, userName })
		}

		bootstrapAsync()
	}, [])

	React.useEffect(() => {
		console.log('new', state)
	}, [state])


	if (state.isLoading) {
		return <Splash />
	}

	const Home = <Stack.Screen
		name="Homepage"
		component={Homepage}
		options={{
			title: state.userName ? `Hi, ${state.userName}` : 'Home',
			headerLeft: props => <></>,
		}}
	/>


	return (

		<AuthContext.Provider value={[state, dispatch]}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{
					headerStyle: {
						backgroundColor: '#EF264B',
					},
					headerTintColor: 'white',
					headerTitleAlign: 'center'
				}}>
					{state.userToken ? (
						<>
							{Home}
							<Stack.Screen
								name="Management"
								component={Management}
							/>
							<Stack.Screen
								name="Setting"
								component={Setting}
							/>
						</>
					) : (
						<>
							<Stack.Screen
								name="Login"
								component={Login}
								options={{
									headerShown: false,
									animationTypeForReplace: state.isSignout ? 'pop' : 'push',
								}}
							/>
							{Home}
							<Stack.Screen
								name="Setting"
								component={Setting}
							/>
						</>
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</AuthContext.Provider>

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
