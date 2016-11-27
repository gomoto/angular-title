import {
  IWindowService
} from 'angular';

export default class TitleService {

  static $inject = [
    '$window'
  ];

  constructor(
    private $window: IWindowService
  ) {}

  setTitle(title: string) {
    this.$window.document.title = title;
  }

}
