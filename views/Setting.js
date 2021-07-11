import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button } from 'react-native-elements';

export default function Setting(props) {

	const navigation = props.navigation

	return (
		<View style={styles.container}>
			<Text h3>Setting</Text>
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
