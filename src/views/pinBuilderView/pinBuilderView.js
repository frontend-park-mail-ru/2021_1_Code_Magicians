import {View} from '../view.js';
import {Page} from '../../components/page/page.js';
import {PinBuilder} from '../../components/pinBuilder/pinBuilder.js';

/**
 * Pin builder view
 */
export class PinBuilderView extends View {
  /**
   * Constructs pin builder page
   * @param {Object} props
   * @param {HTMLElement} parent
   */
  constructor(props, parent) {
    super(props, parent);
    this.page = new Page(props);

    this.addPinBuilder = this.addPinBuilder.bind(this);
  }

  /**
   * Returns the html code for the view
   * @return {string}
   */
  render() {
    const tmpl = Handlebars.templates['pinBuilderView.hbs'];
    this.pinBuilder = new PinBuilder(this.props);

    return this.page.render() + tmpl({
      pinBuilder: this.pinBuilder.render(),
    });
  }

  /**
   * Adds one more pin builder on the page
   */
  addPinBuilder() {
    this
        .parent
        .querySelector('.pin-column')
        .insertAdjacentHTML('beforeend', this.pinBuilder.render());
  }

  // eslint-disable-next-line require-jsdoc
  didMount() {
    this
        .parent
        .querySelector('.plus-button')
        .addEventListener('click', this.addPinBuilder);
  }

  // eslint-disable-next-line require-jsdoc
  willUnmount() {
    this
        .parent
        .querySelector('.plus-button')
        .removeEventListener('click', this.addPinBuilder);
  }
}
