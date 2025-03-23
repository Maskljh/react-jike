function canTransformToTarget(target) {
  while (target.includes("ab")) {
    target = target.replace("ab", "");
  }
  return target === "" ? "YES" : "NO";
}

// 示例：
console.log(canTransformToTarget("abab")); // YES
console.log(canTransformToTarget("aabb")); // NO
console.log(canTransformToTarget(""));     // YES（空串本身就是起点）