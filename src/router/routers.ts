import { RouteRecordRaw } from 'vue-router';
import { TOOLS_CHILDREN } from './modules/tools';
import Tools from 'pages/tools/index.vue';
import CssPractice from 'pages/css-practice/index.vue';
import { renderIcon } from '@/utils/icon';
import { Build, Brush } from '@vicons/ionicons5';

const ROUTES: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        redirect: '/tools'
    },
    {
        path: '/tools',
        name: 'tools',
        meta: {
            title: "工具库",
            icon: renderIcon(Build)
        },
        component: Tools,
        redirect: '/tools/binary',
        children: TOOLS_CHILDREN
    },
    {
        path: '/css',
        name: 'CssPractice',
        meta: {
            title: "CSS 实践",
            icon: renderIcon(Brush)
        },
        component: CssPractice
    }
];

export {
    ROUTES
};