import { RouteRecordRaw } from 'vue-router';
import Tools from 'pages/tools/index.vue';
import CssPractice from 'pages/css-practice/index.vue';

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
            title: "工具库"
        },
        component: Tools
    },
    {
        path: '/css',
        name: 'CssPractice',
        meta: {
            title: "CSS 实践"
        },
        component: CssPractice
    }
];

export {
    ROUTES
};