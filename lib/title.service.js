"use strict";
var TitleService = (function () {
    function TitleService($window) {
        this.$window = $window;
    }
    TitleService.prototype.setTitle = function (title) {
        this.$window.document.title = title;
    };
    TitleService.$inject = [
        '$window'
    ];
    return TitleService;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TitleService;
