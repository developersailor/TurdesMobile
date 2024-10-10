const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    logOut: "Log Out", // @demo remove-current-line
  },
  welcomeScreen: {
    postscript:
      "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
    readyForLaunch: "Your app, almost ready for launch!",
    exciting: "(ohh, this is exciting!)",
    letsGo: "Let's go!", // @demo remove-current-line
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
    traceTitle: "Error from %{name} stack", // @demo remove-current-line
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
  // @demo remove-block-start
  errors: {
    invalidEmail: "Invalid email address.",
  },
  loginScreen: {
    logIn: "Log In",
    signUp: "Sign Up",
    enterDetails:
      "Enter your details below to unlock top secret info. You'll never guess what we've got waiting. Or maybe you will; it's not rocket science here.",
    emailFieldLabel: "Email",
    passwordFieldLabel: "Password",
    confirmPasswordFieldLabel: "Confirm Password",
    emailFieldPlaceholder: "Enter your email address",
    passwordFieldPlaceholder: "Super secret password here",
    confirmPasswordFieldPlaceholder: "Confirm your password",
    tapToLogIn: "Tap to log in!",
    tapToSignUp: "Tap to sign up!",
    haveAccount: "Already have an account?",
    noAccount: "Don’t have an account?",
    hint: "Hint: you can use any email address and your favorite password :)",
  },
  registerScreen: {
    signUp: "Sign Up",
    enterDetails:
      "Enter your details below to unlock top secret info. You'll never guess what we've got waiting. Or maybe you will; it's not rocket science here.",
    emailFieldLabel: "Email",
    passwordFieldLabel: "Password",
    confirmPasswordFieldLabel: "Confirm Password",
    emailFieldPlaceholder: "Enter your email address",
    passwordFieldPlaceholder: "Super secret password here",
    confirmPasswordFieldPlaceholder: "Confirm your password",
    tapToSignUp: "Tap to sign up!",
    haveAccount: "Already have an account?",
    noAccount: "Don’t have an account?",
    hint: "Hint: you can use any email address and your favorite password :)",
    phoneFieldLabel: "Phone",
    phoneFieldPlaceholder: "Enter your phone number",
    nameFieldLabel: "Name",
    nameFieldPlaceholder: "Enter your name",
  },
  // @demo remove-block-end
  // @demo remove-block-start

  // @demo remove-block-end
}

export default en
export type Translations = typeof en
