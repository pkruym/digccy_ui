const Vue = require('vue')
import VueI18n from 'vue-i18n'

import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)

const messages = {
    en: {
        ...enLocale,
    },
    zh: {
        ...zhLocale,
    }
}

const i18n = new VueI18n({
    locale: localStorage.getItem("language") ? (localStorage.getItem("language") == 'en' ? 'en' : localStorage.getItem("language") == 'undefined' ? 'zh' : localStorage.getItem("language")) : "zh", // set locale
    messages // set locale messages
})

export default i18n
