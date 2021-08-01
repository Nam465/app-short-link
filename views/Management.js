import React from 'react';
import { StyleSheet, View, Image, FlatList, RefreshControl } from 'react-native';
import { Text, Button, Input, SearchBar, BottomSheet } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign'
import * as Clipboard from 'expo-clipboard';
import { useToast } from "react-native-toast-notifications";
import API from '../controller/api'
import AuthContext from '../AuthContext';
import ENV from '../env'

const CopyIcon = () => (
	<Icon
		name="copy1"
		color="white"
		size={24}
	/>
)

const ShortUrl = ({ url }) => {

	const toast = useToast()

	const copy = () => {
		const shortUrl = ENV.API_HOST + '/' + url._id
		Clipboard.setString(shortUrl)
		toast.show('Copied')
	}

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
					/{url._id}
				</Text>
			</View>
			<Button
				icon={CopyIcon}
				buttonStyle={{
					backgroundColor: '#00E199',
					marginLeft: 16,
					width: 40,
					height: 40,
					borderRadius: 50,
				}}
				onPress={copy}
			/>

		</View>

	</View>
}

export default function Management(props) {

	const navigation = props.navigation

	const [urls, setUrls] = React.useState([])
	const [search, setSearch] = React.useState('')
	const [totalPages, setTotalPages] = React.useState(0)
	const [currentPages, setCurrentPages] = React.useState(0)
	const [refreshing, setRefreshing] = React.useState(false)
	const [state, dispatch] = React.useContext(AuthContext)

	React.useEffect(() => {
		loadPageZero()
	}, [])

	const loadPageZero = async () => {
		const data = await API.loadLinkOfUser(
			state.userToken,
			0
		)

		setUrls(data.items)
		setTotalPages(data.totalPages)
		setCurrentPages(data.currentPage)
	}

	const onRefresh = async () => {
		setRefreshing(true)
		await loadPageZero()
		setRefreshing(false)
	}

	const handleLoadMore = async () => {

		// There is no data left
		if (currentPages + 1 == totalPages)
			return

		setRefreshing(true)
		const data = await API.loadLinkOfUser(
			state.userToken,
			Number(currentPages) + 1
		)

		setUrls([...urls, ...data.items])
		setTotalPages(data.totalPages)
		setCurrentPages(data.currentPage)
		setRefreshing(false)
	}

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
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				onEndReachedThreshold={0.5}
				onEndReached={handleLoadMore}
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
