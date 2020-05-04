// props 赋值
export function assignProps(vm, props) {
  Object.entries(props).forEach(([key, value]) => {
    if (value !== undefined) {
      vm[key] = value;
    }
  });
}

export default {
  assignProps,
};
