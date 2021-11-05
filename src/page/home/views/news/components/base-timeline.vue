<template>
	<div class="time-line-box">
		<ul class="time-line">
			<slot></slot>
		</ul>
	</div>
</template>
<style lang="less">
	.time-line-box {
		.time-line {
			padding: .2rem .3rem;
			.time-line__item {
				.content {
					.header {
						font-size: .24rem;
						color: @battleshipGrey;
						margin: .08rem 0 .08rem -.13rem;
					}
					.main {
						border-left: 1px dashed @battleshipGrey;
						.main-content {
							font-size: .24rem;
							max-height: 1.36rem;
							overflow: hidden;
							border: .2rem solid #fff;
							background-color: #e0ecf7;
							line-height: .32rem;
							margin-left: .2rem;
							transition: all .5s;
							&.active {
								max-height: 4rem;
							}
						}
					}
				}
			}
		}
	}
</style>