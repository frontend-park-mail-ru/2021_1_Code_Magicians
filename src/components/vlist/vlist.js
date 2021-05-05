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
    const col = {
      heights: [],
      pins: [],
      scrollPos: 0,
      colHeight: 0,
      idx: 0,
    };

    // const statePayload = {
    //   startIdx: 0,
    //   endIdx: 0,
    //   height: 0,
    //   lastWidth: 0,
    //   render: true,
    // };


    const cols = Array(numberCols).fill(col);

    console.log(cols);

    const maxColHeight = 0;
    let elHeight = 0;
    let elWidth = 0;
    let pinsLeft = this.props.pins.length;
    let index = 0;
    // while (maxColHeight < this.props.height * 5 && pinsLeft > 0) {
    //   for (let i = 0; i < numberCols; i++) {
    //     col.pins[i] = this.props.pins[i];
    //     elHeight = this.props.pins[i].imageHeight;
    //     if (!elHeight) {
    //       col.heights[i] = 500;
    //     } else {
    //       col.heights[i] = elHeight;
    //     }
    //     col.colHeight += col.heights[i];
    //     cols[i] = col;
    //   }
    //   pinsLeft--;
    // }
    index = 0;
    while ((maxColHeight < (this.props.height * 5)) && (pinsLeft > 0)) {
      for (let i = 0; i < numberCols; i++) {
        if (cols[i] && cols[i].colHeight > maxColHeight) {
          continue;
        }
        const pin = this.props.pins[index];
        cols[i].pins[index] = pin;
        elHeight = pin.imageHeight;
        elWidth = pin.imageWidth;
        if (!elHeight || !elWidth) {
          cols[i].heights[index] = 500;
        } else {
          cols[i].heights[index] = elHeight / elWidth * colWidth; // by=400*by/bx
          cols[i].pins[index].imageHeight = cols[i].heights[index];
        }
        cols[i].colHeight += col.heights[index] + 20;
        cols[i].pins[index].imageWidth = colWidth;
        // cols[index] = col;
        index++;
        pinsLeft--;
      }
    }

    // var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    //
    // return { width: srcWidth*ratio, height: srcHeight*ratio };
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
    super.didMount();
  }

  /**
   * Will
   */
  willUnmount() {
    super.willUnmount();
  }

  /**
   * createBoard callback
   * @param {Event} event
   */
  createBoard(event) {
    event.preventDefault();

    // document.querySelector('.board-create-form').style.visibility = 'visible';
  }
}
