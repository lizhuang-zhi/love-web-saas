import { Ref } from 'vue';
import type { MergedTheme } from '../../_mixins';
import type { PopselectTheme } from '../styles';
import type { PopoverInst } from '../../popover/src/interface';
export declare type PopselectSize = 'small' | 'medium' | 'large' | 'huge';
export interface PopselectInjection {
    mergedThemeRef: Ref<MergedTheme<PopselectTheme>>;
    setShow: (value: boolean) => void;
    syncPosition: () => void;
}
export declare type PopselectInst = PopoverInst;
export declare const popselectInjectionKey: import("vue").InjectionKey<PopselectInjection>;
