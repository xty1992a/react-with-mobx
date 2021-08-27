import React, { FC, useEffect } from "react";
import css from "styled-jsx/css";
import { useStores } from "@/hooks";

const styles = css`
  .user {
  }
`;

interface Props {
  [p: string]: any;
}

const User: FC<Props> = (props) => {
  const { user } = useStores();

  return (
    <div className="user">
      <div className="avatar">
        <img src={user.info?.avatar} alt="" />
      </div>
      <input
        type="file"
        onChange={(e) => {
          if (!user.info) return;
          const file = (e.target.files || [])[0];
          if (!file) return;
          URL.revokeObjectURL(user.info.avatar);
          const url = URL.createObjectURL(file);
          user.setUserInfo({ ...user.info, avatar: url });
        }}
      />

      <style jsx>{styles}</style>
    </div>
  );
};

export default User;
