import {Component} from '../component.js';
import {actions} from '../../actions/actions.js';


// {
//   "id": 0,
//   "boardID": 0,
//   "title": "string",
//   "description": "string",
//   "imageLink": "string",
//   "relatedTagIDs": [
//   "string"
// ]
// }

/**
 * Pin browsing component
 */
export class PinBrowser extends Component {
  /**
   * Makes pin browser element
   * @param {Object} props
   */
  constructor(props) {
    super(props);
  }

  /**
   * Returns html code
   * @return {String}
   */
  render() {
    const tmpl = Handlebars.templates['pinBrowser.hbs'];
    return tmpl({});
    // return tmpl({...this.props, user: userStore.getUser().profile});
  }

  /**
   * Did
   */
  didMount() {
    document.querySelector('.profile-changes').addEventListener('submit', this.submit);

    // if (userStore.getStatus() === constants.store.statuses.userStore.profileEdited) {
    //   alert('profile edited successfully');
    //   actions.user.statusProcessed();
    // }
  }

  /**
   * Will
   */
  willUnmount() {
    document.querySelector('.profile-changes').removeEventListener('submit', this.submit);
  }

  /**
   * Submit callback
   * @param {Event} event
   */
  submit(event) {
    event.preventDefault();
    // const target = event.target;

    actions.user.editProfile('');
  }
}
