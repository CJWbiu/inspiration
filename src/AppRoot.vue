<template>
	<n-config-provider :theme="currTheme">
		<n-loading-bar-provider>
			<app />
		</n-loading-bar-provider>
	</n-config-provider>
</template>

<script lang="ts">
/**
 * @file 入口
 */

import { defineComponent, computed } from 'vue';
import App from './App.vue';
import { darkTheme } from 'naive-ui';
import useTheme from '@/hooks/use-theme';

export default defineComponent({
	name: 'AppRoot',
	components: {
		App
	},
	setup () {
		const { theme } = useTheme();
		const currTheme = computed(() => {
			return theme.value === 'dark' ? darkTheme : null;
		});

		return {
			currTheme
		};
	}
})
</script>

