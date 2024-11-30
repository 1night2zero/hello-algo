/* 二分查找（双闭区间） */
const binarySearch = (nums: number[], target: number): number => {
  // 初始化双闭区间 [0, n-1] ，即 i, j 分别指向数组首元素、尾元素
  let i = 0,
    j = nums.length - 1;
  // 循环，当搜索区间为空时跳出（当 i > j 时为空）
  while (i <= j) {
    // 计算中点索引 m
    const m = Math.floor(i + (j - i) / 2);
    console.log(`i: ${i} j: ${j} m: ${m}`);
    // 此情况说明 target 在区间 [m+1, j] 中
    if (nums[m] < target) {
      i = m + 1;
    }
    // 此情况说明 target 在区间 [i, m-1] 中
    else if (nums[m] > target) {
      j = m - 1;
    }
    // 找到目标元素，返回其索引
    else {
      return m;
    }
  }
  return -1;
};

console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 9));

/* 辅助哈希表 */
const twoSumHashTable = (nums: number[], target: number): number[] => {
  // 辅助哈希表，空间复杂度为 O(n)
  const m: Map<number, number> = new Map();
  // 单层循环，时间复杂度为 O(n)
  for (let i = 0; i < nums.length; i++) {
    const index = m.get(target - nums[i]);
    if (index !== undefined) return [index, i];
    m.set(nums[i], i);
  }
  return [];
};

console.log(twoSumHashTable([2, 7, 11, 15], 18));
