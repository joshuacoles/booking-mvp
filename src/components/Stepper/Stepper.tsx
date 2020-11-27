import * as React from "react";

import classes from "./Stepper.module.css";
import classNames from "classnames";
import { HTMLProps, useContext } from "react";

export function StepIcon(props: React.PropsWithChildren<any>) {
  return <div className={classNames(classes.stepIcon, props.className)} {...props}/>
}

interface StepProps extends HTMLProps<HTMLDivElement> {
  icon?: React.ReactNode | null
  children?: React.ReactNode

  className?: string
  iconClassName?: string
  lineClassName?: string
}

export function Step({ lineClassName, ...rest }: StepProps) {
  return (
    <>
      <StepItem {...rest} />
      <div className={classNames(classes.line, lineClassName)}/>
    </>
  );
}

function StepItem({ icon, iconClassName, className, children, ...rest }: Omit<StepProps, 'lineClassName'>) {
  const presentedIcon = icon
    ? <div className={classNames(classes.stepIcon, iconClassName)}><span>{icon}</span></div>
    : null;

  return (
    <div className={classNames(classes.step, className)} {...rest}>
      {presentedIcon}
      {children}
    </div>
  );
}

export function Stepper<StatusSet>({ children }: React.PropsWithChildren<any>) {
  return (
    <div className={classes.stepper}>
      {children}
    </div>
  );
}
