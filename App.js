import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

/*
	Screen
*/
import Launch from './views/Launch'
import Homepage from './views/Home'
import Login from './views/Login'

const Stack = createStackNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen 
					name="Launch"
					component={Launch}
				/>

				<Stack.Screen 
					name="Homepage"
					component={Homepage}
					options={{title: 'Hello babe'}}
				/>
				<Stack.Screen 
					name="Login"
					component={Login}
				/>
			</Stack.Navigator>
		</NavigationContainer>
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
