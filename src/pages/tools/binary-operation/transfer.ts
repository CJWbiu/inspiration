/**
 * @file 进制转换
 */

const NUM_MAP: Record<string, number> = {
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15
};

function splitNums (value: string, reverse = true): number[] {
    let nums = value.split('')
        .map(str => {
            let num = NUM_MAP[str.toLocaleLowerCase()] || +str;
            return num;
        });

    return reverse ? nums.reverse() : nums;
}

function calcuIntParts (nums: number[], base: number): number {
    return nums.reduce((total, curr, index) => {
        return total += curr * Math.pow(base, index);
    }, 0);
}

function calcuDecimalParts (nums: number[], base: number): number {
    return nums.reduce((total, curr, index) => {
        return total += curr * Math.pow(base, -(index + 1));
    }, 0);
}

/**
 * 将任意进制转换为10进制
 * @param {number} base 
 * @param {string} value 
 * @returns {string}
 */
export function transferBaseToTen (base: number, value: string): string {
    let intParts: number[] = [];
    let decimalParts: number[] = [];
    let nums = value.split('.');

    intParts = splitNums(nums[0]);
    
    if (nums[1]) {
        decimalParts = splitNums(nums[1], false);
    }

    let result = calcuIntParts(intParts, base) + calcuDecimalParts(decimalParts, base);

    return result.toString();
}

/**
 * 将10进制转换为任意进制
 * 这里采用了最简单的方法，实际原理即小数部位*进制取整一直循环下去
 * @param {number} base 
 * @param {string} value 
 * @returns {string}
 */
export function transferTenBaseToOther (base: number, value: string): string {
    return (+value).toString(base);
}

/**
 * 进制转换，通过10进制中转
 * @param {number} sourceBase 
 * @param {number} targetBase 
 * @param {string} value 
 * @returns {string}
 */
export function transferBase (
    sourceBase: number, 
    targetBase: number, 
    value: string
): string {
    let baseTen = transferBaseToTen(sourceBase, value);

    if (targetBase === 10) {
        return baseTen;
    }

    return transferTenBaseToOther(targetBase, baseTen);
}