<template>
    <n-layout>
		<n-layout-header bordered class="app-main__header">
			<n-space>
				<n-text tag="div">
					<img width="42" src="./assets/imgs/inspiration.png" />
				</n-text>
				<n-menu :options="menuOptions"
						mode="horizontal"
						:value="activeKey"
						@update:value="onActiveChange" />
				<section class="app-main__btns">
					<n-button size="large" quaternary @click="changeTheme">{{ themeText }}</n-button>
				</section>
			</n-space>
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

import { defineComponent, computed, onMounted, VNodeChild } from 'vue';
import { useLoadingBar, MenuOption } from 'naive-ui'
import { setLoadingBar } from './router';
import { ROUTES } from './router/routers';
import { initMenuActive } from '@/utils/menu';
import useTheme from '@/hooks/use-theme';

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
				key: route.name as string,
				icon: (route.meta?.icon || null) as () => VNodeChild
			};
		});
	
	return options;
}

export default defineComponent({
    name: 'App',
	setup () {
		const { setTheme, theme } = useTheme();
		initLoadingBar();
		let menuOptions = getMenuOptions();
		const changeTheme = () => {
			setTheme(theme.value === 'dark' ? 'light' : 'dark');
		};
		const themeText = computed(() => {
			return theme.value === 'dark' ? '深色' : '浅色';
		});

		return {
			menuOptions,
			changeTheme,
			themeText,
			...initMenuActive(menuOptions)
		};
	}
})
</script>

<style scoped>
	.app-main__content {
		height: calc(100vh - 42px);
	}

	.app-main__header {
		padding: 6px 12px;
	}

	.app-main__btns {
		display: flex;
		align-items: center;
	}
</style>