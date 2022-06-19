import React, { useCallback, useEffect, useState } from "react";
import Text from "components/UI/Text";
import Spinner from "components/UI/Spinner";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import { usePeopleFetch, useIntersection } from "hooks";
import { useRef } from "react";

const SingleUserContent = React.memo(({ user }) => {
  return (
    <>
      <S.UserPicture src={user?.picture.large} alt="user image" />
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
    </>
  );
});

const SingleUser = React.memo(({ user }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  return (
    <S.User onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <SingleUserContent user={user} />
      <S.IconButtonWrapper isVisible={isHovering}>
        <IconButton>
          <FavoriteIcon color="error" />
        </IconButton>
      </S.IconButtonWrapper>
    </S.User>
  );
});

const Loader = ({ loading, onLoadMoreUsers }) => {
  const ref = useRef();
  const inViewport = useIntersection(ref, "0px");

  useEffect(() => {
    if (!loading && inViewport) onLoadMoreUsers();
  }, [inViewport]);

  return (
    <S.SpinnerWrapper ref={ref}>
      <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
    </S.SpinnerWrapper>
  );
};

const UserList = ({ query }) => {
  const { loading, error, users, onLoadMoreUsers } = usePeopleFetch(query);

  return (
    <S.List>
      {users.map((user, index) => {
        return <SingleUser user={user} key={index} />;
      })}
      <Loader loading={loading} onLoadMoreUsers={onLoadMoreUsers} />
    </S.List>
  );
};

export default UserList;
