import {View} from '../view';
import {Page} from 'components/page/page';
import {Vlist} from 'components/vlist/vlist';
import {pinsStore} from 'stores/pinsStore';

import VlistTemplate from './virtualizedList.hbs';
import './virtualizedList.scss';

/**
 * Main pins virtualized list view
 */
export class VirtualizedList extends View {
  /**
   * Makes new virtualized list view
   * @param {Object} props
   */
  constructor(props = {}) {
    super(props, document.getElementById('app'));

    this.tmpl = VlistTemplate;

    pinsStore.bind('change', this.refresh);
  }

  /**
   * Returns html
   * @return {String}
   */
  render() {
    const pinArray = pinsStore.getPinsFeed(20);

    const vlist = new Vlist({
      ...this.props,
      pins: pinArray,
      width: this._parent.clientWidth,
      height: this._parent.clientHeight,
    });
    this._nestedComponents.set('_vlist', vlist);

    this._nestedComponents.set('page', new Page({
      ...this.props,
      page__content: this.tmpl({
        vlist: this._nestedComponents.get('_vlist').render(),
      }),
    }));

    return this._nestedComponents.get('page').render();
  }
}
