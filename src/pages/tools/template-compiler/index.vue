<template>
	<div class="compiler">
		<div class="compiler-top">
			<n-select size="small" :style="{ width: '80px' }" v-model:value="plan" :options="options" />
		</div>
		<div class="compiler-main">
			<div class="compiler-code">
				<CodeMirrorEditor v-model="templateStr" language="vue" />
			</div>
			<div class="compiler-render">
				<CodeMirrorEditor :modelValue="renderStr" language="javascript" readonly />
			</div>
		</div>
		<div class="compiler-err">
			{{ errStr }}
		</div>
	</div>
</template>

<script lang="ts" setup>
/**
 * @file 编译
 */

import { ref, watch } from 'vue';
import { compilerTemplate } from './compiler';
import CodeMirrorEditor from '@/components/codemirror/index.vue';

const plan = ref('vue3');
const templateStr = ref('<div>test</div>');
const options = [
	{
		label: 'vue3',
		value: 'vue3'
	},
	{
		label: 'vue2',
		value: 'vue2'
	}
];
const renderStr = ref('');
const errStr = ref('');

watch(
	[templateStr, plan],
	([val1, val2]) => {
		try {
			renderStr.value = compilerTemplate(val1, val2);
			errStr.value = ''; // 清除err
		} catch (error) {
			errStr.value = error.toString();
		}
	},
	{
		immediate: true
	}
);
</script>

<style lang="less">
.compiler {
	width: 100%;
	height: 100%;
	background: #f5f5f5;
	display: flex;
	flex-direction: column;
	align-items: center;
	color: #333;

	&-top {
		width: 100%;
		padding: 10px;
		display: flex;
		background-color: #3ca877;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}

	&-main {
		flex: 1;
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	&-code {
		height: 100%;
		overflow: auto;
		flex: 1;
	}

	&-render {
		height: 100%;
		flex: 1;
		overflow: auto;
	}

	&-err {
		color: #ff5a4b;
		padding: 10px;
		line-height: 18px;
		height: 38px;
		font-size: 14px;
		width: 100%;
		text-align: left;
		overflow: auto;
	}
}
</style>
