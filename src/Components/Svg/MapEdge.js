import React from 'react';
import Colors from "../../Styles/Colors";
import { NodeStates } from '../../Models/Map';

export default ({ scale, nodeRadius, edge, node1, node2 }) => {
  const v_12 = { x: node2.x - node1.x, y: node2.y - node1.y };
  const len_12 = Math.sqrt(v_12.x * v_12.x + v_12.y * v_12.y);
  const norm_12 = {
    x: v_12.x / len_12,
    y: v_12.y / len_12
  };
  const norm_21 = { x: -norm_12.x, y: -norm_12.y };
  const mid = {
    x: node2.x - Math.sign(v_12.x) * Math.min(Math.abs(v_12.x), Math.abs(v_12.y)),
    y: node2.y - Math.sign(v_12.y) * Math.min(Math.abs(v_12.x), Math.abs(v_12.y))
  };
  const v_1m = {
    x: mid.x - node1.x,
    y: mid.y - node1.y
  };
  const len_1m = Math.sqrt(v_1m.x * v_1m.x + v_1m.y * v_1m.y);
  const norm_1m = len_1m < nodeRadius ? norm_12 : {
    x: v_1m.x / len_1m,
    y: v_1m.y / len_1m
  };
  const step1m = node1.minigameInfo ? nodeRadius / Math.max(Math.abs(norm_1m.x), Math.abs(norm_1m.y), .8) : nodeRadius;
  const x1 = node1.x + norm_1m.x * step1m;
  const y1 = node1.y + norm_1m.y * step1m;
  const v_2m = {
    x: mid.x - node2.x,
    y: mid.y - node2.y
  };
  const len_2m = Math.sqrt(v_2m.x * v_2m.x + v_2m.y * v_2m.y);
  const norm_2m = len_2m < nodeRadius ? norm_21 : {
    x: v_2m.x / len_2m,
    y: v_2m.y / len_2m
  };
  const step2m = node2.minigameInfo ? nodeRadius / Math.max(Math.abs(norm_2m.x), Math.abs(norm_2m.y), .8) : nodeRadius;
  const x2 = node2.x + norm_2m.x * step2m;
  const y2 = node2.y + norm_2m.y * step2m;
  return (
    <polyline
      points={`${x1 * scale},${y1 * scale} ${len_1m < nodeRadius || len_2m < nodeRadius ? '' : `${mid.x * scale},${mid.y * scale}`} ${x2 * scale},${y2 * scale}`}
      stroke={[node1.state, node2.state].every(s => [NodeStates.Infected, NodeStates.Neutral].includes(s)) ? Colors.InfectedNode : Colors.DefaultStroke}
      fill={Colors.DefaultFill}
      strokeWidth={3}
    />
  );
};