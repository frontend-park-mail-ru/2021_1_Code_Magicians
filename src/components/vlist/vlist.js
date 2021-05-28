import { API } from 'modules/api';
import { Pin } from 'models/Pin';
import { Component } from '../component.js';

import vlistTemplate from './vlist.hbs';
import vlistPinsTemplate from './vlistRowPins.hbs';
import './vlist.scss';

/**
 * Vlist
 */
export class Vlist extends Component {
  /**
   * Constructs new board control component
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    const statePayload = {
      startIdx: 0,
      endIdx: 0,
      height: 0,
      lastWidth: 0,
      lastCols: 0,
      render: true,
    };
    this.setState(statePayload);

    this.tmpl = vlistTemplate;
    this.loadMore = this.loadMore.bind(this);
  }

  /**
   * Returns the html code for comment
   * @return {string} final html
   */
  render() {
    if (!this.props.pins) {
      return '';
    }
    if (this.props.pins.length === 0) {
      return '';
    }
    const numberCols = Math.floor((this.props.width - 72) / (300 + 20)); // 70 - sidebar, 20 margin of the col
    const colWidth = 300;

    const cols = Array(numberCols).fill(0).map(() => ({
      heights: [],
      pins: [],
      scrollPos: 0,
      colHeight: 0,
      idx: 0,
    }));

    let minHeight = 0;
    let pinsLeft = this.props.pins.length;
    let pinNum = 0;
    const { pins } = this.props;

    while (pinsLeft > 0) {
      // eslint-disable-next-line no-loop-func
      cols.forEach((col) => {
        if (col.colHeight <= minHeight) {
          const pin = pins[pinNum];
          if (pin) {
            col.colHeight += pin.imageHeight;
            col.pins[col.idx] = pin;
            col.pins[col.idx].imageHeight = pin.imageHeight / pin.imageWidth * colWidth;
            col.pins[col.idx].imageWidth = colWidth;
            pinsLeft--;
            col.idx++;
            pinNum++;
          }
        }
      });
      minHeight = Math.min(...(cols.map((col) => col.colHeight)));
    }

    const statePayload = this._state;
    statePayload.lastCols = numberCols;
    statePayload.lastWidth = colWidth;
    this.setState(statePayload);

    return this.tmpl({
      ...this.props,
      colWidth,
      cols,
    });
  }

  /**
   * Did
   */
  didMount() {
    // document.querySelector('.page__content').addEventListener('scroll', this.scrollHandler);
    const tmp = document.querySelector('.vlist-load-button');
    if (tmp) {
      tmp.addEventListener('click', this.loadMore);
    }
    super.didMount();
  }

  /**
   * Will
   */
  willUnmount() {
    // document.querySelector('.page__content').removeEventListener('scroll', this.scrollHandler);
    const tmp = document.querySelector('.vlist-load-button');
    if (tmp) {
      tmp.removeEventListener('click', this.loadMore);
    }

    super.willUnmount();
  }

  /**
   * load more pins
   * @param {Event} e
   */
  loadMore(e) {
    e.preventDefault();

    document.querySelector('.vlist-load-button').style.display = 'none';

    const columns = Array(this._state.lastCols).fill(0).map(() => []);
    const colWidth = this._state.lastWidth;
    const payload = {
      offset: 50,
      amount: 50,
    };
    API.getPinsFeed(payload).then((response) => {
      const pins = response.responseBody && response.responseBody.pins.map((pinData) => new Pin(pinData));
      pins.forEach((pin, index) => {
        pin.imageHeight = pin.imageHeight / pin.imageWidth * colWidth;
        pin.imageWidth = colWidth;
        columns[index % columns.length].push(pin);
      });
      columns.forEach((array, index) => {
        document.querySelector(`.vlist-col-${index}`).innerHTML += vlistPinsTemplate({ pins: array });
      });
    });
  }

// // TODO: fix scrolling / loading content
//   /**
//    * scrollHandler callback
//    * @param {Event} event
//    */
//   scrollHandler(event) {
//     const pageContent = document.querySelector('.page__content');
//
//     if ((pageContent.scrollTop + window.innerHeight - 72.5) === pageContent.scrollHeight) {
//
//     }
//     // document.querySelector('.board-create-form').style.visibility = 'visible';
//   }
}
