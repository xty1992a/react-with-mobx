import React, {
  FC,
  InputHTMLAttributes,
  useMemo,
  useRef,
  useState,
} from "react";
import css from "styled-jsx/css";
import { Button } from "antd";
import * as ui from "@/services/ui";
import { useStores } from "@/hooks";
import { observer } from "mobx-react-lite";
import classnames from "classnames";
import FakeInput from "@/components/fun/FakeInput";
const styles = css`
  .about {
    input {
      border: 1px solid #e5e5e5;
    }
  }
`;

interface Props {
  [p: string]: any;
}

const About: FC<Props> = (props) => {
  const { app } = useStores();
  const [value, setValue] = useState("");

  return (
    <div className="about">
      <div className="box">
        <p>hello</p>
      </div>
      <Button
        onClick={() => {
          app.setCount();
        }}
      >
        {app.count}
      </Button>

      <Button
        loading={app.loading}
        onClick={async () => {
          const data = await app.asyncSetCount();
          console.log(data);
        }}
      >
        异步
        {app.count}
      </Button>

      <div>
        <Button
          onClick={() =>
            ui.loading({ mask: false, text: "加载中...", duration: 1000 })
          }
        >
          loading
        </Button>
      </div>

      <FakeInput
        type="text"
        value={value}
        onInput={(e: any) => {
          setValue(e.target.value);
        }}
      />
      <input
        type="text"
        value={value}
        onInput={(e: any) => {
          setValue(e.target.value);
        }}
      />

      <style jsx>{styles}</style>
    </div>
  );
};

export default observer(About);
