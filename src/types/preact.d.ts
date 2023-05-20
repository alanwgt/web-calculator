import { VNode } from 'preact';
import { JSX } from 'preact';

type Children = JSX.Element|JSX.Element[];
type Element = JSX.Element;

type WithChildren<T = object> = T & { children?: Children };

type FunctionComponent<P = object> = (
    props: P & { children?: VNode }
) => Children | null;
