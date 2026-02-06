import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const NeuralNetworkVisualizer = ({ activations = [], featureNames = [] }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current || activations.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 1200;
    const height = 600;
    const margin = { top: 30, right: 30, bottom: 30, left: 180 };

    svg.attr('viewBox', `0 0 ${width} ${height}`);

    const colorScale = d3.scaleSequential(d3.interpolateRdYlBu).domain([1, -1]);

    const layers = activations.map((layer, i) => {
      // Handle both nested arrays [[val], [val]] and flat arrays [val, val]
      const values = Array.isArray(layer[0]) ? layer.map(n => n[0]) : layer;
      return { index: i, size: values.length, values };
    });

    const layerLabels = ['Input (51)', 'Hidden 1 (32)', 'Hidden 2 (16)', 'Output (1)'];
    const maxNodesDisplay = 20; // Cap displayed nodes per layer for readability

    const layerX = layers.map((_, i) =>
      margin.left + (i / (layers.length - 1)) * (width - margin.left - margin.right)
    );

    // Draw connections between layers
    layers.forEach((layer, li) => {
      if (li === 0) return;
      const prevLayer = layers[li - 1];
      const prevDisplayCount = Math.min(prevLayer.size, maxNodesDisplay);
      const currDisplayCount = Math.min(layer.size, maxNodesDisplay);

      for (let p = 0; p < prevDisplayCount; p++) {
        for (let c = 0; c < currDisplayCount; c++) {
          const y1 = margin.top + ((p + 0.5) / prevDisplayCount) * (height - margin.top - margin.bottom);
          const y2 = margin.top + ((c + 0.5) / currDisplayCount) * (height - margin.top - margin.bottom);

          svg.append('line')
            .attr('x1', layerX[li - 1])
            .attr('y1', y1)
            .attr('x2', layerX[li])
            .attr('y2', y2)
            .attr('stroke', '#00ff4115')
            .attr('stroke-width', 0.5);
        }
      }
    });

    // Draw nodes
    layers.forEach((layer, li) => {
      const displayCount = Math.min(layer.size, maxNodesDisplay);
      const nodeRadius = Math.max(4, Math.min(12, 300 / displayCount));

      for (let n = 0; n < displayCount; n++) {
        const y = margin.top + ((n + 0.5) / displayCount) * (height - margin.top - margin.bottom);
        const value = layer.values[n] || 0;

        svg.append('circle')
          .attr('cx', layerX[li])
          .attr('cy', y)
          .attr('r', nodeRadius)
          .attr('fill', colorScale(value))
          .attr('stroke', '#00ff41')
          .attr('stroke-width', 1)
          .attr('opacity', 0.9);

        // Feature name labels for input layer
        if (li === 0 && n < featureNames.length && n < 15) {
          svg.append('text')
            .attr('x', layerX[li] - 10)
            .attr('y', y + 4)
            .attr('text-anchor', 'end')
            .attr('fill', '#00ff4180')
            .attr('font-size', '8px')
            .attr('font-family', 'Courier New, monospace')
            .text(featureNames[n]);
        }
      }

      // Ellipsis if truncated
      if (layer.size > maxNodesDisplay) {
        const y = margin.top + ((displayCount + 0.5) / (displayCount + 1)) * (height - margin.top - margin.bottom);
        svg.append('text')
          .attr('x', layerX[li])
          .attr('y', y)
          .attr('text-anchor', 'middle')
          .attr('fill', '#00ff4160')
          .attr('font-size', '14px')
          .text(`... +${layer.size - maxNodesDisplay}`);
      }

      // Layer label
      svg.append('text')
        .attr('x', layerX[li])
        .attr('y', height - 5)
        .attr('text-anchor', 'middle')
        .attr('fill', '#00ff41')
        .attr('font-size', '11px')
        .attr('font-family', 'Courier New, monospace')
        .attr('font-weight', 'bold')
        .text(layerLabels[li] || `Layer ${li}`);
    });

    // Title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 18)
      .attr('text-anchor', 'middle')
      .attr('fill', '#00ff41')
      .attr('font-size', '14px')
      .attr('font-family', 'Courier New, monospace')
      .attr('font-weight', 'bold')
      .text('Neural Network Activations');

  }, [activations, featureNames]);

  return (
    <div style={{
      backgroundColor: '#0a0e27',
      borderRadius: '8px',
      border: '1px solid #00ff4130',
      padding: '16px',
      overflow: 'hidden'
    }}>
      <svg
        ref={svgRef}
        style={{ width: '100%', height: 'auto', maxHeight: '600px' }}
        data-testid="neural-network-svg"
      />
    </div>
  );
};

export default NeuralNetworkVisualizer;
