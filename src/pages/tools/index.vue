<template>
    <page-template :menu-options="menuOptions"></page-template>
</template>

<script lang="ts">

/**
 * @file 列表页
 */

import { defineComponent, VNodeChild } from 'vue';
import { TOOLS_CHILDREN } from '@/router/modules/tools';
import PageTemplate from '../template.vue';
import { MenuOption } from 'naive-ui';

function getMenuOptions (): MenuOption[] {
	let options = TOOLS_CHILDREN.map(route => {
			return {
				label: (route.meta?.title || '') as string,
				key: route.name as string,
                icon: (route.meta?.icon || null) as () => VNodeChild
			};
		});
	
	return options;
}

export default defineComponent({
    name: 'Tools',
    components: { PageTemplate },
    setup () {
        return {
            menuOptions: getMenuOptions()
        };
    }
})
</script>
