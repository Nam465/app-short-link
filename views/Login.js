import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign'

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
					onPress={() => {
						navigation.navigate('Homepage')
					}} 
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
