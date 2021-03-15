/**
 * Base component class
 */
export class Component {
  /**
   * Constructs new component
   * @param {Object} props
   */
  constructor(props) {
    this.props = {...props};
  }

  /**
   * Add new state to a component
   * @param {Object} state
   */
  addState(state) {
    this.state = {...this.state, ...state};
  }

  // eslint-disable-next-line require-jsdoc
  render() {
  }
}
