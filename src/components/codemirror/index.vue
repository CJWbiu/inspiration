<template>
	<div class="codemirror-wrapper" ref="editorRef"></div>
</template>

<script lang="ts">
/**
 * @file CodeMirror编辑器组件
 */
import { defineComponent, onMounted, ref, watch } from 'vue';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vue } from '@codemirror/lang-vue';

export default defineComponent({
	name: 'CodeMirrorEditor',
	props: {
		// 编辑器内容
		modelValue: {
			type: String,
			default: ''
		},
		// 编辑器语言类型
		language: {
			type: String,
			default: 'vue',
			validator: (value: string) => ['javascript', 'vue'].includes(value)
		},
		// 是否只读
		readonly: {
			type: Boolean,
			default: false
		}
	},
	emits: ['update:modelValue', 'change'],
	setup(props, { emit }) {
		const editorRef = ref<HTMLElement | null>(null);
		let view: EditorView | null = null;

		// 初始化编辑器
		const initEditor = () => {
			if (!editorRef.value) return;

			const languageSupport = props.language === 'vue' ? vue() : javascript();

			view = new EditorView({
				doc: props.modelValue,
				extensions: [
					basicSetup,
					languageSupport,
					EditorView.updateListener.of(update => {
						if (update.docChanged) {
							const value = update.state.doc.toString();
							emit('update:modelValue', value);
							emit('change', value);
						}
					}),
					EditorView.editable.of(!props.readonly)
				],
				parent: editorRef.value
			});
		};

		// 监听内容变化
		watch(
			() => props.modelValue,
			newValue => {
				if (view && newValue !== view.state.doc.toString()) {
					view.dispatch({
						changes: {
							from: 0,
							to: view.state.doc.length,
							insert: newValue
						}
					});
				}
			}
		);

		// 监听只读状态变化
		watch(
			() => props.readonly,
			newValue => {
				if (view) {
					view.dispatch({
						effects: EditorView.editable.reconfigure(newValue)
					});
				}
			}
		);

		onMounted(() => {
			initEditor();
		});

		return {
			editorRef
		};
	}
});
</script>

<style>
.codemirror-wrapper {
	width: 100%;
	height: 100%;
	border: 1px solid #ddd;
}

.codemirror-wrapper .cm-editor {
	height: 100%;
}

.codemirror-wrapper .cm-scroller {
	font-family: monospace;
}
</style>
