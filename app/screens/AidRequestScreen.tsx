import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { useStores } from "../models"
import { AppStackScreenProps } from "app/navigators/AppNavigator"
import { ListView, ListItem } from "../components"
import { AidRequestResponse } from "app/services/api"
import { ActivityIndicator } from "react-native"

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
  }, []) // Empty dependency array ensures this runs only once on mount

  // Render the loading spinner or the list
  if (aidRequestStore.isLoading) {
    return <ActivityIndicator size="large" /> // Display loading indicator while fetching
  }

  return (
    <ListView
      data={aidRequestStore.aidRequests} // Directly use `aidRequests` from the store
      estimatedItemSize={100}
      renderItem={({ item }: { item: AidRequestResponse }) => (
        <ListItem text={item.title} onPress={() => console.log("Pressed:", item)} />
      )}
      keyExtractor={(item) => item.id}
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
