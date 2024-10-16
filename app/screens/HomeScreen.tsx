import { Screen, Text, Button } from "app/components"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { useStores } from "app/models"
import { goBack, navigate } from "app/navigators/navigationUtilities"

type HomeScreenProps = AppStackScreenProps<"Home">

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  // Pull in one of our MST stores
  const { authenticationStore } = useStores()

  // Handle logout
  const handleLogout = () => {
    authenticationStore.logout()
    goBack()
  }

  return (
    <Screen style={$root} preset="scroll">
      <Text text="home" />
      <Button text="Logout" onPress={handleLogout} style={$logoutButton} />
      <Button text="Aid Request" onPress={() => navigate("AidRequest")} />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $logoutButton: ViewStyle = {
  marginTop: 20,
  paddingHorizontal: 20,
  paddingVertical: 10,
  backgroundColor: "red",
}
