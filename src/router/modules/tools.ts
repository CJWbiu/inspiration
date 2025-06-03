import { RouteRecordRaw } from 'vue-router';
import BinaryOperation from 'pages/tools/binary-operation/index.vue';
import TurnTable from 'pages/tools/turntable/index.vue';
import TemplateCompiler from 'pages/tools/template-compiler/index.vue';
import { renderIcon } from '@/utils/icon';
import { Repeat, Code, SyncCircleOutline } from '@vicons/ionicons5';

const TOOLS_CHILDREN: RouteRecordRaw[] = [
	{
		path: 'binary',
		name: 'binaryOperation',
		meta: {
			title: '进制转换',
			icon: renderIcon(Repeat)
		},
		component: BinaryOperation
	},
	{
		path: 'turntable',
		name: '转盘',
		meta: {
			title: '随机转盘',
			icon: renderIcon(SyncCircleOutline)
		},
		component: TurnTable
	},
	{
		path: 'compiler',
		name: '模版编译器',
		meta: {
			title: '模版编译器',
			icon: renderIcon(Code)
		},
		component: TemplateCompiler
	}
];

export { TOOLS_CHILDREN };
