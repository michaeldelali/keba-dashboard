import React from 'react';
import renderer from 'react-test-renderer';

import routes from '..\src\component\routes.js';

describe('<routes />', () => {
    it('should match the snapshot', () => {
      const component = renderer.create(<routes />).toJSON();
      expect(component).toMatchSnapshot();
    });
  });