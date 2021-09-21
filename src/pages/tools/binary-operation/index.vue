<template>
    <n-space vertical>
        <n-alert title="支持以下进制之间的转换，并支持小数" type="info" />

        <n-space vertical>
            <n-card title="源数据">
                <n-form>
                    <n-space vertical>
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

                        <n-form-item
                            :show-label="false"
                            :feedback="sourceValid.feedback"
                            :validation-status="sourceValid.status">
                            <n-input 
                                v-model:value="source" 
                                type="text"
                            >
                                <template #prefix>
                                    转换数字：
                                </template>
                            </n-input>
                        </n-form-item>
                    </n-space>
                </n-form>
            </n-card>
            <n-space justify="center">
                <n-icon size="40" color="#2080f0">
                    <arrow-down-circle />
                </n-icon>
            </n-space>
            <n-card title="转换结果">
                <n-space vertical>
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
            </n-card>
        </n-space>
    </n-space>
</template>

<script lang="ts">

/**
 * @file 二进制运算
 */

import { computed, defineComponent, reactive, toRefs, watch } from 'vue';
import { transferBase } from './transfer';
import { validatorBase } from './validator';
import { ArrowDownCircle } from '@vicons/ionicons5';

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
    components: {
        ArrowDownCircle
    },
    setup () {
        let formData = reactive({
            source: '',
            sourceBase: BASE_TYPES[0].value,
            targetBase: BASE_TYPES[2].value
        });

        watch(
            () => formData.sourceBase, 
            () => {
                formData.source = '';
            }
        );

        let sourceValid = computed(() => {
            return validatorBase(
                formData.source,
                formData.sourceBase
            );
        })

        let transferResult = computed(() => {
            if (
                sourceValid.value.status === 'error' ||
                !formData.source
            ) {
                return '';
            }

            return transferBase(
                formData.sourceBase,
                formData.targetBase,
                formData.source
            );
        });

        return {
            ...toRefs(formData),
            baseTypes: { ...BASE_TYPES },
            transferResult,
            sourceValid
        };
    }
})
</script>
