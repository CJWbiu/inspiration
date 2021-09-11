import { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { LoadingBarProviderInst } from 'naive-ui';
import { ROUTES } from './routers';

let loadingBarApiRef: LoadingBarProviderInst | null = null; 

export function setLoadingBar (loadingBar: LoadingBarProviderInst) {
    loadingBarApiRef = loadingBar;
}

export function createAppRouter (app: App) {
    let router = createRouter({
        history: createWebHashHistory(),
        routes: ROUTES
    });

    router.beforeEach((to, from, next) => {
        if (!from || to.path !== from.path) {
            if (loadingBarApiRef) {
                loadingBarApiRef.start();
            }
        }
        
        next();
    });

    router.afterEach((to, from) => {
        if (!from || to.path !== from.path) {
            if (loadingBarApiRef) {
                loadingBarApiRef.finish();
            }
        }
    })

    return router;
}