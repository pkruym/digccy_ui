<template>
  <!-- <popup v-model="innderShow" is-transparent :should-rerender-on-show="true"> -->
  <yd-popup
    v-model="innderShow"
    width="100%"
    class="pc-popup"
    position="bottom"
  >
    <div class="fangxiang">
      <ul>
        <li
          v-for="option in options"
          @click="ulclick(option.id)"
          :key="option.label"
          class="line05"
          :class="{
            checked: option.isChecked && option.label !== $t('common.cancle'),
            del: option.isDel
          }"
        >
          {{ option.label }}
        </li>
      </ul>
      <div class="line10"></div>
      <footer @click="cancle">{{ $t("common.cancle") }}</footer>
    </div>
  </yd-popup>
  <!-- </popup> -->
</template>

<script>
export default {
  props: {
    options: {
      type: [Array, Object]
    },
    popupShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      innderShow: false
    };
  },
  watch: {
    popupShow: {
      handler(to) {
        this.innderShow = to;
      },
      immediate: true
    },
    innderShow: {
      handler(to) {
        this.$emit("update:popupShow", to);
      }
    }
  },
  methods: {
    cancle() {
      this.innderShow = false;
    },
    ulclick(id) {
      this.$emit("click", id);
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.yd-popup {
  color: @bodyBg;
  text-align: center;
  border-radius: 8px 8px 0 0;
  background-color: @bodyBg;
}

.fangxiang {
  font-size: 0.28rem;
  text-align: center;
  .del {
    color: #d04b64;
  }
  ul {
    margin: 0 auto;
  }
  li,
  footer {
    margin: 0 auto;
    color: @txtColor;
    width: 100%;
    height: 1.14rem;
    line-height: 1.14rem;
    box-sizing: border-box;
    position: relative;
  }
  li.checked {
    color: @blueColor;
  }
  footer {
    color: @txt2Color;
  }
}
</style>
