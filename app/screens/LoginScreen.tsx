import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { navigate } from "../navigators/navigationUtilities"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen() {
  const authPasswordInput = useRef<TextInput>(null)
  const authConfirmPasswordInput = useRef<TextInput>(null)
  const phoneInput = useRef<TextInput>(null)
  const nameInput = useRef<TextInput>(null)
  const [authPassword, setAuthPassword] = useState("")
  const [authConfirmPassword, setAuthConfirmPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const {
    authenticationStore: { authentication, login, register },
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
    setIsLoading(true)
    const result = await login(authentication.authEmail, authPassword)
    setIsLoading(false)
    if (result.kind === "ok") {
      setSuccessMessage("Login successful!")
      setTimeout(() => navigate("Home"), 1000)
    } else {
      setErrorMessage("Login failed: " + result.message)
    }
  }

  async function handleRegister() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (authentication.validationError || authPassword !== authConfirmPassword) {
      setErrorMessage("Passwords do not match or validation error.")
      return
    }

    const result = await register()
    if (result.kind === "ok") {
      setIsSubmitted(false)
      setAuthPassword("")
      setAuthConfirmPassword("")
      setSuccessMessage("Registration successful!")
      setTimeout(() => navigate("Home"), 1000)
    } else {
      setErrorMessage("Registration failed: " + result.message)
    }
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

      {errorMessage ? <Text style={$errorMessage}>{errorMessage}</Text> : null}
      {successMessage ? <Text style={$successMessage}>{successMessage}</Text> : null}

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
        <>
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
          <TextField
            ref={phoneInput}
            value={authentication.phone}
            onChangeText={(text) => authentication.setProp("phone", text)}
            containerStyle={$textField}
            autoCapitalize="none"
            autoComplete="tel"
            autoCorrect={false}
            keyboardType="phone-pad"
            labelTx="registerScreen.phoneFieldLabel"
            placeholderTx="registerScreen.phoneFieldPlaceholder"
            onSubmitEditing={() => nameInput.current?.focus()}
          />
          <TextField
            ref={nameInput}
            value={authentication.name}
            onChangeText={(text) => authentication.setProp("name", text)}
            containerStyle={$textField}
            autoCapitalize="none"
            autoComplete="name"
            autoCorrect={false}
            labelTx="registerScreen.nameFieldLabel"
            placeholderTx="registerScreen.nameFieldPlaceholder"
            onSubmitEditing={handleRegister}
          />
        </>
      )}

      <Button
        testID="login-button"
        tx={isRegistering ? "loginScreen.tapToSignUp" : "loginScreen.tapToLogIn"}
        style={$tapButton}
        preset="reversed"
        onPress={isRegistering ? handleRegister : handleLogin}
        disabled={isLoading}
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

const $errorMessage: TextStyle = {
  color: "red",
  marginBottom: spacing.md,
}

const $successMessage: TextStyle = {
  color: "green",
  marginBottom: spacing.md,
}
