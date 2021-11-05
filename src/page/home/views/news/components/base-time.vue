<template>
	<div class="time-box">
		<div class="time-box-top">{{day}}</div>
		<div class="time-box-bot">{{date}}</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				date: '',
				day: '',
			}

		},
		mounted(){
			let myDate = new Date();
			let weekday = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"]
			this.date = myDate.getDate();
			this.day = weekday[myDate.getDay()];
		}
	}
</script>

<style lang="less">
	@skyBlue: rgb(79, 187, 255);
	.time-box {
		width: 38px;
		border: 1px solid @skyBlue;
		text-align: center;
		border-radius: 4px;
		.time-box-top {
			color: #e0ecf7;
			font-size: 0.16rem;
			height: 0.24rem;
			line-height: 0.24rem;
			background: @skyBlue;
		}
		.time-box-bot {
			background: #fff;
			color: @skyBlue;
			font-size: 0.3rem;
			height: 0.42rem;
			border-radius: 4px;
			line-height: 0.42rem;
		}
	}
</style>