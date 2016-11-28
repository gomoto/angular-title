import * as test from 'blue-tape';
import * as angular from 'angular';
import TitleService from './title.service';

/**
 * Create a new instance of angular injector.
 * We cannot use angular.mock.inject, which
 * is only allowed when using jasmine or mocha.
 */
const setup = () => {
  // create a new injector in strict-di mode
  const $injector = angular.injector(['ng'], true);
  const $window = $injector.get<ng.IWindowService>('$window');
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
