import { RouteRecordRaw } from 'vue-router';
import BinaryOperation from 'pages/tools/binary-operation/index.vue';
import { renderIcon } from '@/utils/icon';
import { Repeat } from '@vicons/ionicons5';

const TOOLS_CHILDREN: RouteRecordRaw[] = [
    {
        path: 'binary',
        name: 'binaryOperation',
        meta: {
            title: "进制转换",
            icon: renderIcon(Repeat)
        },
        component: BinaryOperation
    }
];

export {
    TOOLS_CHILDREN
};