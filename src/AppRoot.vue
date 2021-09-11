<template>
	<n-loading-bar-provider>
		<app />
	</n-loading-bar-provider>
</template>

<script lang="ts">
/**
 * @file 入口
 */

import { defineComponent } from 'vue';
import App from './App.vue';

export default defineComponent({
	name: 'AppRoot',
	components: {
		App
	}
})
</script>

