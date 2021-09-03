import React, { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Table } from "antd";
import { rdm, fmtTime, ranger, sleep } from "@/utils";
import { Link } from "react-router-dom";
import { ColumnsType } from "antd/lib/table/interface";

function fetchList(params: {
  pageIndex: number;
  pageSize: number;
  [p: string]: any;
}) {
  return {
    data: {
      list: [...Array(params.pageSize)].map((n, i) => {
        return {
          name: rdm(),
          age: ranger(5, 70),
          id: rdm(),
          createTime: fmtTime(Date.now()) as string,
        };
      }),
      total: 100,
    },
    success: true,
  };
}

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

const List: FC = (props) => {
  const [query, setQuery] = useState({
    pageIndex: 1,
    pageSize: 10,
    keywords: "",
  });
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [list, setList] = useState<Item[]>([]);

  const getList = async (query: any) => {
    setLoading(true);
    await sleep(300);
    const result = fetchList(query);
    setLoading(false);
    if (!result.success) return;
    setList(result.data.list);
    setTotal(result.data.total);
  };

  useEffect(() => {
    getList(query);
  }, [query]);

  return (
    <div>
      <Table<Item>
        dataSource={list}
        rowKey="id"
        columns={columns}
        loading={loading}
        pagination={{
          total,
          current: query.pageIndex,
          onChange: (index: number, size?: number) => {
            setQuery((old) => ({
              ...old,
              pageIndex: index,
              pageSize: size || old.pageSize,
            }));
          },
        }}
      />
    </div>
  );
};

export default observer(List);
