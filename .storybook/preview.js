import ReactDOM from 'react-dom';

// Polyfill findDOMNode for semantic-ui-react compatibility with React 19.
// React 19 removed ReactDOM.findDOMNode, but @fluentui/react-component-ref
// (used by semantic-ui-react's Dropdown, Popup, etc.) still calls it.
if (!ReactDOM.findDOMNode) {
  ReactDOM.findDOMNode = function findDOMNode(component) {
    if (component == null) return null;
    if (component.nodeType) return component;
    if (component._reactInternals || component._reactInternalFiber) {
      let fiber = component._reactInternals || component._reactInternalFiber;
      while (fiber) {
        if (fiber.stateNode && fiber.stateNode.nodeType) return fiber.stateNode;
        fiber = fiber.child;
      }
    }
    return null;
  };
}

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {},
    layout: 'centered',
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '812px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
      },
    },
    backgrounds: {
      values: [
        { name: 'Dark', value: '#1e1e1e' },
        { name: 'Light', value: '#f5f5f5' },
        { name: 'K8s Dark', value: '#0a1929' },
      ],
    },
  },
};

export default preview;
