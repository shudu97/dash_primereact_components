import React, { useState, useEffect } from 'react'
import { TreeSelect as PrimeReactTreeSelect, TreeSelectSelectionKeysType } from 'primereact/treeselect'
import { TreeNode } from 'primereact/treenode'
import { Button } from 'primereact/button'


type Props = {
    setProps: Function; 
    id?: string; 
    options?: TreeNode[]; 
    value?: null | string | TreeSelectSelectionKeysType | TreeSelectSelectionKeysType[]; 
    selection_mode?
    meta_key_selection?: boolean; 
    filter?: boolean
}

const TreeSelect = (props: Props) => {
    const {
        setProps, 
        id, 
        options, 
        value, 
        selection_mode, 
        meta_key_selection, 
        filter
    } = props; 

    const [selectedNodeKey, setSelectedNodeKey] = useState(value);

    // Synchronize internal state with props if `value` prop changes
    useEffect(() => {
        setSelectedNodeKey(value);
    }, [value]);

    const handleChange = (e) => {
        const newValue = e.value;
        setSelectedNodeKey(newValue);
        
        // Update the Dash component props
        if (setProps) {
            setProps({ value: newValue });
        }
    };

    return (
        <PrimeReactTreeSelect 
            id={id}
            value={selectedNodeKey}
            onChange={handleChange}
            options={options}
            selectionMode={selection_mode}
            metaKeySelection={meta_key_selection}
            filter={filter}
        />

    )
}

TreeSelect.defaultProps = {
    meta_key_selection: false, 
    selection_mode: 'single'
}

export default TreeSelect

