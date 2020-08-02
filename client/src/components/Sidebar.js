import './Sidebar.css';
import Clean from '../images/clean.svg';
import Brushes from '../images/brushes.svg';
import Sellect from '../images/sellect.svg';
import Wash from '../images/wash.svg';
import Colors from '../images/colors.svg';
import Swap from '../images/swap.svg';
import Bubels from '../images/bubels.svg';
import React, { useState } from 'react';
import { CirclePicker } from 'react-color';

export function Sidebar({ isColorsPressed, isBrushPressed, isSelectPressed, isCleanPressed, isBubblesPressed, isBrushUp, isBrushDown, ...props }) {
    const [color, setColor] = useState('#ff0000');
    const [showColorPicker, setShowColorPicker] = useState(false);

    return (
        <div className="side-bar">
            <ul style={{ position: 'relative', zIndex: '2' }}>
                <li className="icon"><a href="#sellect" onClick={isSelectPressed}><img src={Sellect} alt="selectbtn" /></a></li>
                <li className="icon" >
                    <a href="#colors" onClick={() => setShowColorPicker(showColorPicker => !showColorPicker)}>
                        <img src={Colors} alt="colorsbtn" />
                    </a>
                    {showColorPicker && (
                        <div className="color-picker">
                            <CirclePicker
                                color={color}
                                onChangeComplete={updateColor => {
                                    setColor(updateColor.hex);
                                    isColorsPressed(updateColor.hex)
                                }}
                            />
                        </div>
                    )}
                </li>
                <li className="icon">
                    <a href="#clean"><img src={Clean} onClick={isCleanPressed} alt="cleanbtn" /></a></li>
                <li className="icon">
                    <a href="#brushes" onClick={isBrushPressed}>
                        <img src={Brushes} alt="brushesbtn" />
                    </a>
                </li>
                <li className="icon" onClick={isBubblesPressed}><a href="#bubels"><img src={Bubels} alt="Bublesbtn" /></a></li>
                <li className="icon brush-up" onClick={isBrushUp} ><a href="#brush-up">+</a></li>
                <li className="icon brush-down" onClick={isBrushDown} ><a href="#brush-down">-</a></li>
            </ul>
        </div>
    );
}

Sidebar.defaultProps = {
    isColorsPressed: () => { },
    isBrushPressed: () => { },
    isSelectPressed: () => { },
    isCleanPressed: () => { },
    isBubblesPressed: () => { },
    isBrushUp: () => { },
    isBrushDown: () => { }
}