import { RouteRecordRaw } from 'vue-router';
import BinaryOperation from 'pages/tools/binary-operation/index.vue';

const TOOLS_CHILDREN: RouteRecordRaw[] = [
    {
        path: 'binary',
        name: 'binaryOperation',
        meta: {
            title: "进制转换"
        },
        component: BinaryOperation
    }
];

export {
    TOOLS_CHILDREN
};