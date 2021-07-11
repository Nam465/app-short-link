import React from 'react';
import { StyleSheet, View, Image, FlatList } from 'react-native';
import { Text, Button, Input, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign'

const QrcodeIcon = () => (
	<Icon
		name="qrcode"
		color="white"
		size={24}
	/>
)

const data = [
	{ originUrl: 'https://reactnativeelements.com/docs/input#lefticon', shortUrl: 'http://localhost:3000/pp2jy', _id: 1 },
	{ originUrl: 'https://reactnativeelements.com/docs/input#lefticon', shortUrl: 'http://localhost:3000/pp2jy', _id: 2 },
	{ originUrl: 'https://reactnativeelements.com/docs/input#lefticon', shortUrl: 'http://localhost:3000/pp2jy', _id: 3 },
	{ originUrl: 'https://reactnativeelements.com/docs/input#lefticon', shortUrl: 'http://localhost:3000/pp2jy', _id: 4 },
	{ originUrl: 'https://reactnativeelements.com/docs/input#lefticon', shortUrl: 'http://localhost:3000/pp2jy', _id: 5 },
]

const ShortUrl = ({ url }) => {
	return <View
		style={{
			borderRadius: 6,
			margin: 8,
			padding: 8,
			backgroundColor: 'rgba(255,255,255,.8)',
			shadowColor: '#000',
			shadowOffset: {
				width: 0,
				height: 10
			},
			shadowOpacity: .2,
			shadowRadius: 20
		}}
	>
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center'
			}}
		>
			<View
				style={{
					flex: 1
				}}
			>
				<Text
					style={{
						fontSize: 18,
						fontWeight: '700'
					}}
					numberOfLines={1}
				>
					{url.originUrl}
				</Text>
				<Text
					style={{
						color: '#00E199',
						fontWeight: '700'
					}}
					numberOfLines={1}
				>
					{url.shortUrl}
				</Text>
			</View>
			<Button
				icon={QrcodeIcon}
				buttonStyle={{ 
					backgroundColor: '#00E199',
					marginLeft: 16
				}}
			/>
			<Button
				title="Copy"
				buttonStyle={{
					backgroundColor: '#00E199',
					marginLeft: 8,
				}}
			/>
		</View>

	</View>
}

export default function Management(props) {

	const navigation = props.navigation

	const [urls, setUrls] = React.useState(data)
	const [search, setSearch] = React.useState('')

	return (
		<View style={styles.container}>

			<SearchBar
				placeholder="Your origin url..."
				value={search}
				onChangeText={text => { setSearch(text) }}
				lightTheme={true}
				containerStyle={{
					borderWidth: 0,
					backgroundColor: 'white',
				}}
				leftIconContainerStyle={{
					color: 'white',
					size: 24
				}}
			/>

			<FlatList
				data={urls}
				renderItem={({ item }) => <ShortUrl url={item} />}
				keyExtractor={item => JSON.stringify(item._id)}
			/>

			<Button
				onPress={() => { navigation.navigate('Homepage') }}
				title="Beauti your link now"
				buttonStyle={{
					backgroundColor: '#EF264B',
					height: 50,
					borderRadius: 40,
					margin: 16
				}}
				containerStyle={{
					borderRadius: 40,
					overflow: 'hidden',
					position: 'absolute',
					bottom: 0,
					width: '100%'
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});
