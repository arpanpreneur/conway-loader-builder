function addNRowsToMatrix(matrix, n) {
  const currentRowCnt = matrix.length;
  const currentColCnt = currentRowCnt > 0 ? matrix[0].length : 1;
  
  for (let i = 1; i <= n; i++) {
    matrix.push(Array(currentColCnt).fill(0));
  }
}

function addNColumnsToMatrix(matrix, n) {
  const currentRowCnt = matrix.length;
  const currentColCnt = currentRowCnt > 0 ? matrix[0].length : 1;
  
    for (let row = 0; row < currentRowCnt; row++) {
      for (let i = 1; i <= n; i++) {
        matrix[row].push(0);
      }
    }
}

export function buildMatrix(numRows, numCols, valueCb) {
    const tempMatrix = [];
    for (let i = 0; i < numRows; i++) {
      const rowArr = [];
      for (let j = 0; j < numCols; j++) {
        rowArr.push(valueCb(i, j))
      }
      tempMatrix.push(rowArr);
    }

    return tempMatrix;
}

export function resizedMatrix(matrix, numRows, numCols) {
  const currentRowCnt = matrix.length;
  const currentColCnt = currentRowCnt > 0 ? matrix[0].length : 1;

  const tempMatrix = structuredClone(matrix);
  
  const rowsToBeAdded = numRows - currentRowCnt;
  const colsToBeAdded = numCols - currentColCnt;

  addNColumnsToMatrix(tempMatrix, colsToBeAdded);
  addNRowsToMatrix(tempMatrix, rowsToBeAdded);

  return tempMatrix;
}
