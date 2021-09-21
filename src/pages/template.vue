<template>
    <n-layout has-sider
              class="page-template">
        <n-layout-sider 
            collapse-mode="width"
            :collapsed-width="44"
            :width="160"
            show-trigger
            bordered
        >
            <n-menu
                :options="menuOptions"
                :collapsed-width="44"
                :collapsed-icon-size="22"
                :value="activeKey"
                @update:value="onActiveChange" 
            />
        </n-layout-sider>
        <n-layout class="page-template__content">
            <router-view />
        </n-layout>
    </n-layout>
</template>

<script lang="ts">

/**
 * @file 列表页
 */

import { MenuOption } from 'naive-ui';
import { defineComponent, PropType } from 'vue';
import { initMenuActive } from '@/utils/menu';

export default defineComponent({
    name: 'PageTemplate',
    props: {
        menuOptions: {
            type: Array as PropType<MenuOption[]>,
            default: () => []
        }
    },
    setup (props) {
        return {
            ...initMenuActive(props.menuOptions)
        };
    }
})
</script>

<style scoped>
    .page-template {
        height: 100%;
    }

    .page-template__content {
        padding: 10px 26px;
    }
</style>