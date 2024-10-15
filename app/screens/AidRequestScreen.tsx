import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { useStores } from "../models"
import { AppStackScreenProps } from "app/navigators/AppNavigator"
import { ListView, ListItem } from "../components"
import { AidRequestResponse } from "app/services/api"
import { ActivityIndicator, View, Text } from "react-native"
import { toJS } from "mobx"

interface AidRequestProps extends AppStackScreenProps<"AidRequest"> {}

export const AidRequestScreen: React.FC<AidRequestProps> = observer(() => {
  const { aidRequestStore } = useStores()

  // Function to fetch aid requests
  const fetchData = async () => {
    await aidRequestStore.fetchAidRequests()
  }

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData()
    console.log(aidRequestStore.getAidRequest())
  }, [aidRequestStore]) // Add aidRequestStore to the dependency array

  // Render the loading spinner or the list
  if (aidRequestStore.isLoading) {
    return <ActivityIndicator size="large" /> // Display loading indicator while fetching
  }

  if (aidRequestStore.error) {
    return (
      <View>
        <Text>Error loading aid requests: {aidRequestStore.error}</Text>
      </View>
    )
  }

  return (
    <ListView
      data={toJS(aidRequestStore.getAidRequest())} // Directly use `aidRequests` from the store
      estimatedItemSize={100}
      renderItem={({ item }: { item: AidRequestResponse }) => (
        <ListItem text={item.title} onPress={() => console.log("Pressed:", item)}>
          <Text>{item.description}</Text>
          <Text>{item.status}</Text>
        </ListItem>
      )}
      keyExtractor={(item) => item.id.toString()} // Ensure id is a string
      refreshing={aidRequestStore.isLoading} // Use `isLoading` for pull-to-refresh
      onRefresh={fetchData} // Re-fetch data when pulled to refresh
      onEndReached={() => {
        console.log("End reached")
      }}
      onEndReachedThreshold={0.5}
    />
  )
})

export default AidRequestScreen
