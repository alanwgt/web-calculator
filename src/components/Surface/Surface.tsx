import classNames from '../../lib/classnames';

import './surface.style.css';

const Surface = ({ children, className = '', variant = false, ...props }) => (
    <div className={classNames('surface', className, { variant })} {...props}>
        {children}
    </div>
);

export default Surface;
