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
    this.loadBelow = this.loadBelow.bind(this);
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
    const numberCols = Math.floor((this.props.width - 72) / (290 + 20)); // 70 - sidebar, 20 margin of the col
    const colWidth = 290;

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
      minHeight = Math.min(...(cols.map((col) => col.colHeight)));
      // eslint-disable-next-line no-loop-func
      cols.forEach((col) => {
        if (col.colHeight === minHeight) {
          const pin = pins[pinNum];
          if (pin) {
            col.pins[col.idx] = pin;
            col.pins[col.idx].imageHeight = Math.floor(pin.imageHeight / pin.imageWidth * colWidth);
            col.colHeight += pin.imageHeight + 20 + 20 + 5; // div + margin bottom
            col.pins[col.idx].imageWidth = colWidth;
            col.pins[col.idx].pinNum = pinNum;
            pinsLeft--;
            col.idx++;
            pinNum++;
          }
        }
      });
    }

    const statePayload = this._state;
    statePayload.lastCols = numberCols;
    statePayload.lastWidth = colWidth;
    statePayload.minPinID = 0;
    statePayload.maxPinID = pinNum;
    statePayload.cols = cols;
    statePayload.deletedPins = 0;
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
    if (this.props.scrollLoad) {
      document.querySelector('.page__content').addEventListener('scroll', this.loadBelow);
    }
    super.didMount();
  }

  /**
   * Will
   */
  willUnmount() {
    if (this.props.scrollLoad) {
      document.querySelector('.page__content').removeEventListener('scroll', this.loadBelow);
    }
    super.willUnmount();
  }

  /**
   * load more pins
   * @param {Event} e
   */
  loadBelow(e) {
    const pageContent = document.querySelector('.page__content');

    if ((pageContent.scrollTop + window.innerHeight) >= (pageContent.scrollHeight + 72)) {
      const colWidth = this._state.lastWidth;
      const offset = this._state.maxPinID;

      const payload = {
        offset,
        amount: this.props.batchSize,
      };
      API.getPinsFeed(payload).then((response) => {
        const pins = response.responseBody && response.responseBody.pins !== null && response.responseBody.pins.map((pinData) => new Pin(pinData));
        this.props.pins = this.props.pins.concat(pins);
        const cols = Array(this._state.lastCols).fill(0).map(() => ({
          heights: [],
          pins: [],
          scrollPos: 0,
          colHeight: 0,
          idx: 0,
        }));
        let minHeight = 0;
        let pinsLeft = pins.length;
        let pinNum = 0;
        cols.forEach((col, index) => {
          col.colHeight = document.querySelector(`.vlist-col-${index}`).scrollHeight;
        });
        minHeight = Math.min(...(cols.map((col) => col.colHeight)));
        while (pinsLeft > 0) {
          minHeight = Math.min(...(cols.map((col) => col.colHeight)));
          // eslint-disable-next-line no-loop-func
          cols.forEach((col) => {
            if (col.colHeight === minHeight) {
              const pin = pins[pinNum];
              if (pin) {
                col.pins[col.idx] = pin;
                col.pins[col.idx].imageHeight = Math.floor(pin.imageHeight / pin.imageWidth * colWidth);
                col.colHeight += pin.imageHeight + 20 + 20 + 5; // div + margin bottom
                col.pins[col.idx].imageWidth = colWidth;
                col.pins[col.idx].pinNum = pinNum + offset;
                pinsLeft--;
                col.idx++;
                pinNum++;
              }
            }
          });
        }

        cols.forEach((col, index) => {
          document.querySelector(`.vlist-col-${index}`).innerHTML += vlistPinsTemplate({ pins: col.pins });
        });
        // let deletedPins = 0;
        // document.querySelectorAll('.vlist-element').forEach((el) => {
        //   if (el.id < (this._state.maxPinID + pinNum - this.props.batchSize * 2 - this._state.deletedPins)) {
        //     deletedPins++;
        //     el.parentElement.dataset.margin = Math.floor(Number(el.parentElement.dataset.margin) + el.offsetHeight);
        //     el.parentElement.style.marginTop = `${el.parentElement.dataset.margin}px`;
        //     el.remove();
        //   }
        // });

        const statePayload = this._state;
        statePayload.lastWidth = colWidth;
        statePayload.minPinID += pinNum;
        statePayload.maxPinID = this._state.maxPinID + pinNum;
        statePayload.cols = cols;
        statePayload.deletedPins += pinNum;
        this.setState(statePayload);
      });
    } else if (((pageContent.scrollTop + window.innerHeight) <= (pageContent.scrollHeight - document.querySelector('.vlist-col').clientHeight)) && (this._state.minPinID > 1000)) {
      const oldPins = this.props.pins;
      const pins = oldPins.slice(this._state.minPinID - this.props.batchSize, this._state.minPinID);
      const colWidth = this._state.lastWidth;
      const cols = Array(this._state.lastCols).fill(0).map(() => ({
        heights: [],
        pins: [],
        scrollPos: 0,
        colHeight: 0,
        idx: 0,
      }));
      let maxHeight = 0;
      let pinsLeft = this.props.batchSize; // TODO: pass correct number of pins, link them together
      let pinNum = 0;
      let reverseIdx = this.props.batchSize; // this._state.minPinID
      cols.forEach((col, index) => {
        col.colHeight = Number(document.querySelector(`.vlist-col-${index}`).dataset.margin);
      });
      maxHeight = Math.max(...(cols.map((col) => col.colHeight)));
      // cols.reverse();
      while (pinsLeft > 0) {
        // eslint-disable-next-line no-loop-func
        maxHeight = Math.max(...(cols.map((col) => col.colHeight)));
        // eslint-disable-next-line no-loop-func
        cols.forEach((col) => {
          if (maxHeight === col.colHeight) {
            const pin = pins[pinNum];
            if (pin) {
              col.pins[col.idx] = pin;
              col.pins[col.idx].imageHeight = Math.floor(pin.imageHeight / pin.imageWidth * colWidth);
              col.colHeight -= pin.imageHeight + 20 + 20 + 5; // div + margin bottom
              col.pins[col.idx].imageWidth = colWidth;
              col.pins[col.idx].pinNum = reverseIdx; // TODO: fix pin number offset
              pinsLeft--;
              col.idx++;
              pinNum++;
              reverseIdx--;
            }
          }
        });
      }

      cols.forEach((col, index) => {
        const el = document.querySelector(`.vlist-col-${index}`);
        el.insertAdjacentHTML('afterbegin', vlistPinsTemplate({ pins: col.pins.reverse() }));
        const sum = col.pins.reduce((sum, pin) => sum + pin.imageHeight, 0);
        el.dataset.margin = Number(el.dataset.margin) - sum;
        el.style.marginTop = `${el.dataset.margin}px`;
      });

      document.querySelectorAll('.vlist-element').forEach((el) => {
        if (el.id > (this._state.minPinID + pinNum + this.props.batchSize)) {
          // deletedPins++;
          el.remove();
        }
      });

      const statePayload = this._state;
      statePayload.lastWidth = colWidth;
      statePayload.cols = cols;
      statePayload.deletedPins -= this.props.batchSize;
      this.setState(statePayload);
      this._state.minPinID -= this.props.batchSize;
    }
  }
}
