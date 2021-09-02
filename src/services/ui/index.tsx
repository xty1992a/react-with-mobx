import React, { useEffect, useRef } from "react";
import { Modal, message, Spin } from "antd";
import { render, unmountComponentAtNode } from "react-dom";
import { ModalFuncProps } from "antd/lib/modal/Modal";
import classnames from "classnames";

class Toast {
  loadings: any[] = [];
  message = message;
  toast = message.error;
  clear = () => {
    message.destroy();
    this.loadings.forEach((c) => c());
  };
  loading = () => {
    console.log("loading");
    const { clear } = loading("加载中...");
    this.loadings.push(clear);
  };
}

export const toast = new Toast();

export function confirm(options: ModalFuncProps = {}): Promise<boolean> {
  return new Promise((resolve) => {
    Modal.confirm({
      ...options,
      onOk: resolve.bind(null, true),
      onCancel: resolve.bind(null, false),
      okText: "确认",
      cancelText: "取消",
    });
  });
}

interface LoadingProps {
  text: string;
  mask: boolean;
}

const Loading = ({ text, mask }: LoadingProps) => {
  return (
    <div
      className={classnames("loading center-box", {
        loading_mask: mask,
        "loading_no-mask": !mask,
      })}
    >
      <div className="loading-box">
        <Spin tip={text} size="large" />
      </div>

      <style jsx global>
        {`
          .loading_no-mask {
            .loading-box {
              .ant-spin {
                color: #fff;
                &-dot-item {
                  background-color: #fff;
                }
              }
            }
          }
        `}
      </style>
      <style jsx>
        {`
          .loading {
            position: fixed;
            bottom: 0;
            right: 0;
            top: 0;
            left: 0;
            z-index: 1000;
            &_mask {
              background-color: rgba(0, 0, 0, 0.5);
              .loading-box {
                background-color: #fff;
              }
            }
            &-box {
              background-color: rgba(0, 0, 0, 0.5);
              padding: 20px 10px 10px;
              border-radius: 4px;
            }
          }
        `}
      </style>
    </div>
  );
};

interface LoadingOptions {
  mountTo?: HTMLElement;
  mask?: boolean;
  text?: string;
  duration?: number;
}

const dftOptions = {
  mountTo: document.body,
  mask: true,
  text: "",
  duration: 0,
};

export function loading(options?: LoadingOptions | string) {
  const type = typeof options;
  let _options;
  if (type === "undefined") {
    _options = {};
  } else if (type === "string") {
    _options = { text: options as string };
  } else if (type === "object") {
    _options = options as LoadingOptions;
  }
  const { mountTo, text, mask, duration } = { ...dftOptions, ..._options };
  const div = document.createElement("div");

  mountTo.appendChild(div);
  render(<Loading mask={mask} text={text} />, div);

  const clear = () => {
    unmountComponentAtNode(div);
    div.remove();
  };

  if (duration > 0) {
    setTimeout(clear, duration);
  }

  return {
    clear,
  };
}

export const alert = Modal.warning;

type PromptProps = {
  value: string;
  onChange: (value: string) => void;
};

const PromptContent: React.FC<PromptProps> = (props) => {
  const { value, onChange } = props;
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!input.current) return;
    input.current.focus();

    setTimeout(() => {
      document.scrollingElement?.scrollTo({
        top: 100,
        left: 0,
        behavior: "smooth",
      });
    }, 200);
  }, []);

  return (
    <div>
      <input
        type="text"
        ref={input}
        defaultValue={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

interface PromptOptions {
  value: string;
  title?: string;
}
export const prompt = async (options: PromptOptions) => {
  const { title = "请输入", value } = options;
  const state = {
    value,
  };

  const onChange = (val: string) => {
    state.value = val;
  };

  const sure = await confirm({
    title,
    content: (
      <>
        <PromptContent onChange={onChange} value={value} />
      </>
    ),
  });

  if (!sure) return "";
  return state.value;
};
