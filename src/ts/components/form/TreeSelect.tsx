import React, { useState, useEffect } from 'react';
import { TreeSelect as PrimeReactTreeSelect, TreeSelectSelectionKeysType, TreeSelectPassThroughOptions, TreeSelectProps } from 'primereact/treeselect';
import { TreeNode } from 'primereact/treenode';
import { Button, ButtonProps } from 'primereact/button';
import { IconType } from 'primereact/utils';

type Props = {
    /** A function to set the props of the component */
    setProps: Function;

    /** A string representing the unique identifier of the component */
    id?: string;

    /** An array representing the available options in the tree select */
    options?: TreeNode[];

    /** The current selected value(s) */
    value?: null | string | TreeSelectSelectionKeysType | TreeSelectSelectionKeysType[];

    /** A string representing the placeholder text of the component */
    placeholder?: string;

    /** A prop controlling the display property of the TreeSelect component */
    display?;

    /** A prop indicating the selection mode of the TreeSelect component */
    selection_mode?;

    /** A boolean indicating whether meta key selection is enabled */
    meta_key_selection?: boolean;

    /** A boolean indicating whether the TreeSelect component is controlled */
    controlled?: boolean;

    /** The icon type for the dropdown icon */
    dropdown_icon?: IconType<TreeSelectProps>;

    /** An object representing the expanded state of each key in the TreeSelect component */
    expandedKeys?: { [key: string]: boolean };

    /** The icon type for the expand icon */
    expand_icon?: IconType<ButtonProps>;

    /** The icon type for the collapse icon */
    collapse_icon?: IconType<ButtonProps>;

    /** A string representing the label of the component */
    label?: string;

    /** A boolean indicating whether the label is floating */
    floating_label?: boolean;

    /** A boolean indicating the validity of the component */
    valid?: boolean;

    /** A boolean indicating whether the component is disabled */
    disabled?: boolean;

    /** A prop containing pass-through options for the TreeSelect component */
    pt?: TreeSelectPassThroughOptions;

    // filter?: boolean; 
    // filter_by?: string; 
    // filter_mode?; 
    // reset_filter_hide?: boolean; 
    // empty_message?: string; 
}

/** 
 * Tree Select is a custom Dash Component
 * built on top of PrimeReact's TreeSelect Component.
 */

const TreeSelect = (props: Props) => {
    const {
        setProps,
        id,
        options,
        value,
        placeholder, 
        display, 
        selection_mode,
        meta_key_selection,
        controlled, 
        dropdown_icon, 
        expandedKeys: expandedKeysProp, 
        expand_icon, 
        collapse_icon, 
        label, 
        floating_label, 
        valid, 
        disabled, 
        pt, 
        ...other
        // Save for Future
        // filter,
        // filter_by, 
        // filter_mode, 
        // empty_message, 
        // reset_filter_hide
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
        <div className="p-3 pb-0" hidden={!controlled}>
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
                        placeholder={placeholder}
                        onChange={handleChange}
                        display={display}
                        options={options}
                        selectionMode={selection_mode}
                        metaKeySelection={meta_key_selection}
                        dropdownIcon={dropdown_icon}
                        expandedKeys={expandedKeys}
                        onToggle={handleToggle}
                        panelHeaderTemplate={headerTemplate}
                        className={`${valid === false ? 'p-invalid' : ''}`}
                        disabled={disabled}
                        pt={pt}
                        {...other}
                        // Save for Future
                        // filter={filter}
                        // filterBy={filter_by}
                        // filterMode={filter_mode}
                        // resetFilterOnHide={reset_filter_hide}
                        // emptyMessage={empty_message}
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
