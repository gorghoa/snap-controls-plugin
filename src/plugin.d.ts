///<reference path="classes.ts" />
declare module Snap {

    export interface Paper {
        node: SVGSVGElement;
    }

    export interface Matrix {
        a: number;
        b: number;
        c: number;
        d: number;
        e: number;
        f: number;
    }

    export interface ICoords {
        x: number;
        y: number;
        transformX: number;
        transformY: number;
        scaleX: number;
        scaleY: number;
    }

    export interface Element {
        //setWidth(w:number):void;
        //setHeight(h:number):void;
        groups: Element;
        paper: Paper;
        setOCoords(angle:number, currentWidth?: number, currentHeight?: number): Element;
        prototype: Element;
        angle: number;
        width: number;
        height: number;
        scaleX: number;
        scaleY: number;
        rect(x:number, y:number, width: number, height:number);
        circle(cx:number, cy:number, r:number);

        controllable ( onSelectionCallback: () => void ): Container;
        uncontrollable (): void;
        hideControls(): void;

        drawControls(width: number, height: number, options?: Object): void;
        isControlVisible(controlName: string): boolean;
        setControlVisible(controlName: string, visible: boolean): Element;
        setControlsVisibility(controls: Object): Element;
        getCoords(): ICoords;
        getCursorPoint(x: number, y:number): SVGPoint;
        globalToLocal(globalPoint: SVGPoint): SVGPoint;


        _getControlsVisibility(): Object;
        _setCornerCoords(angle: number): void;
        _drawControl(controlName: string, fillRect: string, left: number, top:number  ): void;
        _removeControl(controlName: string): void;
        _removeControls(): void;
        _setDefaultOptions(): void;

    }



}
