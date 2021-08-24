/**
 * Позволяет сделать компонент высшего порядка
 * @param {React.Component} Component - исходный компонент
 * @param {Array<function>} hocs – Компоненты высшего порядка
 * @returns {React.Component} – новый компонент высшего порядка
 */
const applyHocs = (Component, hocs) => {
    return hocs.reduce((component, hoc) => {
        return hoc(component);
    }, Component);
}

export {applyHocs};