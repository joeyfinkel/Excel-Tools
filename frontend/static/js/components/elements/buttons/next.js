import { headersView } from '../../built/headersView.js';
import {
  removeElementById,
  showComponent,
  dataAttributes,
} from '../../../utils/utils.js';
import * as types from '../../../utils/types.js';

/**
 * Creates the next button to move on to the next view for creating the template sheet.
 * @returns {types.ITag} A font awesome icon of a right arrow.
 */
export const createNextButton = () =>
  `<i
    id="showColumnNames"
    class="fas fa-arrow-right fa-lg"
    ${dataAttributes.nextButton}
  ></i>`;

/**
 * Checks if next button is clicked on and shows the headers from the selected sheet.
 * @param {string} templateType Type of template the event is for.
 * @param {string} activeSheet The selected sheet.
 */
export const nextButtonEvent = (templateType, activeSheet) => {
  const data = JSON.parse(localStorage.getItem(`${activeSheet}RowsAndColumns`));

  removeElementById(`${templateType}Display`);
  showComponent(
    headersView(data[0], templateType, `Headers From ${activeSheet}`)
  );
};