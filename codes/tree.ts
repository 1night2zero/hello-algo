/* 二叉树节点类 */
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}
/* 初始化二叉树 */
// 初始化节点
const n1 = new TreeNode(1),
  n2 = new TreeNode(2),
  n3 = new TreeNode(3),
  n4 = new TreeNode(4),
  n5 = new TreeNode(5);
// 构建节点之间的引用（指针）
n1.left = n2;
n1.right = n3;
n2.left = n4;
n2.right = n5;

/* 插入与删除节点 */
const P = new TreeNode(0);
// 在 n1 -> n2 中间插入节点 P
n1.left = P;
P.left = n2;
// 删除节点 P
n1.left = n2;

/* 层序遍历 */
const levelOrder = (root: TreeNode | null): number[] => {
  // 初始化队列，加入根节点
  const queue = [root];
  // 初始化一个列表，用于保存遍历序列
  const list: number[] = [];
  console.log("queue:", queue);
  while (queue.length) {
    // 队列出队
    const node = queue.shift() as TreeNode;
    // 保存节点值
    list.push(node.val);
    // 左子节点入队
    if (node.left) {
      queue.push(node.left);
    }
    // 右子节点入队
    if (node.right) {
      queue.push(node.right);
    }
    // console.log("queue: ", queue);
    // console.log("list: ", list);
  }
  return list;
};
// console.log("levelOrder(n1): ", levelOrder(n1));

/* 前序遍历 */
const preOrder = (root: TreeNode | null): number[] => {
  const preOrderList: number[] = [];
  const traverse = (node: TreeNode | null): void => {
    if (node === null) {
      return;
    }
    // 访问优先级：根节点 -> 左子树 -> 右子树
    preOrderList.push(node.val);
    traverse(node.left);
    traverse(node.right);
  };
  traverse(root);

  return preOrderList;
};
/* 中序遍历 */
const inOrder = (root: TreeNode | null): number[] => {
  const inOrderList: number[] = [];

  const traverse = (node: TreeNode | null): void => {
    if (node === null) {
      return;
    }
    // 访问优先级： 左子树 -> 根节点 -> 右子树
    traverse(node.left);
    inOrderList.push(node.val);
    traverse(node.right);
  };

  traverse(root);

  return inOrderList;
};
/* 后序遍历 */
const postOrder = (root: TreeNode | null): number[] => {
  const postOrderList: number[] = [];
  const traverse = (node: TreeNode | null): void => {
    if (node === null) {
      return;
    }
    // 访问优先级： 左子树 -> 右子树 -> 根节点
    traverse(node.left);
    traverse(node.right);
    postOrderList.push(node.val);
  };

  traverse(root);

  return postOrderList;
};
console.log("preOrder: ", preOrder(n1));
console.log("inOrder: ", inOrder(n1));
console.log("postOrder: ", postOrder(n1));
console.log("n1: ", n1);
