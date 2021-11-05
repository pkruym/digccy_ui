<template>
  <section>
    <!-- <Translist v-for="val in list" :key="val.id" :item="val"></Translist> -->
    <List v-for="(item,index) in list" :index='index' :key="index" :item="item"></List>
  </section>
</template>

<script>
import List from "./../components/list";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      //   oldList: [],
      list: [],
      uidList: []
    };
  },

  methods: {
    ...mapActions({
      queryProfitRank: "actual/traderecord/queryProfitRank", //查询龙虎榜盈利
      profileList: "user/profileList" //查询龙虎榜用户信息
    }),
    getList() {
      let params = {
        dataType: "DAY",
        winnerType: "profit"
      };
      this.queryProfitRank(params).then(res => {
        console.log(res)
        console.log(1111)
        if (res && res.length > 0) {
          res.map((item, index) => {
            let obj = {
              mobilephone: "",
              nickname: "",
              headImg: "",
              ...item
            };
            this.uidList.push(item.userId);

            this.list.push(obj);
          });
          this.getUserList();
        }
      });
    },
    getUserList() {
      let params = {
        uidList: this.uidList
      };
      this.profileList(params).then(res => {
        console.log(res)
        
        this.list.map((item, index) => {
          res.map(info => {
            if (item.userId === info.id) {
              item.headImg = info.headImg;
              item.mobilephone = info.mobilephone;
              item.nickname = info.nickname;
            }
          });
        });
      });
    }
  },
  mounted() {
    this.getList();
  },

  components: {
    List
  }
};
</script>

<style lang="less" scoped>
</style>


