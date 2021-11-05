<template>
  <section>
    <Translist v-for="val in list" :key="val.id" :item="val"></Translist>
  </section>
</template>

<script>
import Translist from "@/components/homeHot/transaList";
import { mapGetters, mapActions } from "vuex";
import { get } from "http";

export default {
  data() {
    return {
      oldList: [],
      list: []
    };
  },
  computed: {
    ...mapGetters({
      getListByAppRecommend: "contractInfo/getListByAppRecommend"
    }),
    cptList() {
      let arr = [];
      let newOne = [];
      let getList = this.getListByAppRecommend();
      let oldList = this.oldList;

      if (oldList.length == 0) {
        return getList.slice(0, 10);
      }
      for (let i = 0; i < getList.length; i++) {
        if (getList[i].id != oldList[i].id) {
          arr.push(i);
        }
      }
      for (let i = 0; i < arr.length; i++) {
        oldList.push(getList[arr[i]]);
      }

      for (let i = 0; i < 10; i++) {
        newOne.push(oldList[i]);
      }

      this.oldList = getList;

      return newOne;
    }
  },
  methods: {
    ...mapActions({
      queryAppRecommend: "contract/queryAppRecommend"
    }),
    _queryAppRecommend() {
      this.queryAppRecommend()
        .then(res => {
          this.list = res;
        })
        .catch(err => {
          this.$vux.toast.text(err, "middle");
        });
    }
  },
  mounted() {
    this._queryAppRecommend();
  },

  components: {
    Translist
  }
};
</script>

<style lang="less" scoped></style>
