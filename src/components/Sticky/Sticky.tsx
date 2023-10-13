import { ReactNode, HTMLAttributes } from 'react';
// import style from './Sticky.module.scss';

type StickyProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
    className?: string;
};

const Sticky = ({ children, className, ...rest }: StickyProps) => {
    const classes = [style.sticky, className].join(' ');
    return (
        <div className={classes} {...rest}>
            {children}
        </div>
    );
};

export default Sticky;
