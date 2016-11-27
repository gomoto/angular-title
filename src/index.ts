import * as angular from 'angular';
import TitleService from './title.service';

export default angular.module('title', [
  'ui.router'
])
.service('$title', TitleService)
.name;
