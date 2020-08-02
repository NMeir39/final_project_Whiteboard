import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Canvas } from './Canvas';
import React from 'react';
import { MODES } from '../globals/WhiteBoard';

class Whiteboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            buttonSellectPressed: false,
            buttonColorsPressed: false,
            buttonBrushPressed: false,
            buttonEreasetPressed: false,
            buttonWashtPressed: false,
            buttonSwaptPressed: false,
            mode: MODES.BRUSH,
            brushSize: 8,
            color: '#ff0000'
        }
    }

    selectPressed = (e) => {
        this.setState({ mode: MODES.SELECT })
    }

    brushPressed = (e) => {
        this.setState({ mode: MODES.BRUSH })
    }

    cleanPressed = (e) => {
        this.setState({ mode: MODES.CLEAN })
    }

    colorPickerPressed = (color) => {
        this.setState({ color })
    }

    bubblesPressed = () => {
        this.setState({ mode: MODES.BUBBLES })
    }

    brushChange = (by) => {
        var brushSize = this.state.brushSize + by;
        if (brushSize <= 0) brushSize = 1;
        this.setState({ brushSize })
    }

    onCanvasChange = (canvasJSON, canvasSTR) => {
        // holds the current canvas data - use this to send to server
    }

    render() {
        return (
            <div className="App">
                <Canvas
                    mode={this.state.mode}
                    colorHex={this.state.color}
                    onChange={this.onCanvasChange}
                    brushSize={this.state.brushSize}
                />
                <Navbar />
                <Sidebar
                    isColorsPressed={this.colorPickerPressed}
                    isSelectPressed={this.selectPressed}
                    isCleanPressed={this.cleanPressed}
                    isBrushPressed={this.brushPressed}
                    isBubblesPressed={this.bubblesPressed}
                    isBrushUp={() => this.brushChange(1)}
                    isBrushDown={() => this.brushChange(-1)}
                    buttonsState={this.state}
                    style={{ position: 'relative', zIndex: '2' }}
                />
            </div>
        );
    }


}

export default Whiteboard;
