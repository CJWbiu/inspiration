<template>
    <n-layout>
		<n-layout-header>
			<n-menu :options="menuOptions"
					mode="horizontal"
					:value="activeKey"
					@update:value="onActiveChange" />
		</n-layout-header>
		<n-layout class="app-main__content">
			<router-view></router-view>
		</n-layout>
    </n-layout>
</template>

<script lang="ts">

/**
 * @file 入口内容
 */

import { defineComponent, onMounted } from 'vue';
import { useLoadingBar, MenuOption } from 'naive-ui'
import { setLoadingBar } from './router';
import { ROUTES } from './router/routers';
import { initMenuActive } from '@/utils/menu';

function initLoadingBar () {
	const loadingBar = useLoadingBar();

	onMounted(() => {
		setLoadingBar(loadingBar);
		loadingBar.finish();
	});
}

function getMenuOptions (): MenuOption[] {
	let options = ROUTES.filter(route => route.meta)
		.map(route => {
			return {
				label: (route.meta?.title || '') as string,
				key: route.name as string
			};
		});
	
	return options;
}

export default defineComponent({
    name: 'App',
	setup () {
		initLoadingBar();
		let menuOptions = getMenuOptions();

		return {
			menuOptions,
			...initMenuActive(menuOptions)
		};
	}
})
</script>

<style scoped>
	.app-main__content {
		height: calc(100vh - 42px);
	}
</style>