import {Component} from 'components/component';

import ToastTemplate from './toast.hbs';
import './toast.scss';

/**
 * Toasts box component
 */
class Toast extends Component {
  /**
   * Makes new toasts box
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.tmpl = ToastTemplate;

    this.addToast = this.addToast.bind(this);
  }

  /**
   * Return HTML for new toast
   * @return {*}
   */
  render() {
    return this.tmpl({...this.props, message: this._state.message});
  }

  /**
   * Add new toast
   * @param {String} message
   * @param {Boolean} isError
   */
  addToast(message, isError = false) {
    this.setState({message: message});

    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.classList.add(isError ? 'toast_error' : 'toast_info');
    toast.innerHTML = this.render();

    document.querySelector('.toasts-box').prepend(toast);
    toast.addEventListener('click', this.removeToast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.style.display = 'none', 500);
    }, 2000);

    this.clearState();
  }

  /**
   * Removes toast
   * @param {Event} ev
   */
  removeToast(ev) {
    ev.preventDefault();

    const toast = ev.target.closest('.toast');
    toast.style.display = 'none';

    toast.removeEventListener('click', this.removeToast);
  }
}

export const toastBox = new Toast({});
