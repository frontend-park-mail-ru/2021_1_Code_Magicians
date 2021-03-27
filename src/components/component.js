/**
 * Base Component class (abstract)
 */
export class Component {
  /**
   * Constructs new component
   * @param {Object} props Properties, for utility usage and for inner templates rendering
   */
  constructor(props = {}) {
    this.props = {...props};
  }

  /**
   * Add new state to a component or update existing ones
   * @param {Object} state
   */
  addState(state) {
    this.state = {...this.state, ...state};
  }

  /**
   * Returns raw html code, ready to insert somewhere on page
   */
  render() {
  }
}
