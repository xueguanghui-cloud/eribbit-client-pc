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
import { createVNode, render } from "vue";
import xghMessage from "./xgh-message.vue";

interface IParams {
  type: string;
  message: string;
}

// 渲染组件
// 1. 导入消息提示组件；
// 2. 将消息提示组件 编译为 虚拟节点(DOM 节点)；
// 3. 准备一个装载消息提示组件的DOM容器；
// 4. 将虚拟节点渲染到容器中；
// 5. 默认3000ms后销毁组件
const div = document.createElement("div");
div.setAttribute("class", "xgh-message-container");
document.body.appendChild(div);

let timer: ReturnType<typeof setTimeout>;
export default (params: IParams) => {
  // createVNode(组件，属性对象（props）)
  const vnode = createVNode(xghMessage, { ...params });
  // render(虚拟节点, DOM容器)
  render(vnode, div);
  timer && clearTimeout(timer);
  timer = setTimeout(() => {
    render(null, div);
  }, 3000);
};
