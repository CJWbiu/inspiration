<template>
	<section class="turntable">
		<div class="turntable__list">
			<div
				class="turntable__list-item"
				v-for="(item, index) in groupList"
				:key="index"
				@click="selectGroup(index)"
			>
				{{ item.title }}

				<n-button size="tiny" quaternary type="error" @click="delGroup(index)">x</n-button>
			</div>
			<n-button :render-icon="getIcon('add')" @click="openModal">添加分组</n-button>
		</div>
		<div class="turntable__content" v-if="currentList.length">
			<TurntableContent ref="turntable" :list="currentList" />
			<n-button type="primary" @click="start"> 转动 </n-button>
		</div>

		<n-modal v-model:show="showModal" preset="dialog" title="Dialog">
			<template #header>
				<div>添加分组</div>
			</template>
			<n-space vertical>
				<n-input v-model:value="groupName" type="text" placeholder="分组名称" />
				<n-input v-model:value="groupsText" type="textarea" placeholder="输入选项，一行一个" />
			</n-space>
			<template #action>
				<n-button type="primary" @click="addGroup"> 确定 </n-button>
			</template>
		</n-modal>
	</section>
</template>

<script lang="ts">
/**
 * @file 转盘
 */

import { defineComponent, ref } from 'vue';
import TurntableContent from './content.vue';
import { renderIcon } from '@/utils/icon';
import { CloseOutline, Flag, Add } from '@vicons/ionicons5';

interface Group {
	title: string;
	list: string[];
}

const GROUP_KEY = '__Group_list__';

export default defineComponent({
	name: 'TurnTable',
	components: {
		TurntableContent
	},
	setup() {
		const turntable = ref<typeof TurntableContent>();
		const groupList = ref<Group[]>([]);
		const currentList = ref<string[]>([]);
		const showModal = ref(false);
		const groupName = ref('');
		const groupsText = ref('');

		const init = () => {
			let list: Group[] = [];

			try {
				list = JSON.parse(localStorage.getItem(GROUP_KEY) || '');
			} catch {
				list = [];
			}

			groupList.value = list;
			currentList.value = list[0]?.list || [];
		};

		const start = () => {
			turntable.value!.start();
		};

		const getIcon = (icon: string) => {
			switch (icon) {
				case 'edit':
					return renderIcon(Flag);
				case 'delete':
					return renderIcon(CloseOutline);
				case 'add':
					return renderIcon(Add);
			}
		};

		const selectGroup = (index: number) => {
			currentList.value = groupList.value[index].list;
		};

		const openModal = () => {
			showModal.value = true;
		};

		const delGroup = (index: number) => {
			groupList.value.splice(index, 1);
			localStorage.setItem(GROUP_KEY, JSON.stringify(groupList.value));
		};

		const addGroup = () => {
			groupList.value.push({
				title: groupName.value,
				list: groupsText.value.split('\n')
			});
			localStorage.setItem(GROUP_KEY, JSON.stringify(groupList.value));
			groupName.value = '';
			groupsText.value = '';
			showModal.value = false;
		};

		init();

		return {
			groupName,
			groupsText,
			turntable,
			groupList,
			currentList,
			showModal,
			start,
			getIcon,
			selectGroup,
			openModal,
			addGroup,
			delGroup
		};
	}
});
</script>

<style lang="less" scoped>
.turntable {
	&__list {
		display: flex;
		align-items: center;
		gap: 4px;
		margin-bottom: 12px;

		&-item {
			display: inline-flex;
			align-items: center;
			gap: 6px;
			background: #38c279;
			border-radius: 4px;
			padding: 4px 6px;
			font-size: 12px;
			color: #fff;
		}
	}
}
</style>
