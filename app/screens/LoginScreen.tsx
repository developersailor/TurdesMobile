import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { navigate } from "../navigators/navigationUtilities" // Import the navigate function

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen({ navigation }) {
  const authPasswordInput = useRef<TextInput>(null)
  const authConfirmPasswordInput = useRef<TextInput>(null)

  const [authPassword, setAuthPassword] = useState("")
  const [authConfirmPassword, setAuthConfirmPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: { authentication, login },
  } = useStores()

  useEffect(() => {
    authentication.setProp("authEmail", "john.doe@example.com")
    setAuthPassword("Password123")
    setAuthConfirmPassword("Password123")

    return () => {
      setAuthPassword("")
      setAuthConfirmPassword("")
      authentication.setProp("authEmail", "")
    }
  }, [authentication])

  const error = isSubmitted ? authentication.validationError : ""

  async function handleLogin() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (authentication.validationError) return

    const result = await login(authentication.authEmail, authPassword)
    if (result.kind === "ok") {
      setIsSubmitted(false)
      setAuthPassword("")
      setAuthConfirmPassword("")
      navigate("Home") // Use the navigate function to navigate to the Home screen
    } else {
      // Handle login error (e.g., show a message to the user)
      console.error("Login failed:", result.message)
    }
  }

  function handleRegister() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (authentication.validationError || authPassword !== authConfirmPassword) return

    setIsSubmitted(false)
    setAuthPassword("")
    setAuthConfirmPassword("")
  }

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text
        testID="login-heading"
        tx={isRegistering ? "loginScreen.signUp" : "loginScreen.logIn"}
        preset="heading"
        style={$logIn}
      />
      <Text tx="loginScreen.enterDetails" preset="subheading" style={$enterDetails} />
      {attemptsCount > 2 && <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />}

      <TextField
        value={authentication.authEmail}
        onChangeText={(text) => authentication.setProp("authEmail", text)}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="loginScreen.emailFieldLabel"
        placeholderTx="loginScreen.emailFieldPlaceholder"
        helper={error}
        status={error ? "error" : undefined}
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
        ref={authPasswordInput}
        value={authPassword}
        onChangeText={setAuthPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        labelTx="loginScreen.passwordFieldLabel"
        placeholderTx="loginScreen.passwordFieldPlaceholder"
        onSubmitEditing={
          isRegistering ? () => authConfirmPasswordInput.current?.focus() : handleLogin
        }
        RightAccessory={PasswordRightAccessory}
      />

      {isRegistering && (
        <TextField
          ref={authConfirmPasswordInput}
          value={authConfirmPassword}
          onChangeText={setAuthConfirmPassword}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={isAuthPasswordHidden}
          labelTx="loginScreen.confirmPasswordFieldLabel"
          placeholderTx="loginScreen.confirmPasswordFieldPlaceholder"
          onSubmitEditing={handleRegister}
          RightAccessory={PasswordRightAccessory}
        />
      )}

      <Button
        testID="login-button"
        tx={isRegistering ? "loginScreen.tapToSignUp" : "loginScreen.tapToLogIn"}
        style={$tapButton}
        preset="reversed"
        onPress={isRegistering ? handleRegister : handleLogin}
      />

      <Button
        testID="toggle-button"
        tx={isRegistering ? "loginScreen.haveAccount" : "loginScreen.noAccount"}
        style={$toggleButton}
        onPress={() => setIsRegistering(!isRegistering)}
      />
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $logIn: TextStyle = {
  marginBottom: spacing.sm,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
}

const $toggleButton: ViewStyle = {
  marginTop: spacing.md,
}
