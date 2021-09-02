import React, {
  FC,
  InputHTMLAttributes,
  useMemo,
  useRef,
  useState,
} from "react";
import classnames from "classnames";

interface InputProps extends InputHTMLAttributes<any> {}
const FakeInput: FC<InputProps> = ({ className, onClick, ...props }) => {
  const [index, setIndex] = useState(0);

  const snap = useRef("");

  const values = useMemo(() => {
    return ((props.value || "") + "").split("");
  }, [props.value]);
  const current = useMemo(() => {
    const offset = values.length - snap.current.length;
    return index + offset;
  }, [index, values]);

  const before = useMemo(() => {
    return values.slice(0, current);
  }, [values, current]);

  const after = useMemo(() => {
    return values.slice(current);
  }, [values, current]);

  return (
    <div className="input-wrap" onClick={(e) => {}}>
      <input
        {...props}
        onClick={(e: any) => {
          setIndex(e.target.selectionStart);
          snap.current = e.target.value + "";
          onClick && onClick(e);
        }}
        className={classnames(className, "full")}
      />
      <div className="full fake">
        <div className="fake-content">
          <div className="fake-inner">
            {before.map((k, i) => (
              <span key={k + i}>{k}</span>
            ))}
            <span className="blink" />
            {after.map((k, i) => (
              <span key={k + i}>{k}</span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .input-wrap {
            overflow: hidden;
            height: 30px;
            width: 200px;
            border: 1px solid #e5e5e5;
            position: relative;

            .full {
              position: absolute;
              bottom: 0;
              right: 0;
              top: 0;
              left: 0;
            }

            input {
              padding: 0;
              width: 100%;
              text-align: left;
              background-color: transparent;
              color: transparent;
              &:focus {
                & + .fake {
                  .blink {
                    &:after {
                      opacity: 1;
                    }
                  }
                }
              }
            }

            .blink {
              width: 0;
              position: relative;
              &:after {
                height: 1em;
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                opacity: 0;
                content: "";
                border-right: 1px solid #333;
                box-sizing: border-box;
                animation: blink 1s infinite;
              }
            }

            .fake {
              display: flex;
              align-items: center;
              touch-action: none;
              pointer-events: none;
              background-color: #fff;

              .fake-content {
                max-width: 100%;
                display: inline-flex;
                justify-content: flex-end;
              }
              .fake-inner {
                white-space: nowrap;
              }
            }
          }

          @keyframes blink {
            50% {
              border-color: #333;
            }
            51% {
              border-color: transparent;
            }
            100% {
              border-color: transparent;
            }
          }
        `}
      </style>
    </div>
  );
};

export default FakeInput;
