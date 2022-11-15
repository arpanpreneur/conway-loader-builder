import React from 'react';

export default function({
    displayMatrix,
    onCellClick
}) {
    const rows = displayMatrix ? displayMatrix.length : 0;
    const cols = rows > 0 ? displayMatrix[0].length : 0;

    const cellSize = 20;

    const rects = [];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            rects.push(
                <rect
                    key={`${i}_${j}`}
                    x={j * cellSize} y={i * cellSize}
                    width={cellSize} height={cellSize}
                    fill={displayMatrix[i][j] === 0 ? "#ffffff" : "yellow"} stroke={"#000000"}
                    onClick={(e) => onCellClick(i, j)}
                ></rect>
            );
        }
    }
    return <>
        <svg id="display-panel" height={rows * cellSize} width={cols * cellSize}>
            {rects}
        </svg>
    </>
}