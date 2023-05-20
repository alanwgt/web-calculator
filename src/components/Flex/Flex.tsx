import { WithChildren } from '../../types/preact';

type FlexProps = WithChildren & {
    direction?: 'row' | 'column';
    justify?:
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around';
    align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    grow?: number;
    shrink?: number;
    basis?: string;
    order?: number;
    style?: any;
    className?: string;
    gap?: string;
};

const Flex = ({
    children,
    direction = 'row',
    justify = 'flex-start',
    align = 'flex-start',
    wrap = 'nowrap',
    grow = 0,
    shrink = 1,
    basis = 'auto',
    order = 0,
    style = {},
    className = '',
    gap = '0',
}: FlexProps) => {
    const flexStyle = {
        display: 'flex',
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        flexWrap: wrap,
        flexGrow: grow,
        flexShrink: shrink,
        flexBasis: basis,
        order,
        gap,
        ...style,
    };

    return (
        <div className={className} style={flexStyle}>
            {children}
        </div>
    );
};

export default Flex;
