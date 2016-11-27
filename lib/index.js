"use strict";
var angular = require('angular');
var title_service_1 = require('./title.service');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = angular.module('title', [
    'ui.router'
])
    .service('$title', title_service_1.default)
    .name;
