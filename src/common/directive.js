//取消焦点 指令
export const vBlur = {
  mounted(el) { 
    el.addEventListener("focus", () => {
    el.blur();
    });
  },
};