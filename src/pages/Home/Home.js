import React, { useState } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import * as S from "./style";

const HomeUsersList = () => {
  const [countries, setCountries] = useState([]);
  const countriesQuery = countries.length > 0 ? `nat=${countries.join(",")}` : "";

  return <UserList query={countriesQuery} />;
};

const Home = () => {
  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <HomeUsersList />
      </S.Content>
    </S.Home>
  );
};

export default Home;
