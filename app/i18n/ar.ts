import { Translations } from "./en"

const ar: Translations = {
  common: {
    ok: "نعم",
    cancel: "حذف",
    back: "خلف",
    logOut: "تسجيل خروج", // @demo remove-current-line
  },
  welcomeScreen: {
    postscript:
      "ربما لا يكون هذا هو الشكل الذي يبدو عليه تطبيقك مالم يمنحك المصمم هذه الشاشات وشحنها في هذه الحالة",
    readyForLaunch: "تطبيقك تقريبا جاهز للتشغيل",
    exciting: "اوه هذا مثير",
    letsGo: "لنذهب", // @demo remove-current-line
  },
  errorScreen: {
    title: "هناك خطأ ما",
    friendlySubtitle:
      "هذه هي الشاشة التي سيشاهدها المستخدمون في عملية الانتاج عند حدوث خطأ. سترغب في تخصيص هذه الرسالة ( الموجودة في 'ts.en/i18n/app') وربما التخطيط ايضاً ('app/screens/ErrorScreen'). إذا كنت تريد إزالة هذا بالكامل، تحقق من 'app/app.tsp' من اجل عنصر <ErrorBoundary>.",
    reset: "اعادة تعيين التطبيق",
    traceTitle: "خطأ من مجموعة %{name}", // @demo remove-current-line
  },
  emptyStateComponent: {
    generic: {
      heading: "فارغة جداً....حزين",
      content: "لا توجد بيانات حتى الآن. حاول النقر فوق الزر لتحديث التطبيق او اعادة تحميله.",
      button: "لنحاول هذا مرّة أخرى",
    },
  },
  // @demo remove-block-start
  errors: {
    invalidEmail: "عنوان البريد الالكتروني غير صالح",
  },
  loginScreen: {
    logIn: "تسجيل الدخول",
    signUp: "اشتراك",
    enterDetails:
      "أدخل بياناتك أدناه لفتح معلومات سرية للغاية. لن تصدق ما لدينا في انتظارك. أو ربما ستتوقع، الأمر ليس بعلم الصواريخ هنا.",
    emailFieldLabel: "البريد الإلكتروني",
    passwordFieldLabel: "كلمة المرور",
    confirmPasswordFieldLabel: "تأكيد كلمة المرور",
    emailFieldPlaceholder: "أدخل عنوان بريدك الإلكتروني",
    passwordFieldPlaceholder: "كلمة مرور سرية جدًا هنا",
    confirmPasswordFieldPlaceholder: "أكد كلمة مرورك",
    tapToLogIn: "اضغط لتسجيل الدخول!",
    tapToSignUp: "اضغط للتسجيل!",
    haveAccount: "هل لديك حساب بالفعل؟",
    noAccount: "ليس لديك حساب؟",
    hint: "تلميح: يمكنك استخدام أي عنوان بريد إلكتروني وكلمة المرور المفضلة لديك :)",
  },
  registerScreen: {
    signUp: "اشتراك",
    enterDetails:
      "أدخل بياناتك أدناه لفتح معلومات سرية للغاية. لن تصدق ما لدينا في انتظارك. أو ربما ستتوقع، الأمر ليس بعلم الصواريخ هنا.",
    emailFieldLabel: "البريد الإلكتروني",
    passwordFieldLabel: "كلمة المرور",
    confirmPasswordFieldLabel: "تأكيد كلمة المرور",
    emailFieldPlaceholder: "أدخل عنوان بريدك الإلكتروني",
    passwordFieldPlaceholder: "كلمة مرور سرية جدًا هنا",
    confirmPasswordFieldPlaceholder: "أكد كلمة مرورك",
    tapToSignUp: "اضغط للتسجيل!",
    haveAccount: "هل لديك حساب بالفعل؟",
    noAccount: "ليس لديك حساب؟",
    hint: "تلميح: يمكنك استخدام أي عنوان بريد إلكتروني وكلمة المرور المفضلة لديك :)",
  },

  // @demo remove-block-end
}

export default ar
