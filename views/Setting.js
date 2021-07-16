import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button, Avatar, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign'

const FbIcon = () => (
	<Icon
		name="facebook-square"
		color="white"
		size={24}
		style={{ marginRight: 12 }}
	/>
)

const USER = {
	avatar: 'https://cdn.fakercloud.com/avatars/teddyzetterlund_128.jpg	',
	fullName: 'Jennifer Harris',
	email: 'Holden_Feest@yahoo.com'
}

const User = ({ user }) => {
	return <View
		style={{
			alignItems: 'center'
		}}
	>
		<Avatar
			rounded
			source={{ uri: user.avatar }}
			size='large'
		/>
		<Text
			h4
			style={{ marginTop: 12 }}
		>{user.fullName}</Text>
		<Text h5>{user.email}</Text>
	</View>
}

export default function Setting(props) {

	const navigation = props.navigation
	const [login, setLogin] = React.useState(true)

	return (
		<View style={styles.container}>
			{login && <User user={USER} />}

			{!login && <Button
				title="Login now"
				icon={FbIcon}
				buttonStyle={{ marginTop: 64 }}
			/>}


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
