import {Component} from '../component.js';
import vlistTemplate from './vlist.hbs';
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
  }

  /**
   * Returns the html code for comment
   * @return {string} final html
   */
  render() {
    if (!this.props.pins) {
      return;
    }
    const numberCols = Math.floor(this.props.width / 400);
    const colWidth = 400;

    const Column = function() {
      return {
        heights: [],
        pins: [],
        scrollPos: 0,
        colHeight: 0,
        idx: 0,
      };
    };

    const cols = Array(numberCols).fill(0).map(() => new Column());

    let maxColHeight = 0;
    let elHeight = 0;
    let elWidth = 0;
    let pinsLeft = this.props.pins.length;
    let index = 0;

    let layer = 0;
    const pins = this.props.pins;

    const statePayload = this._state;
    index = statePayload.startIdx;

    while ((maxColHeight < (this.props.height * 5)) && (pinsLeft > 0)) {
      for (let i = 0; i < numberCols; i++) {
        if (!pinsLeft) {
          break;
        }
        const pin = pins[index];
        cols[i].pins.push(pin);

        elHeight = pin.imageHeight;
        elWidth = pin.imageWidth;
        if (!elHeight || !elWidth) {
          cols[i].heights.push(500);
        } else {
          cols[i].heights.push(elHeight / elWidth * colWidth); // by=400*by/bx
          cols[i].pins[layer].imageHeight = cols[i].heights[layer];
        }
        cols[i].colHeight += cols[i].heights[layer] + 20;
        cols[i].pins[layer].imageWidth = colWidth;
        if (cols[i].colHeight > maxColHeight) {
          maxColHeight = cols[i].colHeight;
        }
        index++;
        pinsLeft--;
      }
      layer++;
    }

    statePayload.startIdx = index;
    statePayload.lastCols = numberCols;
    statePayload.lastWidth = colWidth;
    this.setState(statePayload);

    return this.tmpl({
      ...this.props,
      colWidth: colWidth,
      cols: cols,
    });
  }


  /**
   * Did
   */
  didMount() {
    // document.querySelector('.page__content').addEventListener('scroll', this.scrollHandler);
    super.didMount();
  }

  /**
   * Will
   */
  willUnmount() {
    // document.querySelector('.page__content').removeEventListener('scroll', this.scrollHandler);
    super.willUnmount();
  }

// TODO: fix scrolling / loading content
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
