<template>
  <ModelFull :title="$t('setText.text28')" :preventGoBack="true" @prev="closeUsdtAdd" class="fixd-wrap">
    <!-- 添加USDT地址 -->
    <div class="withdrawmoney">
      <div class="with-box line05">
        <!-- 提币地址 -->
        <p class="title">{{$t('setText.text2')}}</p>
        <div class="ipt-box">
          <div class="txt-ipt">
            <!-- 输入或粘贴USDT(ERC20)地址 -->
            <input type="text" :placeholder="$t('setText.text29')" v-model="params.address">
          </div>
          <div class="right-action">
            <div class="icon"></div>
            <div class="icon">
              <!-- <img src="@img/2_8/icon_tubi_saom@2x.png" alt=""> -->
            </div>
          </div>
        </div>
      </div>
      <div class="with-box line05">
        <!-- 备注 -->
        <p class="title">{{$t('legalTransaction.text6')}}</p>
        <div class="ipt-box">
          <div class="txt-ipt">
            <!-- 请输入备注：例如USDT-ERC20地址1 -->
            <input type="text" :placeholder="$t('setText.text30')" v-model="params.remark">
          </div>
        </div>
      </div>
      <div class="btn-box">
        <!-- 确定 -->
        <div class="yd-btn" @click="sure">{{ $t("setText.text31") }}</div>
      </div>
    </div>
    <safePopup ref="safePopup" @save="save"></safePopup>
  </ModelFull>
</template>
<script>
import safePopup from "@/components/element/safePopup";
import { mapActions } from 'vuex';
export default {
  components: {
    safePopup
  },
  data() {
    return {
      params: {
        address: '',
        remark: ''
      }
    }
  },
  methods: {
    ...mapActions({
      addWithdraw: 'system/system/addWithdraw'
    }),
    sure() {
      if (this.params.address == '') {
        // 提币地址不能为空
        this.$vux.toast.text(this.$t('setText.text32'), 'middle')
        return
      }
      if (this.params.remark == '') {
        // 备注不能为空
        this.$vux.toast.text(this.$t('setText.text33'), 'middle')
        return
      }
      this.$refs.safePopup.showvalidPhone = true
    },
    save(smsCode) {
      let postData = {
        smsCode,
        ...this.params
      }
      this.addWithdraw(postData).then(res => {
        console.log('添加成功', res)
        this.closeUsdtAdd()
      }).catch(err => {
        this.$vux.toast.text(err, 'middle')
      })
    },
    closeUsdtAdd() {
      this.$emit('closeUsdtadd')
    }
  }
}
</script>
