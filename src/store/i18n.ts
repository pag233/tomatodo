//切换语言

export interface I18nState {
  currentLocale: 'en-us' | 'zh-cn' | 'zh-tw',
}
const state: I18nState = {
  currentLocale: 'en-us'
}
const store = {
  state
}

export default store