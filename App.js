import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


/*
	Screen
*/
import Homepage from './views/Home'
import Login from './views/Login'
import Management from './views/Management';
import Setting from './views/Setting';

const Stack = createStackNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{
				headerStyle: {
					backgroundColor: '#EF264B',
				},
				headerTintColor: 'white',
				headerTitleAlign: 'center'
			}}>

				<Stack.Screen
					name="Login"
					component={Login}
					options={{
						headerShown: false
					}}
				/>
				<Stack.Screen
					name="Homepage"
					component={Homepage}
					options={{
						title: 'Home'
					}}
				/>
				<Stack.Screen 
					name="Management"
					component={Management}
				/>
				<Stack.Screen 
					name="Setting"
					component={Setting}
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
