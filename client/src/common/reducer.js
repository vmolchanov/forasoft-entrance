class Reducer {
    /**
     * @param {Object} options
     * @param {Object.<string, function>} options.actions
     * @param {Object} options.initialState
     */
    constructor({actions, initialState}) {
        this.initialState = initialState;
        this.actions = actions;
    }

    processAction() {
        const initialState = this.initialState;
        /**
         * @param {Object} state
         * @param {Object} action
         * @param {string} action.type
         * @param {*} action.payload
         * @returns {Object}
         */
        return (state = initialState, {type, payload}) => {
            return (type in this.actions) ? this.actions[type](state, payload) : state
        }
    }
}

export {Reducer};