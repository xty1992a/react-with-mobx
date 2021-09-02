import { HTMLAttributes } from "react";
import classNames from "classnames";

interface Props extends HTMLAttributes<HTMLOrSVGElement> {
  icon: string;
}

export default function Icon({ icon, className, ...props }: Props) {
  return (
    <svg {...props} className={classNames("svg-icon", className)} aria-hidden>
      <use xlinkHref={`#${icon}`} />
      <style jsx>
        {`
          .svg-icon {
            width: 1em;
            height: 1em;
            fill: currentColor;
            overflow: hidden;
            vertical-align: middle;
          }
        `}
      </style>
    </svg>
  );
}
