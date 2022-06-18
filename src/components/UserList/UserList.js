import React, { useMemo, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import { usePeopleFetch } from "hooks";

const Loader = () => {
  console.log("render");
  return (
    <S.SpinnerWrapper>
      <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
    </S.SpinnerWrapper>
  );
};

const UserList = ({ query }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const { loading, error, users, onLoadMoreUsers } = usePeopleFetch(query);

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const countryCheckBoxChange = (country) => {
    setCountries((prev) => {
      const isCountryActive = prev.some((prevCountry) => prevCountry === country);

      if (isCountryActive) {
        return prev.filter((prevCountry) => prevCountry !== country);
      } else {
        return [...prev, country];
      }
    });
  };

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox value="BR" label="Brazil" onChange={countryCheckBoxChange} />
        <CheckBox value="AU" label="Australia" onChange={countryCheckBoxChange} />
        <CheckBox value="CA" label="Canada" onChange={countryCheckBoxChange} />
        <CheckBox value="DE" label="Germany" onChange={countryCheckBoxChange} />
      </S.Filters>
      <S.List>
        {users.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper isVisible={index === hoveredUserId}>
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {loading && <Loader />}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
