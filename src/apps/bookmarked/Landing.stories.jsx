import Landing from './components/Landing';
import { BookmarkedDecorator } from './decorators';

const meta = {
  title: 'Bookmarked/Landing',
  component: Landing,
  decorators: [BookmarkedDecorator],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Default = {};
