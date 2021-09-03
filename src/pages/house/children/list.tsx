import React, { FC } from "react";
import { Button } from "antd";
import Index from "@/components/base/Auth";
import { useStores } from "@/hooks";
import { observer } from "mobx-react-lite";
import { Table } from "antd";
import { rdm, fmtTime, ranger } from "@/utils";
import { Link } from "react-router-dom";
import { ColumnsType } from "antd/lib/table/interface";

type Item = {
  name: string;
  age: number;
  id: string;
  createTime: string;
};

const columns: ColumnsType<Item> = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    render: (text, record) => {
      return (
        <Link to={`/house/list/${record.id}`}>
          <div>{text}</div>
        </Link>
      );
    },
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "登记时间",
    dataIndex: "createTime",
    key: "createTime",
  },
];

const Home: FC = (props) => {
  const { app } = useStores();

  const list: Item[] = [...Array(10)].map((n, i) => {
    return {
      name: rdm(),
      age: ranger(5, 70),
      id: rdm(),
      createTime: fmtTime(Date.now()) as string,
    };
  });

  return (
    <div>
      <p>hello</p>
      <span>afd</span>
      <Button onClick={app.setCount}>{app.count}</Button>
      {/*不要这样做*/}
      <Button onClick={() => (app.count += 1)}>store之外的更改</Button>
      <Index required={["125"]} fallback>
        <Button>125权限才能看到</Button>
      </Index>

      <Table<Item> dataSource={list} rowKey="id" columns={columns} />
    </div>
  );
};

export default observer(Home);
