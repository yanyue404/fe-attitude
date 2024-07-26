import Vue from 'vue';
export function mount(component, opt, el) {
    if (!component) {
        console.warn('亲，请传入正确的组件');
    }
    if(!el) {
        el = document.createElement('div');
        document.body.appendChild(el);
    }
    let vm = new Vue({
        el,
        render(h) {
            return h(component, opt);
        }
    });
    return vm;
}

export function destroy(vm) {
    vm.$el.remove();
    vm.$destroy();
}