import { createRadio } from '../elements/radio.js';
import { createNextButton } from '../elements/buttons/next.js';
import { createBackButton } from '../elements/buttons/back.js';
import * as types from '../../utils/types.js';

/**
 * Creates the sheet view component. Displays all the sheet names, columns, and rows
 * of the uploaded spreadsheet.
 * @param {string} templateType Type of template.
 * @param {string[]} sheetNames Array of all the sheets names from the uploaded spreadsheet.
 * @returns {types.sheetViewComponent} The HTML for the sheet view component.
 */
export const sheetView = (templateType, sheetNames) => {
  /**
   * Creates the HTML for displaying sheet information.
   * @param {string} sheet Sheet from uploaded spreadsheet.
   * @returns {Promise<string>} The HTML to display the sheet name, total columns, and total rows.
   */
  const showSheetInformation = (sheet) => {
    const sheetName = sheet[0];

    return `
        <div class="sheet-info form-check" id="${sheetName}">
        <p class='h6 mx-auto sheet-1'>${createRadio(sheetName)}</p>
        <p class='h6 mx-auto'>${sheet[1]}</p>
        <p class='h6 mx-auto'>${sheet[2]}</p>
        </div>
    `;
  };

  return `
    <div
        id="${templateType}Display"
        class="sheet-display mx-auto mt-4"
    >
        ${createBackButton()}
        <div class="headers">
            <p className="h6 mx-auto">Sheet Name</p>
            <p className="h6 mx-auto">Columns</p>
            <p className="h6 mx-auto">Rows</p>
        </div>
        <div id="${templateType}Sheets" class="sheets">
            ${sheetNames.map((sheet) => showSheetInformation(sheet)).join('')}
        </div>
        ${createNextButton()}
    </div>
    `;
};