import React, { useState, useEffect } from 'react';

import _ from 'lodash';
import ReactResizeDetector from 'react-resize-detector';
import { useParsed } from './parse';

import { Paper, List, ListItem } from "@material-ui/core";

let ForceGraph2D, ForceGraph3D, SpriteText;
if (process.browser) {
  SpriteText = require('three-spritetext').default;
  ForceGraph2D = require('react-force-graph-2d').default;
  ForceGraph3D = require('react-force-graph-3d').default;
}

export const Graph = ({
  nodes,
  links,
  type = '2d',
  onNodeClick,
  generateWidth = (width) => width,
  ...props,
}) => {
  const [{ width, height }, setSize] = useState({ width: 100, height: 100 });

  const _onNodeClick = (node) => {
    if (onNodeClick) onNodeClick(node.__data);
  };

  return <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
    <ReactResizeDetector handleWidth handleHeight onResize={(width, height) => {
      setSize({ width, height });
    }}/>
    {type === '3d' && process.browser && <>
      <ForceGraph3D
        width={generateWidth(width)}
        height={height}
        graphData={{
          nodes,
          links,
        }}
        nodeAutoColorBy="group"
        nodeThreeObject={node => {
          const label = node.label || node.id;
          const sprite = new SpriteText(label);
          sprite.color = node.color;
          sprite.textHeight = 8;
          return sprite;
        }}
        linkColor={d => d.color}
        linkOpacity={1}
        backgroundColor={'#ffffff'}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkCurvature={0.25}
        onNodeClick={_onNodeClick}
        {...props}
      />
    </>}
    {type === '2d' && process.browser && <>
      <ForceGraph2D
        width={width}
        height={height}
        graphData={{
          nodes,
          links,
        }}
        nodeAutoColorBy="group"
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkCurvature={0.25}
        linkColor={d => d.color}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.label || node.id;
          const fontSize = 12/globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding
          ctx.fillStyle = '#fff';
          ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          ctx.fillStyle = node.color;

          ctx.fillText(label, node.x, node.y);
        }}
        onNodeClick={_onNodeClick}
        {...props}
      />
    </>}
  </div>;
};
