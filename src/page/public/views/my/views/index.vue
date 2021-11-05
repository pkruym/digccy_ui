<template>
  <div class="my">
    <model-full :title="$t('my.myInfo.text24')" class="full fixd-wrap">
      <span slot="right" @click="save" class="right">{{
        $t("my.myInfo.text25")
      }}</span>
      <ul>
        <!-- <label for="face"> -->
        <li class="flex face-box line05">
          <div class="flex">
            <span>{{ $t("my.myInfo.text26") }}</span>
          </div>
          <div class="flex weui-cell_access">
            <div class="num">
              <img
                v-lazy="{
                  src: headPortrait + form.headImg,
                  error: require('@/assets/img/2_3/icon_me_avatar@2x.png'),
                  loading: require('@/assets/img/2_3/icon_me_avatar@2x.png')
                }"
                class="faceurl"
                v-if="form.headImg && form.headImg != 'null'"
              />
              <img
                src="@/assets/img/2_3/icon_me_avatar@2x.png"
                v-else
                class="faceurl"
              />
            </div>
            <img src="@/assets/img/2_7/r-arrow.png" alt class="right" />
          </div>
          <input
            type="file"
            class="face"
            accept="image/*"
            ref="face"
            id="face"
            @change="change($event)"
          />
        </li>
        <!-- </label> -->
        <li class="flex second line05">
          <div class="flex">
            <span>{{ $t("my.myInfo.text27") }}</span>
          </div>
          <div class="flex weui-cell_access">
            <span class="num">
              <input type="text" v-model="form.nickname" />
            </span>

            <img src="@/assets/img/2_7/r-arrow.png" alt class="right" />
          </div>
        </li>
        <li class="flex line05">
          <div class="flex">
            <span>{{ $t("my.myInfo.text28") }}</span>
          </div>
          <div class="flex weui-cell_access">
            <span class="num">{{ form.mobilephone }}</span>
            <img src="@/assets/img/2_7/r-arrow.png" alt class="right" />
          </div>
        </li>
        <li class="flex line05">
          <div class="flex">
            <span>{{ $t("my.myInfo.text29") }}</span>
          </div>
          <div class="flex weui-cell_access">
            <span class="num">
              <input type="text" v-model="form.socialAccount" />
            </span>
            <img src="@/assets/img/2_7/r-arrow.png" alt class="right" />
          </div>
        </li>
      </ul>
      <!-- <group gutter="0" class="group-picker">
      </group>-->
      <group gutter="0" class="group-picker">
        <popup-picker :data="list" v-model="sex" @on-change="sexChange">
          <span slot="title" class="title">{{ $t("my.myInfo.text30") }}</span>
        </popup-picker>
      </group>
      <group gutter="0" class="group-picker">
        <datetime
          v-model="form.birthday"
          start-date="1950-01-01"
          format="YYYY-MM-DD"
          @on-change="timeChange"
        >
          <span slot="title" class="title">{{ $t("my.myInfo.text31") }}</span>
        </datetime>
      </group>
      <group gutter="0" class="group-picker">
        <x-address
          :title="$t('my.myInfo.text32')"
          class="address"
          v-model="location"
          :raw-value="true"
          @on-shadow-change="onShaowChange"
          @on-hide="queryAddress"
          :list="addressData"
        >
          <!-- <span slot="title" class="title">地区</span> -->
        </x-address>
      </group>
    </model-full>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import qs from "qs";
import ModelFull from "element/model-full";
import {
  Group,
  PopupPicker,
  Datetime,
  XAddress,
  ChinaAddressV4Data,
  Value2nameFilter as value2name
} from "vux";
import { log } from "util";
export default {
  components: {
    ModelFull,
    Group,
    PopupPicker,
    Datetime,
    XAddress
  },
  data() {
    return {
      list: [["男", "女"]],
      sex: [],
      location: [],
      time: "",
      phone: localStorage.phone,
      form: {
        id: "",
        nickname: "",
        birthday: "",
        headImg: "",
        socialAccount: "",
        mobilephone: "",
        sex: "",
        location: ""
      },
      // address: [],
      addressData: ChinaAddressV4Data,
      fileTypes: ["image/jpeg", "image/pjpeg", "image/png"],
      headPortrait: localStorage.getItem("imageUrl") || ""
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo"
    })
  },
  created() {
    this.getUserInfo();
    console.log(this.userInfo);
  },
  methods: {
    ...mapActions({
      uploadheadImg: "user/uploadheadImg",
      chargeUserinfo: "user/chargeUserinfo",
      userQuery: "user/query"
    }),
    onShaowChange(ids, names) {
      //  console.log(ids,names)
      //  this.form.location =names;
    },
    save() {
      const _this = this;
      this.$vux.loading.show({
        text: "Loading"
      });
      this.form.location =
        this.location.length > 0
          ? value2name(this.location, ChinaAddressV4Data).replace(/\s/g, "")
          : "";
      this.chargeUserinfo(this.form).then(res => {
        this.$store.commit("UPDATE_USERINFO", this.form);
        _this.$vux.loading.hide();
        _this.$vux.toast.show({
          text: "修改成功",
          time: 1500
        });
        _this.userQuery();

        if (window.history.length > 2) {
          this.$router.go(-1);
        } else {
          this.$router.push({ path: "/ower" });
        }
      });
    },
    sexChange(sex) {
      console.log(sex);
      this.form.sex = sex[0] == "男" ? 1 : 0;
    },
    timeChange(birthday) {
      console.log(birthday);
    },
    queryAddress(value) {
      // let ad = value2name(value, ChinaAddressV4Data).split(' ')
      // console.log('12322',value,ad);
      // this.location = value
    },

    getUserInfo() {
      this.sex = this.userInfo.sex == 1 ? ["男"] : ["女"];
      this.location = this.userInfo.location
        ? this.userInfo.location.match(/.+?(省|市|自治区|自治州|县|区)/g)
        : [];
      // this.location=["110000", "110100", "110101"];
      console.log("123", this.userInfo, this.location);

      this.form = {
        id: this.userInfo.id,
        birthday: this.userInfo.birthday,
        headImg: this.userInfo.headImg,
        nickname: this.userInfo.nickname ? this.userInfo.nickname : "",
        mobilephone: this.userInfo.mobilephone ? this.userInfo.mobilephone : "",
        socialAccount: this.userInfo.socialAccount
          ? this.userInfo.socialAccount
          : ""
      };
    },
    validFileType(file) {
      for (var i = 0; i < this.fileTypes.length; i++) {
        if (file.type === this.fileTypes[i]) {
          return true;
        }
      }
      return false;
    },
    ImgToBase64(file, maxLen, callBack) {
      var img = new Image();

      var reader = new FileReader(); //读取客户端上的文件
      reader.onload = function() {
        var url = reader.result; //读取到的文件内容.这个属性只在读取操作完成之后才有效,并且数据的格式取决于读取操作是由哪个方法发起的.所以必须使用reader.onload，
        img.src = url; //reader读取的文件内容是base64,利用这个url就能实现上传前预览图片
      };
      img.onload = function() {
        //生成比例
        var width = img.width,
          height = img.height;
        console.log(width, height);
        //计算缩放比例
        var rate = 1;
        if (width >= height) {
          if (width > maxLen) {
            rate = maxLen / width;
          }
        } else {
          if (height > maxLen) {
            rate = maxLen / height;
          }
        }
        img.width = width * rate;
        img.height = height * rate;
        //生成canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var base64 = canvas.toDataURL("image/jpeg", 0.9);
        callBack(base64);
      };
      reader.readAsDataURL(file);
    },
    change(event) {
      const _this = this;
      const files = event.target.files || event.dataTransfer.files;
      this.file = files[0];

      var formdata1 = new FormData();
      formdata1.append("file", files[0], files[0].name);
      let configFile = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token")
        }
      };

      if (!this.validFileType(this.file)) {
        this.$vux.alert.show({
          title: this.$t("setText.title"),
          content: this.$t("my.myInfo.text33")
        });
        return;
      }
      if (this.file.size.toFixed(2) > 1024 * 1024 * 6) {
        this.$vux.alert.show({
          title: this.$t("setText.title"),
          content: this.$t("my.myInfo.text34")
        });
        return;
      }
      _this.$vux.loading.show({
        text: this.$t("my.setting.text67")
      });
      // 这个接口是上传文件的
      _this.$axios
        .post(
          `${window.config.host}/trade/user/upload/headImg`,
          formdata1,
          configFile
        )
        .then(res => {
          if (res.data.code == "0") {
            _this.form.headImg = res.data.data;
            // _this.userInfo.headImg = res.data.data;
            // console.log('_this.userInfo.headImg',_this.userInfo.headImg);
          }
          _this.$vux.loading.hide();
        })
        .catch(res => {
          _this.$vux.loading.hide();
        });
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.group-picker {
  .weui-cells {
    background: @bodyBg !important;
  }
  .weui-cell_access .weui-cell__ft:after {
    // border-color: @lineColor;
    width: 0.32rem;
    height: 0.32rem;
    border: none;
    background: url("~@/assets/img/2_7/right.png") no-repeat;
    background-size: cover;
    right: 0;
    transform: inherit;
    top: -2px;
  }
  .vux-cell-value {
    color: @txtColor; //#949fac;
  }
}

.my {
  height: 100%;
  .group-picker {
    /deep/ .weui-cells {
      .weui-cell {
        padding: 0.36rem 0.3rem;
      }
    }
  }
  .faceurl {
    width: 100%;
    height: 100%;
  }

  /*deep*/
  .address {
    color: @battleshipGrey;
  }

  .full {
    /deep/ .flex-full__body {
      background: @whiteBg;
    }
    .right {
      color: @battleshipGrey;
    }

    ul {
      margin-top: 6px;
      li {
        justify-content: space-between;
        padding: 0.36rem 0.3rem;
        position: relative;
        background: @bodyBg;
        input {
          text-align: right;
          color: @battleshipGrey;
          font-size: 0.28rem;
          background: transparent;
        }

        &.second {
          margin-top: 0.12rem;
        }
        &.face-box {
          // background: #28323c;
          padding: 0.2rem 0.3rem 0.2rem 0.3rem;

          .num {
            width: 0.72rem;
            height: 0.72rem;
            border-radius: 100%;
            overflow: hidden;
          }
        }

        .face {
          background: transparent;
          display: none;
          position: absolute;
          display: block;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          opacity: 0;
        }

        div {
          .icon {
            width: 0.32rem;
            margin-right: 0.22rem;
          }

          span {
            color: @battleshipGrey;
            font-size: 0.28rem;
          }

          .num {
            font-size: 0.28rem;
            color: #949fac;
            // margin-right: 0.2rem;
          }
          .right {
            width: 0.32rem;
            height: 0.32rem;
          }
          align-items: center;
        }
      }
    }

    .title {
      font-size: 0.28rem;

      color: @battleshipGrey;
    }
  }
}
</style>
