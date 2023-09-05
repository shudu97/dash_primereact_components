import React, { useState, useEffect } from 'react';
import { TreeSelect as PrimeReactTreeSelect, TreeSelectSelectionKeysType, TreeSelectPassThroughOptions } from 'primereact/treeselect';
import { TreeNode } from 'primereact/treenode';
import { Button, ButtonProps } from 'primereact/button';
import { IconType } from 'primereact/utils';

type Props = {
    setProps: Function;
    id?: string;
    options?: TreeNode[];
    value?: null | string | TreeSelectSelectionKeysType | TreeSelectSelectionKeysType[];
    selection_mode?;
    meta_key_selection?: boolean;
    filter?: boolean;
    expandedKeys?: { [key: string]: boolean };
    expand_icon?:IconType<ButtonProps>; 
    collapse_icon?: IconType<ButtonProps>; 
    label?: string; 
    floating_label?: boolean; 
    valid?: boolean; 
    disabled?: boolean; 
    pt?: TreeSelectPassThroughOptions
}

const TreeSelect = (props: Props) => {
    const {
        setProps,
        id,
        options,
        value,
        selection_mode,
        meta_key_selection,
        filter,
        expandedKeys: expandedKeysProp, 
        expand_icon, 
        collapse_icon, 
        label, 
        floating_label, 
        valid, 
        disabled, 
        pt, 
        ...other
    } = props;

    const [selectedNodeKey, setSelectedNodeKey] = useState(value);
    const [expandedKeys, setExpandedKeys] = useState(expandedKeysProp || {});

    useEffect(() => {
        setSelectedNodeKey(value);
    }, [value]);

    useEffect(() => {
        setExpandedKeys(expandedKeysProp);
    }, [expandedKeysProp]);

    const handleChange = (e) => {
        const newValue = e.value;
        setSelectedNodeKey(newValue);

        if (setProps) {
            setProps({ value: newValue });
        }
    };

    const handleToggle = (e) => {
        if (setProps) {
            setProps({ expandedKeys: e.value });
        }
    };

    const expandAll = () => {
        let _expandedKeys = {};

        for (let node of options) {
            expandNode(node, _expandedKeys);
        }

        setProps({ expandedKeys: _expandedKeys });
    };

    const collapseAll = () => {
        setProps({ expandedKeys: {} });
    };

    const expandNode = (node, _expandedKeys) => {
        if (node.children && node.children.length) {
            _expandedKeys[node.key] = true;

            for (let child of node.children) {
                expandNode(child, _expandedKeys);
            }
        }
    };

    const headerTemplate = (
        <div className="p-3 pb-0">
            <Button type="button" icon={expand_icon} onClick={expandAll} className="w-2rem h-2rem mr-2 p-button-outlined" />
            <Button type="button" icon={collapse_icon} onClick={collapseAll} className="w-2rem h-2rem p-button-outlined" />
        </div>
    );

    return (
        <div className={`flex flex-column gap-2`}>
            {label && floating_label === false ? <label htmlFor={id}>{label}</label> : null}
            <div>
                <span className={`${floating_label ? 'p-float-label' : ''}`}>
                    <PrimeReactTreeSelect 
                        id={id}
                        value={selectedNodeKey}
                        onChange={handleChange}
                        options={options}
                        selectionMode={selection_mode}
                        metaKeySelection={meta_key_selection}
                        filter={filter}
                        expandedKeys={expandedKeys}
                        onToggle={handleToggle}
                        panelHeaderTemplate={headerTemplate}
                        className={`${valid === false ? 'p-invalid' : ''}`}
                        disabled={disabled}
                        pt={pt}
                        {...other}
                    />
                    {label && floating_label === true ? <label htmlFor={id}>{label}</label> : null}
                </span>
            </div>
        </div>
    )
}

TreeSelect.defaultProps = {
    meta_key_selection: false,
    selection_mode: 'single'
};

export default TreeSelect;
