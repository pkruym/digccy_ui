import RadioList from '../components/radio-list'
import { getDIYDay } from "@/assets/componentsJs/getDate30";
export default {
    components: {
        RadioList
    },
    data() {
        return {
            value: "0",
            allLoaded: false,
            commonList: [{
                    value: this.$t('common.all'),
                    key: 0,
                    checked: true
                },
                {
                    value: this.$t('common.week'),
                    key: 1,
                    checked: false
                },
                {
                    value: this.$t('common.month'),
                    key: 2,
                    checked: false
                },
                {
                    value: this.$t('common.year'),
                    key: 3,
                    checked: false
                }
            ],
            index: 0,
            list: [],
            page: 1,
            size: 20,
            totalpage: 0
        }
    },
    computed: {
        cptTime() {
            if (this.index == 0) {
                return null;
            } else if (this.index == 1) {
                return getDIYDay("monday");
            } else if (this.index == 2) {
                return getDIYDay("monthFirst");
            } else {
                return getDIYDay("halfYear");
            }
        },
        cptAmount() {
            return key => {
                if (key.creditDebit == "UNFREEZE" || key.creditDebit == "CREDIT") {
                    return key.amount;
                } else {
                    return 0 - key.amount;
                }
            };
        }
    },
    watch: {
        $route() {
            if (this.$refs.baseSelect) this.$refs.baseSelect.isShowCheck = false
        }
    },
    methods: {
        changeRadio(item) {
            this.list = [];
            this.commonList.forEach(d => { d.checked = false })
            item.checked = true
            this.index = item.key;
            this._getList();
            if (this.list.length) {
                window.scrollTo(0, 0)
            }
        },
        change({ value, key }) {
            this.commonList.forEach((item, i) => {
                item.checked = false
                if (item.key === key) {
                    item.checked = true
                }
            })
            if (this.$refs.baseSelect) {
                this.$refs.baseSelect.isShowCheck = false
            }
            this.index = key;
            this.list = [];
            this._getList();
        },
    },
    destroyed() {
        if (this.$refs.baseSelect) {
            this.$refs.baseSelect.isShowCheck = false
        }
    }
}
