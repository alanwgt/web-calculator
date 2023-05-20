import type { ComponentChildren } from 'preact';
import { JSXInternal } from 'preact/src/jsx';
import classNames from '../../lib/classnames';
import { ColorVariant } from '../../types/style';
import './container.style.css';

type ContainerProps = JSXInternal.HTMLAttributes<HTMLDivElement> & {
    children: ComponentChildren;
    variant?: ColorVariant;
};

const Container = ({
    children,
    className = '',
    variant = 'primary',
    ...props
}: ContainerProps) => (
    <div className={classNames('container', className, variant)} {...props}>
        {children}
    </div>
);

export default Container;
