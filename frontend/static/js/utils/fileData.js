/**
 * Houses all the functions to get data from the sheet that was uploaded
 */
export const FileData = {
  /**
   * Gets the file name of the file uploaded
   * @param {Event} e Event from the file upload
   * @returns {string} The name of file uploaded
   */
  filename(e) {
    return e.target.files[0].name;
  },
  /**
   * Gets all sheet names from current XLSX file.
   * @param {Promise} sheets The file uploaded.
   * @returns {string[]} A list of all sheet names.
   */
  getSheets(sheets) {
    const sheetNames = [];
    sheets.forEach((sheet) => sheetNames.push(sheet.name));

    return sheetNames;
  },
  renderSheetInformation(templateType, sheetName) {
    document.getElementById(templateType).innerHTML = `
      <div id='${templateType}-${sheetName}'>
        <p class='h6 mx-auto'>${sheetName}</p>
      </div>`;
  },
  /**
   * Gets the headers from the sheet that was uploaded
   * @param {*[]} data Data from sheet
   * @returns {string[]} First row from sheet
   */
  getHeaders_Original(data) {
    return data[0];
  },
  /**
   * Gets the headers from the modified sheet data
   * @param {*[]} data Modified data from the sheet
   * @param {string} value Word to remove from first row in the modified data
   * @returns {*[]} First row from sheet
   */
  getHeaders_Modified(data, value) {
    const headers = [];

    data[0].forEach((row, idx) => idx % 2 !== 0 && headers.push(row));

    return headers.filter((item) => item !== value);
  },
  /**
   * Gets the total number of columns from a sheet
   * @param {string[]} sheetNames List of the sheet names from the uploaded file.
   * @param {any} file The file uploaded.
   * @returns {number[]} List of numbers representing the amount of columns each sheet
   * has in the order of the list of sheet names.
   */
  async getTotalColumns(sheet, file) {
    // const count = [];
    const data = await readXlsxFile(file, { sheet });
    return data.map((row) => row.length);
    // sheetNames.forEach(async (sheet) => {
    //   const data = await readXlsxFile(file, {
    //     sheet,
    //   });

    //   data.forEach((row) => count.push(row.length));
    // });

    // return count;
  },
  /**
   * Gets each sheet name, total columns, and total rows in every sheet in the file uploaded.
   * @param {Array.<string>} sheetNames List of sheet names from the uploaded XLSX file.
   * @param {any} file The uploaded XLSX file.
   * @returns {Array.<String[] & Number[]>} Array of arrays containing each sheet name, total columns, and total rows.
   */
  async getSheetData(sheetNames, file) {
    const sheetData = [];
    let columns = 0;

    for (const sheet of sheetNames) {
      const data = await readXlsxFile(file, {
        sheet,
      });

      data.forEach((row) => (columns = row.length));
      sheetData.push([sheet, columns, data.length]);
    }

    return sheetData;
  },
  /**
   * Outputs the sheet data in the specified tag.
   * @param {string} id String that specifies the ID of where to output the sheet information.
   * @param {Array<string|number>} sheet Sheet information.
   */
  renderFileData(id, sheet) {
    const sheetName = sheet.sheetName;
    document.getElementById(id).innerHTML += `
      <div class="sheet-info" id="${sheetName}">
        <p class='h6 mx-auto sheet-1'>
          <input
            type="checkbox"
            name="sheetCheckbox"
            id="${sheetName}-check"
            class="sheet-check"
          />
          <label for="${sheetName}-check">${sheetName}</label>
        </p>
        <p class='h6 mx-auto'>${sheet.columns}</p>
        <p class='h6 mx-auto'>${sheet.rows}</p>
      </div>
    `;
  },
  /**
   * Creates a list of all the data from the sheet
   * @param {*[][]} data Data from uploaded sheet
   * @returns {*[]} A list of all the data from the sheet
   */
  getListOfData(data) {
    const cell = [];

    data.forEach((row) => {
      let start = 0;

      while (start < row.length) {
        cell.push(row[start]);

        start++;
      }
    });

    return cell;
  },
};