import { TreeMate, TreeNode } from 'treemate';
import { Ref } from 'vue';
import type { TreeOptionBase, TreeOption } from '../../tree/src/interface';
export declare type TreeSelectOption = Omit<TreeOptionBase, 'checkboxDisabled' | 'isLeaf' | 'children'> & {
    children?: TreeSelectOption[];
    [k: string]: unknown;
};
export declare type TreeSelectTmNode = TreeNode<TreeSelectOption>;
export declare type OnUpdateValue = (value: string & number & (string | number) & string[] & number[] & Array<string | number> & null, option: TreeSelectOption & null & TreeSelectOption[] & Array<TreeSelectOption | null>) => void;
export declare type OnUpdateValueImpl = (value: string | number | (string | number) | string[] | number[] | Array<string | number> | null, option: TreeSelectOption | null | Array<TreeSelectOption | null>) => void;
export declare type Value = string | number | Array<string | number> | null;
export interface TreeSelectInjection {
    pendingNodeKeyRef: Ref<string | number | null>;
    dataTreeMate: Ref<TreeMate<TreeOption>>;
}
export declare const treeSelectInjectionKey: import("vue").InjectionKey<TreeSelectInjection>;
