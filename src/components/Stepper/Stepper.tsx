import * as React from "react";

import classNames from "classnames";
import classes from "./Stepper.module.css";

interface StepProps extends React.HTMLProps<HTMLDivElement> {
  icon?: React.ReactNode | null
  children?: React.ReactNode

  statusClassName?: string

  stepClassName?: string
  iconClassName?: string
  lineClassName?: string
}

export function Step({ lineClassName, statusClassName, ...rest }: StepProps) {
  return (
    <>
      <StepItem statusClassName={statusClassName} {...rest} />
      <div className={classNames(classes.line, statusClassName, lineClassName)}/>
    </>
  );
}

function StepItem({ icon, iconClassName, stepClassName, statusClassName, children, ...rest }: Omit<StepProps, 'lineClassName'>) {
  const presentedIcon = icon
    ? <div className={classNames(classes.stepIcon, iconClassName)}><span>{icon}</span></div>
    : null;

  return (
    <div className={classNames(classes.step, statusClassName, stepClassName)} {...rest}>
      {presentedIcon}
      {children}
    </div>
  );
}

export const Stepper = React.forwardRef<any, React.PropsWithChildren<any>>(({ children }: React.PropsWithChildren<any>, ref) => (
  <div className={classes.stepper} ref={ref}>
    {children}
  </div>
));
