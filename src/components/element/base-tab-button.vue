<template>
  <div class="tab-button-box">
    <slot></slot>
  </div>
</template>

<style lang="less">
// 
  .tab-button-box {
    .tab-button-item {
      background-color: transparent;
      border: none;
      &:focus {
        outline: none;
      }
      a {
        font-size: .3rem;
        display: inline-block;
        height: .5rem;
        line-height: .5rem;
        color: #e0ecf7;
        padding: 0 .32rem;
        border: 1px solid rgb(35,75,188);
        border-left: 0;
        &.active {
          background-color: rgb(35, 75, 188);
          color: #e0ecf7;
          border: 1px solid rgb(35, 75, 188);
        }
      }
      &:first-child {
        a {
        	 border-left: 1px solid rgb(35,75,188);
          border-top-left-radius: .1rem;
          border-bottom-left-radius: .1rem;
        }
      }
      &:last-child {
        a {
          border-top-right-radius: .1rem;
          border-bottom-right-radius: .1rem;
        }  
      }
    }
  }
</style>
