import React, { useEffect, useState } from "react"
import { ActivityIndicator, Text, View } from "react-native"
import { ListView, ListItem } from "../components"
import { useStores } from "../models"
import { navigate } from "../navigators/navigationUtilities"
import { AidRequestResponse } from "app/services/api"
import { AppStackScreenProps } from "app/navigators/AppNavigator"
import { observer } from "mobx-react-lite"

export interface AidRequestScreenProps extends AppStackScreenProps<"AidRequest"> {}

export const AidRequestScreen: React.FC<AidRequestScreenProps> = observer(
  ({ navigation, route }) => {
    const { aidRequestStore } = useStores()
    const [isLoading, setIsLoading] = useState(false)

    const fetchData = async () => {
      setIsLoading(true)
      await aidRequestStore.fetchAidRequests()
      setIsLoading(false)
    }

    useEffect(() => {
      fetchData()
    }, [])

    useEffect(() => {
      if (aidRequestStore.error === "unauthorized") {
        navigate("Login")
      }
    }, [aidRequestStore.error])

    if (aidRequestStore.isLoading || isLoading) {
      return <ActivityIndicator size="large" /> // Display loading indicator while fetching
    }

    if (aidRequestStore.error && aidRequestStore.error !== "unauthorized") {
      return <Text>Error loading data: {aidRequestStore.error}</Text> // Display error message
    }
    if (aidRequestStore.error && aidRequestStore.error !== "unauthorized") {
      return (
        <View>
          <Text>Error loading data: {aidRequestStore.error}</Text>
          <Text>Please check your network connection or try again later.</Text>
        </View>
      ) // Display error message
    }
    return (
      <ListView
        data={aidRequestStore.aidRequests.slice()} // Directly use `aidRequests` from the store
        estimatedItemSize={100}
        renderItem={({ item }: { item: AidRequestResponse }) => (
          <ListItem text={item.title} onPress={() => console.log("Pressed:", item)}>
            <Text>{item.description}</Text>
            <Text>{item.status}</Text>
          </ListItem>
        )}
        keyExtractor={(item) => item.id.toString()} // Ensure id is a string
        refreshing={isLoading} // Use `isLoading` for pull-to-refresh
        onRefresh={fetchData} // Re-fetch data when pulled to refresh
        onEndReached={() => {
          console.log("End reached")
        }}
        onEndReachedThreshold={0.5}
      />
    )
  },
)
