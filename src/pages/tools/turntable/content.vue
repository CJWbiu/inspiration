<template>
	<section class="turntable-content">
		<div class="turntable-conetent__circle-wrap">
			<div class="turntable-content__circle" ref="circle">
				<div class="turntable-content__circle-inner">
					<template v-for="(part, index) in parts" :key="index">
						<div class="turntable-content__circle-line" :style="part.lineStyle"></div>
						<div class="turntable-content__circle-text" :style="part.textStyle">{{ part.text }}</div>
					</template>
				</div>
			</div>
			<div class="turntable-content__circle-arrow"></div>
		</div>
	</section>
</template>

<script lang="ts">
/**
 * @file 转盘
 */

import { computed, defineComponent, ref, PropType } from 'vue';

export default defineComponent({
	name: 'TurntableContent',
	props: {
		list: {
			type: Array as PropType<string[]>,
			default: () => []
		}
	},
	setup(props) {
		const circle = ref<HTMLElement>();

		const parts = computed(() => {
			const list = props.list;
			const partAngle = 360 / (list.length || 1);
			return list.map((text, index) => {
				const angle = partAngle * index;
				const width = getTextWidth(partAngle);

				return {
					text,
					lineStyle: {
						transform: `rotateZ(${angle}deg)`
					},
					textStyle: {
						transform: `rotateZ(${angle + partAngle / 2}deg)`,
						width: width + 'px',
						left: `calc(50% - ${width / 2}px)`
					}
				};
			});
		});

		const lastAngle = ref(0);

		const getTextWidth = (angle: number) => {
			let r = 190;
			let l = r / 2;

			return l * Math.sqrt(2 * (1 - Math.cos(angle * (Math.PI / 180))));
		};

		const getValue = (angle: number) => {
			const list = props.list;
			const partAngle = 360 / list.length;
			const count = angle % 360;

			if (count === 0 || angle % partAngle === 0) {
				return null;
			}

			const index = Math.ceil(count / partAngle);

			return list[list.length - index];
		};

		const start = () => {
			const angle = 300 + Math.random() * 360 * 4 + lastAngle.value;

			circle.value!.style.transform = `rotateZ(${angle}deg)`;
			lastAngle.value = angle;
		};

		return {
			start,
			parts,
			getValue,
			circle
		};
	}
});
</script>

<style scoped>
.turntable-conetent__circle-wrap {
	position: relative;
	width: 400px;
	height: 400px;
}

.turntable-content__circle {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background: #fff;
	border-radius: 50%;
	border: 1px solid #bbb;
	transition: transform 5s ease-in-out;
}

.turntable-content__circle-inner {
	position: relative;
	width: 380px;
	height: 380px;
	background: #ddd;
	border-radius: 50%;
	border: 1px solid #bbb;
	transition: transform 5s ease-in-out;
}

.turntable-content__circle-line {
	width: 2px;
	height: 190px;
	background: #999;
	position: absolute;
	top: 0;
	left: calc(50% - 1px);
	transform-origin: bottom;
}

.turntable-content__circle-text {
	min-height: 190px;
	max-height: 190px;
	width: 2px;
	color: blue;
	white-space: wrap;
	word-wrap: break-word;
	text-align: center;
	padding: 30px 6px;
	position: absolute;
	top: 0;
	transform-origin: bottom;
}

.turntable-content__circle-arrow {
	width: 10px;
	height: 140px;
	position: absolute;
	top: 60px;
	left: calc(50% - 5px);
	background: red;
}
</style>
