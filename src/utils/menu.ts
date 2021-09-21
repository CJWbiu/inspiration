import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { MenuOption } from 'naive-ui';

function getActiveKey (menuOptions: MenuOption[]) {
	let route = useRoute();

	return computed(() => {
		let target = menuOptions.find(menu => {
			return route.matched.some(item => item.name === menu.key)
		});
		return target?.key ?? '';
	});
}

export function initMenuActive (menuOptions: MenuOption[]) {
    let router = useRouter();
    let activeKey = getActiveKey(menuOptions);
    let onActiveChange = (key: string) => {
        router.push({
            name: key
        });
    };

    return {
        activeKey,
        onActiveChange
    }
}