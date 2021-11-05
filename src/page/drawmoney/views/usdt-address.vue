<template>
  <model-full :title="$t('setText.text25')" :preventGoBack="true" @prev="closeUsdtAddress" class="fixd-wrap">
    <div class="withdrawmoney address-list">
      <div v-if="addressData&&addressData.length>0" class="list-box">
        <div class="line10"></div>
        <div class="list line05" v-for="item in addressData" :class="{active:currentAddress&&currentAddress.id==item.id}">
          <div class="left">
            <img src="@img/2_8/icon_usdtdz_dz@2x.png" alt="">
          </div>
          <div class="u-content" @click="chooseItem(item)">
            <div class="mark">
              <h2>{{item.remark}}</h2>
              <!-- <span>ERC20链</span> -->
              <span>{{$t('setText.text26')}}</span>
            </div>
            <p class="address ellipse">{{item.address}}</p>
          </div>
          <div class="right" @click.stop="delAddress(item)">
            <img src="@img/2_8/icon_usdtdz_more@2x.png" alt="">
          </div>
        </div>
      </div>
      <no-data v-else></no-data>
      <div class="btn-box">
        <div class="yd-btn" @click="add">{{ $t("setText.text27") }}</div>
      </div>
    </div>
    <bottomPopup :popupShow.sync="delShow" :options="cptOptions" @click="popupClick"></bottomPopup>
    <popup v-model="showAddUsdt" id="buyDetailCoupons" class="pc-popup" :popup-style="{ 'z-index': 1509 }" position="right" width="100%">
      <usdt-add v-if="showAddUsdt" @closeUsdtadd="closeUsdtadd"></usdt-add>
    </popup>
  </model-full>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import usdtAdd from './usdt-add'
export default {
  components: {
    usdtAdd
  },
  data() {
    return {
      showAddUsdt: false,
      delShow: false,
      addressData: [],
      delItem: null,
      cptOptions: [
        {
          id: ["DELETED"],
          label: '删除',
          isDel: true
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      currentAddress: 'system/system/getCurrentWithdraw'
    })
  },
  created() {
    this.getList()
  },
  methods: {
    ...mapActions({
      queryWithdrawList: 'system/system/queryWithdrawList',
      unWithdraw: 'system/system/unWithdraw'
    }),
    ...mapMutations({
      setCurrentWithdraw: 'system/system/setCurrentWithdraw'
    }),
    getList() {
      this.queryWithdrawList().then(res => {
        console.log('提币地址', res)
        this.addressData = res || []
      })
    },
    //关闭地址列表页面
    closeUsdtAddress() {
      this.$emit('closeUsdtAddress')
    },
    //关闭添加地址页面
    closeUsdtadd() {
      this.showAddUsdt = false
      this.getList()
    },
    chooseItem(item) {
      //选中一个地址
      this.setCurrentWithdraw(item)
      this.closeUsdtAddress()
    },
    add() {
      this.showAddUsdt = true
    },
    delAddress(item) {
      this.delShow = true
      this.delItem = item
    },
    popupClick(e) {
      console.log('删除', e)
      this.delShow = false
      this.setCurrentWithdraw(null)
      let { id } = this.delItem
      this.unWithdraw({ id }).then(res => {
        let index = this.addressData.findIndex(d => d.id == id)
        this.addressData.splice(index, 1)
      }).catch(errMsg => {
        this.$vux.toast.text(errMsg, 'middle')
      })
    }
  }
}
</script>
