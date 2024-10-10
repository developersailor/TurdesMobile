import { Translations } from "./en"

const fr: Translations = {
  common: {
    ok: "OK !",
    cancel: "Annuler",
    back: "Retour",
    logOut: "Déconnexion", // @demo remove-current-line
  },
  welcomeScreen: {
    postscript:
      "psst  — Ce n'est probablement pas à quoi ressemble votre application. (À moins que votre designer ne vous ait donné ces écrans, dans ce cas, mettez la en prod !)",
    readyForLaunch: "Votre application, presque prête pour le lancement !",
    exciting: "(ohh, c'est excitant !)",
    letsGo: "Allons-y !", // @demo remove-current-line
  },
  errorScreen: {
    title: "Quelque chose s'est mal passé !",
    friendlySubtitle:
      "C'est l'écran que vos utilisateurs verront en production lorsqu'une erreur sera lancée. Vous voudrez personnaliser ce message (situé dans `app/i18n/fr.ts`) et probablement aussi la mise en page (`app/screens/ErrorScreen`). Si vous voulez le supprimer complètement, vérifiez `app/app.tsx` pour le composant <ErrorBoundary>.",
    reset: "RÉINITIALISER L'APPLICATION",
    traceTitle: "Erreur depuis %{name}", // @demo remove-current-line
  },
  emptyStateComponent: {
    generic: {
      heading: "Si vide... si triste",
      content:
        "Aucune donnée trouvée pour le moment. Essayez de cliquer sur le bouton pour rafraîchir ou recharger l'application.",
      button: "Essayons à nouveau",
    },
  },
  // @demo remove-block-start
  errors: {
    invalidEmail: "Adresse e-mail invalide.",
  },
  loginScreen: {
    logIn: "Se connecter",
    signUp: "S'inscrire",
    enterDetails:
      "Entrez vos informations ci-dessous pour débloquer des informations top secrètes. Vous ne devinerez jamais ce que nous avons en attente. Ou peut-être que vous le ferez ; ce n'est pas de la science spatiale ici.",
    emailFieldLabel: "E-mail",
    passwordFieldLabel: "Mot de passe",
    confirmPasswordFieldLabel: "Confirmer le mot de passe",
    emailFieldPlaceholder: "Entrez votre adresse e-mail",
    passwordFieldPlaceholder: "Mot de passe super secret ici",
    confirmPasswordFieldPlaceholder: "Confirmez votre mot de passe",
    tapToLogIn: "Appuyez pour vous connecter!",
    tapToSignUp: "Appuyez pour vous inscrire!",
    haveAccount: "Vous avez déjà un compte ?",
    noAccount: "Vous n'avez pas de compte ?",
    hint: "Astuce : vous pouvez utiliser n'importe quelle adresse e-mail et votre mot de passe préféré :)",
  },
  registerScreen: {
    signUp: "S'inscrire",
    enterDetails:
      "Entrez vos informations ci-dessous pour déverrouiller des infos top secrètes. Vous ne devinerez jamais ce que nous avons en réserve. Ou peut-être que si ; ce n'est pas de la science spatiale.",
    emailFieldLabel: "E-mail",
    passwordFieldLabel: "Mot de passe",
    confirmPasswordFieldLabel: "Confirmer le mot de passe",
    emailFieldPlaceholder: "Entrez votre adresse e-mail",
    passwordFieldPlaceholder: "Mot de passe ultra secret ici",
    confirmPasswordFieldPlaceholder: "Confirmez votre mot de passe",
    tapToSignUp: "Appuyez pour s'inscrire !",
    haveAccount: "Vous avez déjà un compte ?",
    noAccount: "Vous n'avez pas de compte ?",
    hint: "Indice : vous pouvez utiliser n'importe quelle adresse e-mail et votre mot de passe préféré :)",
  },
}

export default fr
