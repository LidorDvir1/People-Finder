import React, { useState, useCallback } from "react";
import { UserList } from "../../UI";
import * as S from "./style";
import Filters from "./Filters";

const HomeUserList = () => {
  const [countries, setCountries] = useState([]);
  const query = countries.length > 0 ? `nat=${countries.join(",")}` : "";

  const checkBoxChange = useCallback((country) => {
    setCountries((prev) => {
      const isCountryActive = prev.some((prevCountry) => prevCountry === country);

      if (isCountryActive) {
        return prev.filter((prevCountry) => prevCountry !== country);
      } else {
        return [...prev, country];
      }
    });
  }, []);

  return (
    <S.UserList>
      <Filters onChange={checkBoxChange} />
      <UserList query={query} />;
    </S.UserList>
  );
};

export default HomeUserList;
