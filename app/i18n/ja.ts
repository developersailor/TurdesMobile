import { Translations } from "./en"

const ja: Translations = {
  common: {
    ok: "OK",
    cancel: "キャンセル",
    back: "戻る",
    logOut: "ログアウト", // @demo remove-current-line
  },
  welcomeScreen: {
    postscript:
      "注目！ — このアプリはお好みの見た目では無いかもしれません(デザイナーがこのスクリーンを送ってこない限りは。もしそうなら公開しちゃいましょう！)",
    readyForLaunch: "このアプリはもう少しで公開できます！",
    exciting: "(楽しみですね！)",
    letsGo: "レッツゴー！", // @demo remove-current-line
  },
  errorScreen: {
    title: "問題が発生しました",
    friendlySubtitle:
      "本番では、エラーが投げられた時にこのページが表示されます。もし使うならこのメッセージに変更を加えてください(`app/i18n/jp.ts`)レイアウトはこちらで変更できます(`app/screens/ErrorScreen`)。もしこのスクリーンを取り除きたい場合は、`app/app.tsx`にある<ErrorBoundary>コンポーネントをチェックしてください",
    reset: "リセット",
    traceTitle: "エラーのスタック: %{name}", // @demo remove-current-line
  },
  emptyStateComponent: {
    generic: {
      heading: "静かだ...悲しい。",
      content:
        "データが見つかりません。ボタンを押してアプリをリロード、またはリフレッシュしてください。",
      button: "もう一度やってみよう",
    },
  },
  // @demo remove-block-start
  errors: {
    invalidEmail: "有効なメールアドレスを入力してください.",
  },
  loginScreen: {
    logIn: "ログイン",
    signUp: "サインアップ",
    enterDetails:
      "ここにあなたの情報を入力してトップシークレットをアンロックしましょう。何が待ち構えているか予想もつかないはずです。はたまたそうでも無いかも - ロケットサイエンスほど複雑なものではありません。",
    emailFieldLabel: "メールアドレス",
    passwordFieldLabel: "パスワード",
    confirmPasswordFieldLabel: "パスワードを確認",
    emailFieldPlaceholder: "メールアドレスを入力してください",
    passwordFieldPlaceholder: "パスワードを入力してください",
    confirmPasswordFieldPlaceholder: "パスワードを確認してください",
    tapToLogIn: "タップしてログインしよう！",
    tapToSignUp: "タップしてサインアップしよう！",
    haveAccount: "すでにアカウントをお持ちですか？",
    noAccount: "アカウントをお持ちではないですか？",
    hint: "ヒント: お好みのメールアドレスとパスワードを使ってください :)",
  },
  registerScreen: {
    signUp: "サインアップ",
    enterDetails:
      "下に詳細を入力して、トップシークレット情報を解除してください。何が待っているのか、きっと予想もつかないでしょう。あるいは、予想できるかもしれません。ここでの話はそんなに難しいことではありません。",
    emailFieldLabel: "メールアドレス",
    passwordFieldLabel: "パスワード",
    confirmPasswordFieldLabel: "パスワードの確認",
    emailFieldPlaceholder: "メールアドレスを入力してください",
    passwordFieldPlaceholder: "ここに超秘密のパスワードを入力してください",
    confirmPasswordFieldPlaceholder: "パスワードを確認してください",
    tapToSignUp: "サインアップするにはタップしてください！",
    haveAccount: "すでにアカウントをお持ちですか？",
    noAccount: "アカウントをお持ちでないですか？",
    hint: "ヒント: お好きなメールアドレスとパスワードを使用できます :)",
  },
}

export default ja
