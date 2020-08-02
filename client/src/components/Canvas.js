import React from 'react';
import { PaperScope } from 'paper';
import { MODES } from '../globals/WhiteBoard';
import {  HubConnectionBuilder } from '@microsoft/signalr';

var connection = new HubConnectionBuilder().withUrl("/drawDotHub").build();

connection.on("updateDot", function () {
    Canvas();

});

// connection.on("clearCanvas", function () {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
// });

connection.start().then(function () {
    // nothing here
}).catch(function (err) {
    return console.error(err.toString());
});


var paper;
var canvas;
var myPath;
var currX;
var currY;
var prevX;
var prevY;
var isDown = false;
var selectedItem = null;

var hitOptions = {
    stroke: true,
    tolerance: 5
};

const checkOrCreatePaperJsObject = () => {
    canvas = document.querySelector('canvas');
    if (!paper) {
        paper = new PaperScope();
        // Create an empty project and a view for the canvas:
        paper.setup(canvas);
    }
}

export function Canvas({ mode, colorHex, onChange, brushSize, ...props }) {

    function onMouseDown(e) {
        isDown = true;
        checkOrCreatePaperJsObject();
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;
        const point = new paper.Point(currX, currY);
        if (mode === MODES.BRUSH) {
            // Create a Paper.js Path to draw a line into it:
            myPath = new paper.Path();
            myPath.strokeColor = colorHex;
            myPath.strokeWidth = brushSize;
        } else if (mode === MODES.BUBBLES) {
            prevX = currX;
            prevY = currY;
            myPath = new paper.Path();
            myPath.strokeColor = colorHex;
            myPath.strokeWidth = 1;
            var circle = new paper.Path.Circle({
                center: point,
                radius: Math.random() * 10
            });
            circle.strokeColor = colorHex;
            myPath.add(circle);
        } else if (mode === MODES.CLEAN) {
            var hitResult = paper.project.hitTest(point, hitOptions);
            if (!hitResult) {
                if (selectedItem) {
                    selectedItem.bounds.selected = false;
                    selectedItem = null;
                }
                return;
            }
            hitResult.item.remove();
        }
        onChange(paper.project.exportJSON({ asString: false }), paper.project.exportJSON({ asString: true }));
    }

    function onMouseMove(e) {
        checkOrCreatePaperJsObject();
        var distance
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;
        if (currX) {
            const distanceFromPreviousX = (e.clientX - canvas.offsetLeft) - currX;
            const distanceFromPreviousY = (e.clientX - canvas.offsetLeft) - currY;
            distance = (Math.abs(currX - prevX) + Math.abs(currY - prevY)) / 2
        }
        const point = new paper.Point(currX, currY);
        if (mode === MODES.BRUSH) {
            if (!isDown) return;
            myPath.add(point);
        } else if (mode === MODES.BUBBLES) {
            if (!isDown) return;
            if (distance < 7) return
            prevX = currX;
            prevY = currY;
            const delta = Math.abs(((e.movementY + e.movementX) / 2))
            var circle = new paper.Path.Circle({
                center: point,
                radius: delta * 7
            });
            circle.strokeColor = colorHex;
            circle.strokeWidth = 1;
            myPath.add(circle);
        } else if (mode === MODES.SELECT) {
            if (isDown) {
                if (selectedItem) {
                    selectedItem.position = point;
                }
            } else {
                var hitResult = paper.project.hitTest(point, hitOptions);
                if (!hitResult) {
                    if (selectedItem) selectedItem.bounds.selected = false;
                    return;
                }
                hitResult.item.bounds.selected = true;
                selectedItem = hitResult.item;
            }
        }
        onChange(paper.project.exportJSON({ asString: false }), paper.project.exportJSON({ asString: true }));
    }

    function onMouseUp(event) {
        isDown = false
    }

    return (
        <canvas className="canvas"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp} />
    );
}

Canvas.defaultProps = {
    mode: MODES.BRUSH,
    colorHex: "#ff0000",
    onChange: () => { },
    brushSize: 8
}