import React from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator } from "react-native"
import { useStores } from "../models"
import { toJS } from "mobx"
import { AppStackScreenProps } from "app/navigators/AppNavigator"
import { ListView, ListItem } from "../components"
import { AidRequestResponse } from "app/services/api"
interface AidRequestProps extends AppStackScreenProps<"AidRequest"> {}

export const AidRequestScreen: React.FC<AidRequestProps> = observer(() => {
  const { aidRequestStore } = useStores()

  const fetchData = async () => {
    await aidRequestStore.fetchAidRequests()
    console.log("Data:", toJS(await aidRequestStore.fetchAidRequests()))
  }

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
      onRefresh={fetchData}
      onEndReached={() => {
        console.log("End reached")
      }}
      onEndReachedThreshold={0.5}
    />
  )
})

export default AidRequestScreen
