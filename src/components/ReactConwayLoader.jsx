import React from "react";
import { useEffect, useRef, useState } from "react";
import conwayLoader from "conway-loader";
import { Alert } from 'antd';
import { ErrorBoundary } from 'react-error-boundary'

function ConwayConfigErrorWrap() {
  return <div>
    <Alert message="Conway Loader library cannot render the current configuration" type="error" />
  </div>
}

function WrapDomConwayLoaderComponent({
  rootNode,
  height,
  width,
  cellSizeR,
  cellSizeC,
  initialBoard,
  aliveColor,
  deadColor,
  randomColor,
  animationDelay,
  fixCellSizes,
  loopPattern
}) {
    const [configError, setConfigError] = useState(false);

    useEffect(() => {
      let loader;
      try {
        loader = conwayLoader.createLoader({
            height,
            width,
            cellSizeR,
            cellSizeC,
            initialBoard,
            aliveColor,
            deadColor,
            randomColor,
            animationDelay,
            rootNode,
            fixCellSizes,
            loopPattern,
            debug: process.env.NODE_ENV === 'production'
        });

        loader.render();
        loader.start();
        
        setConfigError(false);

      } catch (ex) {
        rootNode.innerHTML = "";
        setConfigError(true);
      }

        return () => {
          // Cleanup
          if (loader) loader.stop();
        };
      });

    if (configError) {
      return <ConwayConfigErrorWrap />
    }
    return <></>;
}

export default function ({
  height,
  width,
  cellSizeR,
  cellSizeC,
  initialBoard,
  aliveColor,
  deadColor,
  randomColor,
  animationDelay,
  fixCellSizes,
  loopPattern
}) {
  
  const [divRendered, setDivRendered] = useState(false);
  const divRef = useRef(null)

  useEffect(() => {
    if (divRef.current !== null) {
      setDivRendered(true);
    }
  }, [])


  return <>
      <div ref={divRef}></div>
      {divRendered && <WrapDomConwayLoaderComponent 
        height={height}
        width={width}
        cellSizeR={cellSizeR}
        cellSizeC={cellSizeC}
        initialBoard={initialBoard}
        aliveColor={aliveColor}
        deadColor={deadColor}
        randomColor={randomColor}
        animationDelay={animationDelay}
        fixCellSizes={fixCellSizes}
        loopPattern={loopPattern}
        rootNode={divRef.current}
      />}
  </>  
}
