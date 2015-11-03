///<reference path="../typings/tsd.d.ts" />
///<reference path="plugin.d.ts" />
///<reference path="controls.ts" />
///<reference path="classes.ts" />
/**
 * Plugin for Snap SVG.
 * Adds methods to the Element class to get anchor controls and coordinates of corners.
 * @author Oblady
 */
Snap.plugin(function (Snap, Element, Paper, global) {
    Element.prototype.globalToLocal = function (globalPoint) {
        var globalToLocal = this.node.getTransformToElement(this.paper.node).inverse();
        globalToLocal.e = globalToLocal.f = 0;
        return globalPoint.matrixTransform(globalToLocal);
    };
    Element.prototype.getCursorPoint = function (x, y) {
        if (!this.paper)
            return;
        var svgel = document.createElement('svg');
        var pt = this.paper.node.createSVGPoint();
        pt.x = x;
        pt.y = y;
        return pt.matrixTransform(this.paper.node.getScreenCTM().inverse());
    };
    /**
     * Draws corners of an object's bounding box.
     */
    Element.prototype.drawControls = function () {
        var container = this.data('containerObject');
        container.placeControls();
    };
    Element.prototype.hideControls = function () {
        var container = this.data('containerObject');
        if (container) {
            container.hideControls();
        }
    },
        /**
         * Plugin initialisation
         * Creates a new container group
         * Adds a new scalable group to the container
         * Adds a new controls group to the container
         * Adds the current element to the scalable group
         * Adds controls to the controls group
         */
        Element.prototype.controllable = function (options) {
            var container = null;
            var self = this;
            options = options || {};
            options.onselect = options.onselect || function () { };
            options.onunselect = options.onunselect || function () { };
            options.onchange = options.onchange || function () { };
            options.ondragstart = options.ondragstart || function () { };
            options.getZoomRatio = options.getZoomRatio || function () { console.log('default ratio'); return 1; };
            options.getRotateControl = options.getRotateControl || function () {
                var item = self.paper.circle(0, 0, 10);
                item.toggleClass('rotationControl', true);
                return item;
            };
            options.getControlWidth = options.getControlWidth || function () {
                return 50 / options.getZoomRatio() / 2;
            };
            options.getControlHeight = options.getControlHeight || function () {
                return 50 / options.getZoomRatio() / 2;
            };
            options.getRotateControlOffset = options.getRotateControlOffset || function () {
                return 50 / options.getZoomRatio() / 2;
            };
            if (this.hasClass('elementContainer')) {
                var scalable = new ScalableGroup(options, this.paper, Snap(this.node.children[0])), controls = new ControlsGroup(options, this.paper, Snap(this.node.children[1]));
                container = new Container(options, this.paper, this);
                container.setScalableGroup(scalable);
                container.setControlsGroup(controls);
                container.setOriginalGroup(Snap(scalable.group.node.children[0]));
                container.controlsGroup.cleanControls();
            }
            else {
                var scalable = new ScalableGroup(options, this.paper), controls = new ControlsGroup(options, this.paper);
                container = new Container(options, this.paper);
                this.attr({ 'data-controllable': true });
                scalable.append(this);
                container.setScalableGroup(scalable);
                container.setControlsGroup(controls);
                container.setOriginalGroup(this);
            }
            controls.addControl(ControlPositions.br, new ScaleControl(container, container.group));
            controls.addControl(ControlPositions.mt, new RotationControl(container, container.group, options.getRotateControl(controls.group)));
            container.group.data('containerObject', container);
            controls.group.data('containerObject', container);
            scalable.group.data('containerObject', container);
            this.data('containerObject', container);
            return container;
        },
        /**
         * Plugin desactivation
         * Removes the elementControls group
         */
        Element.prototype.uncontrollable = function () {
            //this._control.remove();
            //this._control = null;
        },
        Snap.Point = fabric.Point;
    Snap.Control = Control;
    Snap.Container = Container;
});
//# sourceMappingURL=snap.controls.plugin.js.map