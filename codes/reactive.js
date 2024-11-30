// 存储副作用函数的桶
const bucket = new WeakMap()

// 用一个全局变量存储被注册的副作用函数
let activeEffect;

// 原始数据
const data = { text: 'hello world', ok: true }

// effect 函数用于注册副作用函数
const effect = (fn) => {
  // 当调用 effect 注册副作用函数时，将副作用函数 fn 赋值给 activeEffect
  // debugger;
  const effectFn = () => {

    // 调用 cleanup 函数完成清除工作
    cleanup(effectFn)

    // 当 effectFn 执行时，将其设置为当前激活的副作用函数
    activeEffect = effectFn
    fn()
  }
  // activeEffect.deps 用来存储所有与该副作用函数相关联的依赖集合
  effectFn.deps = []
  // 执行副作用函数
  effectFn()
}

const cleanup = (effectFn) => {
  // 遍历 effectFn.deps 数组
  effectFn.deps.forEach(item => {
    // 将 effectFn 从依赖集合中移除
    item.delete(effectFn)
  })
  // 最后需要重置 effectFn.deps 数组
  effectFn.deps.length = 0
}

// 在 get 拦截函数内调用 track 函数追踪变化
const track = (target, key) => {
  // debugger;
  // 没有 activeEffect，直接 return
  if (!activeEffect) return target[key]
  // 根据 target 从 "桶" 中取得 depsMap，它也是一个 Map 类型：key --> effects
  let depsMap = bucket.get(target)
  // 如果不存在 depsMap，那么新建一个 Map 并与 target 关联
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
  }
  // 再根据 key 从 depsMap 中取得 deps，它是一个 Set 类型，
  // 里面存储着所有与当前 key 相关联的副作用函数：effects
  let deps = depsMap.get(key)
  // 如果 deps 不存在，同样新建一个 Set 并与 key 关联
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  // 最后将当前激活的副作用函数添加到"桶"里
  deps.add(activeEffect)
  // deps 就是一个与当前副作用函数存在联系的依赖集合
  // 将其添加到 activeEffect.deps 数组中
  activeEffect.deps.push(deps)
}

//
const trigger = (target, key) => {
  // debugger;
  // 根据 target 从桶中取得 depsMap，它是 key --> effects
  const depsMap = bucket.get(target)
  if (!depsMap) return
  // 根据 key 取得所有副作用函数 effects
  const effects = depsMap.get(key)
  // 执行副作用函数
  // effects && effects.forEach(fn => fn());
  const effectsToRun = new Set(effects)
  effectsToRun.forEach(effectFn => effectFn())
}

// 对原始数据的代理
const obj = new Proxy(data, {
  // 拦截读取操作
  get(target, key) {
    // debugger;
    // 将副作用函数 activeEffect 添加到存储副作用函数的桶中
    track(target, key)
    // 返回属性值
    return target[key]
  },
  // 拦截设置操作
  set(target, key, newVal) {
    // debugger;
    // 设置属性值
    target[key] = newVal
    // 把副作用函数从桶里取出并执行
    trigger(target, key)
  }
})

effect(function effectFn() {
  document.body.innerText = obj.ok ? obj.text : 'not'
})

setTimeout(() => {
  obj.text = 'hello vue3'
}, 1000)

setTimeout(() => {
  obj.ok = false
}, 2000)

