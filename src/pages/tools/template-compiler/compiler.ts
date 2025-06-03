import { compile as vue2Compile } from 'vue-template-compiler';
import { compile } from '@vue/compiler-dom';

export function compilerTemplate(template: string, plan: string) {
	let res = '';

	switch (plan) {
		case 'vue3':
			res = compilerVue3(template);
			break;
		case 'vue2':
			res = compilerVue2(template);
			break;
		default:
			res = '';
			break;
	}

	return res;
}

function compilerVue3(template: string) {
	return compile(template).code;
}

function compilerVue2(template: string) {
	return vue2Compile(template).render;
}
