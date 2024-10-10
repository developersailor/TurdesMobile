import { Translations } from "./en"

const ko: Translations = {
  common: {
    ok: "확인!",
    cancel: "취소",
    back: "뒤로",
    logOut: "로그아웃", // @demo remove-current-line
  },
  welcomeScreen: {
    postscript:
      "잠깐! — 지금 보시는 것은 아마도 당신의 앱의 모양새가 아닐겁니다. (디자이너분이 이렇게 건내주셨다면 모를까요. 만약에 그렇다면, 이대로 가져갑시다!) ",
    readyForLaunch: "출시 준비가 거의 끝난 나만의 앱!",
    exciting: "(오, 이거 신나는데요!)",
    letsGo: "가보자구요!", // @demo remove-current-line
  },
  errorScreen: {
    title: "뭔가 잘못되었습니다!",
    friendlySubtitle:
      "이 화면은 오류가 발생할 때 프로덕션에서 사용자에게 표시됩니다. 이 메시지를 커스터마이징 할 수 있고(해당 파일은 `app/i18n/ko.ts` 에 있습니다) 레이아웃도 마찬가지로 수정할 수 있습니다(`app/screens/error`). 만약 이 오류화면을 완전히 없에버리고 싶다면 `app/app.tsx` 파일에서 <ErrorBoundary> 컴포넌트를 확인하기 바랍니다.",
    reset: "초기화",
    traceTitle: "%{name} 스택에서의 오류", // @demo remove-current-line
  },
  emptyStateComponent: {
    generic: {
      heading: "너무 텅 비어서.. 너무 슬퍼요..",
      content: "데이터가 없습니다. 버튼을 눌러서 리프레쉬 하시거나 앱을 리로드하세요.",
      button: "다시 시도해봅시다",
    },
  },
  // @demo remove-block-start
  errors: {
    invalidEmail: "잘못된 이메일 주소 입니다.",
  },
  loginScreen: {
    logIn: "로그인",
    signUp: "가입하기",
    enterDetails:
      "일급비밀 정보를 해제하기 위해 상세 정보를 입력하세요. 무엇이 기다리고 있는지 절대 모를겁니다. 혹은 알 수 있을지도 모르겠군요. 엄청 복잡한 뭔가는 아닙니다.",
    emailFieldLabel: "이메일",
    passwordFieldLabel: "비밀번호",
    confirmPasswordFieldLabel: "비밀번호 확인",
    emailFieldPlaceholder: "이메일을 입력하세요",
    passwordFieldPlaceholder: "엄청 비밀스러운 암호를 입력하세요",
    confirmPasswordFieldPlaceholder: "비밀번호를 확인하세요",
    tapToLogIn: "눌러서 로그인 하기!",
    tapToSignUp: "눌러서 가입하기!",
    haveAccount: "이미 계정이 있으신가요?",
    noAccount: "계정이 없으신가요?",
    hint: "힌트: 가장 좋아하는 암호와 아무런 아무 이메일 주소나 사용할 수 있어요 :)",
  },
  registerScreen: {
    signUp: "가입하기",
    enterDetails:
      "아래에 세부 정보를 입력하여 최상위 비밀 정보를 확인하세요. 우리가 무엇을 준비했는지 절대 예상하지 못할 것입니다. 아니면 예상할 수도 있습니다. 여기서는 그리 어려운 일이 아닙니다.",
    emailFieldLabel: "이메일",
    passwordFieldLabel: "비밀번호",
    confirmPasswordFieldLabel: "비밀번호 확인",
    emailFieldPlaceholder: "이메일 주소를 입력하세요",
    passwordFieldPlaceholder: "여기에 매우 비밀스러운 비밀번호를 입력하세요",
    confirmPasswordFieldPlaceholder: "비밀번호를 확인하세요",
    tapToSignUp: "가입하려면 누르세요!",
    haveAccount: "이미 계정이 있으신가요?",
    noAccount: "계정이 없으신가요?",
    hint: "힌트: 아무 이메일 주소나 사용할 수 있고, 좋아하는 비밀번호를 입력하면 됩니다 :)",
  },
}

export default ko
