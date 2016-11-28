import * as test from 'blue-tape';
import TitleService from './title.service';

const setup = () => {
  const $window = <ng.IWindowService> {
    document: {
      title: ''
    }
  };
  const $title = new TitleService($window);
  return {
    $title,
    $window
  };
};

test('should set page title', (assert) => {
  const {
    $title,
    $window
  } = setup();
  $title.setTitle('customTitle');
  assert.equal($window.document.title, 'customTitle');
  assert.end();
});
