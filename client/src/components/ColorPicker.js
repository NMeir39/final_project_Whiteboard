import React, { useState } from 'react'
import { CirclePicker } from 'react-color'

export default function Color(props) {
    const [color, setColor] = useState('#ff0000');
    //const [showColorPicker, setShowColorPicker] = useState(true);
    // const [setShowColorPicker] = useState(false);
    
    return (
        <div>
            {props.showColorPicker && (
                <CirclePicker
                    className="colorpicker"
                    color={props.color}
                    onChangeComplete={updateColor => { setColor(updateColor.hex) }}
                />
            )}
        </div>
    );
}