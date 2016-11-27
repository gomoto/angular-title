/// <reference types="angular" />
import { IWindowService } from 'angular';
export default class TitleService {
    private $window;
    static $inject: string[];
    constructor($window: IWindowService);
    setTitle(title: string): void;
}
