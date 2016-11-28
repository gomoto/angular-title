import * as angular from 'angular';
import 'angular-mocks';
import TitleService from './title.service';

describe('$title', () => {

  let $title: TitleService;
  let $window: ng.IWindowService;

  beforeEach(angular.mock.inject((
    _$window_: ng.IWindowService
  ) => {
    $window = _$window_;
    $title = new TitleService($window);
  }));

  it('should set page title', () => {
    $title.setTitle('customTitle');
    expect($window.document.title).toEqual('customTitle');
  });
});
