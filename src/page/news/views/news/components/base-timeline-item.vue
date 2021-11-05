<template>
  <li class="time-line__item">
      <div class="content">
        <slot name="header"></slot>
        <div class="main">
          <p class="main-content" :class="{active: show}" @click="show = !show">
            <slot></slot>
          </p>
        </div>
        <!-- <div class="main"> </div> -->
        <!-- 此区块为时间轴不隐藏部分 -->
      </div>
  </li>
</template>
<script>
export default {
  data() {
    return {
      show: false
    }
  }
}
</script>

