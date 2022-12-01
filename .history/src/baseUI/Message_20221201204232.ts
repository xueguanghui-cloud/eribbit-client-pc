/* 
提供一个能够显示 xgh-message 组件的函数
这个函数将来：导入直接使用，也可以挂载vue实例原型上；
import Message from "Message.ts"
Message({
    type: "success",
    message: "成功的文案"
})

this.#message({
    type: "success",
    message: "成功的文案"
})
*/

export default () => {
  // 渲染组件
  // 1. 导入消息提示组件；
  // 2. 将消息提示组件 编译为 虚拟节点；
  // 3. 准备一个装载消息提示组件的容器；
  // 4. 将虚拟节点渲染到容器中；
};
