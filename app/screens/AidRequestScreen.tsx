import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator } from "react-native"
import { useStores } from "../models"
import { loadString } from "../utils/storage"
import { toJS } from "mobx"
import { AppStackScreenProps } from "app/navigators/AppNavigator"

import { ListView, ListItem } from "../components"
import { AidRequestResponse } from "app/services/api"
interface AidRequestProps extends AppStackScreenProps<"AidRequest"> {}

export const AidRequestScreen: React.FC<AidRequestProps> = observer(() => {
  const { aidRequestStore } = useStores()

  useEffect(() => {
    const fetchData = async () => {
      const token = await loadString("token")
      console.log("Aid Requests before fetch:", toJS(aidRequestStore.aidRequests))
      if (token) {
        await aidRequestStore.fetchAidRequests(token)
      }
    }

    fetchData()
  }, [aidRequestStore])

  if (aidRequestStore.isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  return (
    <ListView
      data={aidRequestStore.aidRequests}
      estimatedItemSize={100}
      renderItem={({ item }: { item: AidRequestResponse }) => (
        <ListItem text={item.title} onPress={() => console.log("Pressed:", item)} />
      )}
      keyExtractor={(item) => item.id}
      refreshing={aidRequestStore.isLoading}
      onRefresh={async () => {
        const token = await loadString("token")
        if (token) {
          await aidRequestStore.fetchAidRequests(token)
        }
      }}
      onEndReached={() => {
        console.log("End reached")
      }}
      onEndReachedThreshold={0.5}
    />
  )
})
