const BASE_VALIDATOR_MAP: Record<number, {
    pattern: RegExp,
    errorText: string
}> = {
    2: {
        pattern: /^[01]+(.[01]+)?$/,
        errorText: '请输入正确二进制数，如：‘1001.011’'
    },
    8: {
        pattern: /^[0-7]+(.[0-7]+)?$/,
        errorText: '请输入正确八进制数，如：‘17’'
    },
    10: {
        pattern: /^[0-9]+(.[0-9]+)?$/,
        errorText: '请输入正确十进制数，如：‘10’'
    },
    16: {
        pattern: /^[0-9a-fA-F]+(.[0-9a-fA-F]+)?$/,
        errorText: '请输入正确十六进制数，如：‘1a’'
    }
};

export function validatorBase (value: string, base: number) {
    let validator = BASE_VALIDATOR_MAP[base];
    
    if (!validator || !value) {
        return {};
    }

    let { pattern, errorText } = validator;
    let isValid = pattern.test(value);
    
    if (isValid) {
        return {}
    }

    return {
        feedback: errorText,
        status: 'error'
    };
}