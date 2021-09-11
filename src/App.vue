<template>
    <n-layout>
    	<n-layout-header>
			<n-menu :options="menuOptions"
					mode="horizontal"
					:value="activeKey"
					@update:value="onActiveChange" />
		</n-layout-header>
		<n-layout>
			<router-view></router-view>
		</n-layout>
    </n-layout>
</template>

<script lang="ts">

/**
 * @file 入口内容
 */

import { defineComponent, onMounted, computed } from 'vue';
import { useLoadingBar, MenuOption } from 'naive-ui'
import { setLoadingBar } from './router';
import { ROUTES } from './router/routers';
import { useRoute, useRouter } from 'vue-router';

function initLoadingBar () {
	const loadingBar = useLoadingBar();

	onMounted(() => {
		setLoadingBar(loadingBar);
		loadingBar.finish();
	});
}

function getMenuOptions (): MenuOption[] {
	let options = ROUTES.filter(route => !route.redirect)
		.map(route => {
			return {
				label: (route.meta?.title || '') as string,
				key: route.name as string
			};
		});
	
	return options;
}

function getActiveKey (menuOptions: MenuOption[]) {
	let route = useRoute();

	return computed(() => {
		let target = menuOptions.find(item => item.key === route.name);
		return target?.key ?? '';
	});
}

export default defineComponent({
    name: 'App',
	setup () {
		initLoadingBar();
		let router = useRouter();

		let menuOptions = getMenuOptions();
		let activeKey = getActiveKey(menuOptions);
		let onActiveChange = (key: string) => {
			router.push({
				name: key
			});
		};

		return {
			menuOptions,
			activeKey,
			onActiveChange
		};
	}
})
</script>
