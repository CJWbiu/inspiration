<template>
    <n-space vertical>
        <n-alert title="支持以下进制之间的转换，并支持小数" type="info" />

        <n-layout>
            <n-space vertical>
                <n-space>
                    <n-radio-group 
                        v-model:value="sourceBase" 
                        name="source" 
                        size="medium"
                    >
                        <n-radio-button
                            v-for="type in baseTypes"
                            :key="type.value"
                            :value="type.value"
                        >
                            {{ type.label }}
                        </n-radio-button>
                    </n-radio-group>
                </n-space>
                <n-input 
                    v-model:value="source" 
                    type="text"
                >
                    <template #prefix>
                        转换数字：
                    </template>
                </n-input>
                <n-space>
                    <n-radio-group 
                        v-model:value="targetBase" 
                        name="target" 
                        size="medium"
                    >
                        <n-radio-button
                            v-for="type in baseTypes"
                            :key="type.value"
                            :value="type.value"
                        >
                            {{ type.label }}
                        </n-radio-button>
                    </n-radio-group>
                </n-space>
                <n-input 
                    :value="transferResult" 
                    type="text"
                    readonly
                >
                    <template #prefix>
                        转换结果：
                    </template>
                </n-input>
            </n-space>
        </n-layout>
    </n-space>
</template>

<script lang="ts">

/**
 * @file 二进制运算
 */

import { computed, defineComponent, reactive, toRefs, watch } from 'vue';
import { transferBase } from './transfer';

const BASE_TYPES = [
    {
        value: 2,
        label: '2进制'
    },
    {
        value: 8,
        label: '8进制'
    },
    {
        value: 10,
        label: '10进制'
    },
    {
        value: 16,
        label: '16进制'
    }
];

export default defineComponent({
    name: 'BinaryOperation',
    setup () {
        let formData = reactive({
            source: '',
            sourceBase: BASE_TYPES[0].value,
            targetBase: BASE_TYPES[2].value
        });

        let transferResult = computed(() => {
            return transferBase(
                formData.sourceBase,
                formData.targetBase,
                formData.source
            );
        });

        watch(
            () => formData.sourceBase, 
            () => {
                formData.source = '';
            }
        );

        return {
            ...toRefs(formData),
            baseTypes: { ...BASE_TYPES },
            transferResult
        };
    }
})
</script>
