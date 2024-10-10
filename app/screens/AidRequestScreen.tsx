import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import {
  ViewStyle,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Text,
  View,
  TextStyle,
} from "react-native"
import { AppStackScreenProps, navigate } from "app/navigators"
import { Screen, ListView, ListItem, Button } from "app/components"
import { useStores } from "app/models"
import { AidRequestResponse } from "app/services/api"
import { toJS } from "mobx" // MST'den JavaScript objesine dönüşüm için

interface AidRequestScreenProps extends AppStackScreenProps<"AidRequest"> {}

export const AidRequestScreen: FC<AidRequestScreenProps> = observer(function AidRequestScreen() {
  const { aidRequestStore, authenticationStore } = useStores()
  const token = authenticationStore.authentication?.token // Get the token from the authentication store
  console.log("Token:", token)
  console.log("Aid Requests before fetch:", toJS(aidRequestStore.aidRequests))

  useEffect(() => {
    if (token) {
      console.log("Fetching aid requests with token:", token)
      aidRequestStore.fetchAidRequests(token)
    }
  }, [aidRequestStore, token])

  console.log("Aid Requests after fetch:", toJS(aidRequestStore.aidRequests))

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Aid Request",
      "Are you sure you want to delete this aid request?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => aidRequestStore.deleteAidRequest(id) },
      ],
      { cancelable: true },
    )
  }

  if (aidRequestStore.isLoading) {
    return (
      <Screen style={$root}>
        <ActivityIndicator size="large" />
      </Screen>
    )
  }

  if (aidRequestStore.error) {
    return (
      <Screen style={$root}>
        <Text style={$errorText}>{`Error: ${aidRequestStore.error}`}</Text>
        <Button
          onPress={() => {
            navigate("Login")
          }}
        >
          <Text>Logout</Text>
        </Button>
      </Screen>
    )
  }

  if (aidRequestStore.aidRequests.length === 0) {
    return (
      <Screen style={$root}>
        <Text>No aid requests available.</Text>
        <Button
          onPress={() => {
            authenticationStore.logout()
            navigate("Login")
          }}
        >
          <Text>Logout</Text>
        </Button>
      </Screen>
    )
  }

  return (
    <Screen style={$root}>
      <ListView
        data={toJS(aidRequestStore.aidRequests)}
        estimatedItemSize={100}
        estimatedListSize={{ height: 300, width: 300 }}
        renderItem={({ item }: { item: AidRequestResponse }) => (
          <ListItem>
            <Text>{item.description}</Text>
            <Text>{item.status}</Text>
            <Text>{item.type}</Text>
            <Text>{item.organizationId}</Text>
            <Text>{item.userId}</Text>

            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <View style={$deleteButton}>
                <Text style={$deleteButtonText}>Delete</Text>
              </View>
            </TouchableOpacity>
          </ListItem>
        )}
      />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  padding: 16,
}

const $deleteButton: ViewStyle = {
  backgroundColor: "red",
  padding: 10,
  borderRadius: 5,
}

const $deleteButtonText: TextStyle = {
  color: "white",
}

const $errorText: TextStyle = {
  color: "red",
}
