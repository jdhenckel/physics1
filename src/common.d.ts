
declare module 'matter-js' {
    /**
     * John added this.
     */
    export class Common {
        static extend(obj:any, deep?:boolean): any;
        static clone(obj:any, deep?:boolean): any;
        static keys(obj:any): any;
        static values(obj:any): any;
        static get(obj:any, path:string, begin:number, end:number): any;
        static set(obj:any, path:string, val:any, begin:number, end:number): any;
        static shuffle(array:any[]): any;
        static choose(choices:any[]): any;
        static isElement(obj:any):boolean;
        static isArray(obj:any):boolean;
        static isFunction(obj:any):boolean;
        static isPlainObject(obj:any):boolean;
        static isString(obj:any):boolean;
        static clamp(value:number, min:number, max:number):number;
        static sign(value:number): number;   
        static now(): number;
        static random(min?:number, max?:number): number;
        static colorToNumber(colorString:string): number;
        static log(...objs:any[]): void;
        static info(...objs:any[]): void;
        static warn(...objs:any[]): void;
    }
}
