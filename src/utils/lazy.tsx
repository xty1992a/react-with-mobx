import React, { ComponentType, Suspense, ReactNode } from "react";
import { Spin } from "antd";

interface Options {
  fallback?: ReactNode;
  fallbackStyle?: React.CSSProperties;
}

function Fallback(fallbackStyle: React.CSSProperties = {}) {
  return (
    <div className="lazy-fallback" style={fallbackStyle}>
      <Spin size="default" />
      <style jsx>
        {`
          .lazy-fallback {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
          }
        `}
      </style>
    </div>
  );
}

const LazyComponent = (
  factory: () => Promise<{ default: ComponentType<any> }>,
  options?: Options
) => {
  const { fallback = Fallback(options?.fallbackStyle) } = options || {};

  const Comp = React.lazy(factory);

  return (props?: any) => (
    <Suspense fallback={fallback}>
      <Comp {...props} />
    </Suspense>
  );
};

export default LazyComponent;
