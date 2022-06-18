import React from "react";
import { Text } from "components/UI";
import * as S from "./style";
import { UserList } from "components/Home";

const Home = () => {
  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList />
      </S.Content>
    </S.Home>
  );
};

export default Home;
