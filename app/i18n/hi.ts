import { Translations } from "./en"

const hi: Translations = {
  common: {
    ok: "ठीक है!",
    cancel: "रद्द करें",
    back: "वापस",
    logOut: "लॉग आउट", // @demo remove-current-line
  },
  welcomeScreen: {
    postscript:
      "psst - शायद आपका ऐप ऐसा नहीं दिखता है। (जब तक कि आपके डिजाइनर ने आपको ये स्क्रीन नहीं दी हों, और उस स्थिति में, इसे लॉन्च करें!)",
    readyForLaunch: "आपका ऐप, लगभग लॉन्च के लिए तैयार है!",
    exciting: "(ओह, यह रोमांचक है!)",
    letsGo: "चलो चलते हैं!", // @demo remove-current-line
  },
  errorScreen: {
    title: "कुछ गलत हो गया!",
    friendlySubtitle:
      "यह वह स्क्रीन है जो आपके उपयोगकर्ता संचालन में देखेंगे जब कोई त्रुटि होगी। आप इस संदेश को बदलना चाहेंगे (जो `app/i18n/hi.ts` में स्थित है) और शायद लेआउट भी (`app/screens/ErrorScreen`)। यदि आप इसे पूरी तरह से हटाना चाहते हैं, तो `app/app.tsx` में <ErrorBoundary> कंपोनेंट की जांच करें।",
    reset: "ऐप रीसेट करें",
    traceTitle: "%{name} स्टैक से त्रुटि", // @demo remove-current-line
  },
  emptyStateComponent: {
    generic: {
      heading: "इतना खाली... इतना उदास",
      content: "अभी तक कोई डेटा नहीं मिला। रीफ्रेश करने या ऐप को पुनः लोड करने के लिए बटन दबाएं।",
      button: "चलो फिर से कोशिश करते हैं",
    },
  },
  // @demo remove-block-start
  errors: {
    invalidEmail: "अमान्य ईमेल पता।",
  },
  loginScreen: {
    logIn: "लॉग इन करें",
    signUp: "साइन अप करें",
    enterDetails:
      "सर्वश्रेष्ठ रहस्य पता करने के लिए नीचे अपना विवरण दर्ज करें। आप कभी अनुमान नहीं लगा पाएंगे कि हमारे पास क्या इंतजार कर रहा है। या शायद आप कर सकते हैं; यह रॉकेट साइंस नहीं है।",
    emailFieldLabel: "ईमेल",
    passwordFieldLabel: "पासवर्ड",
    confirmPasswordFieldLabel: "पासवर्ड की पुष्टि करें",
    emailFieldPlaceholder: "अपना ईमेल पता दर्ज करें",
    passwordFieldPlaceholder: "सुपर सीक्रेट पासवर्ड यहाँ",
    confirmPasswordFieldPlaceholder: "अपने पासवर्ड की पुष्टि करें",
    tapToLogIn: "लॉग इन करने के लिए टैप करें!",
    tapToSignUp: "साइन अप करने के लिए टैप करें!",
    haveAccount: "क्या आपके पास पहले से एक खाता है?",
    noAccount: "क्या आपके पास खाता नहीं है?",
    hint: "संकेत: आप किसी भी ईमेल पते और अपने पसंदीदा पासवर्ड का उपयोग कर सकते हैं :)",
  },
  registerScreen: {
    signUp: "साइन अप करें",
    enterDetails:
      "नीचे अपना विवरण दर्ज करें ताकि आप टॉप सीक्रेट जानकारी को अनलॉक कर सकें। आप कभी अंदाज़ा नहीं लगा पाएंगे कि हमारे पास क्या है। या शायद आप लगा लें; यह कोई रॉकेट साइंस नहीं है।",
    emailFieldLabel: "ईमेल",
    passwordFieldLabel: "पासवर्ड",
    confirmPasswordFieldLabel: "पासवर्ड की पुष्टि करें",
    emailFieldPlaceholder: "अपना ईमेल पता दर्ज करें",
    passwordFieldPlaceholder: "यहां सुपर सीक्रेट पासवर्ड दर्ज करें",
    confirmPasswordFieldPlaceholder: "अपना पासवर्ड पुष्टि करें",
    tapToSignUp: "साइन अप करने के लिए टैप करें!",
    haveAccount: "क्या आपके पास पहले से एक खाता है?",
    noAccount: "क्या आपके पास खाता नहीं है?",
    hint: "संकेत: आप किसी भी ईमेल पते और अपने पसंदीदा पासवर्ड का उपयोग कर सकते हैं :)",
  },
}

export default hi
