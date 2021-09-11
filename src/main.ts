import { createApp } from 'vue';
import naive from 'naive-ui';
import AppRoot from './AppRoot.vue';
import { createAppRouter } from './router';

import '@/styles/index.css';

const app = createApp(AppRoot);
const router = createAppRouter(app);

app.use(router);
app.use(naive);

router.isReady().then(() => {
    app.mount('#app');
});
