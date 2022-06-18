import React from "react";
import CheckBox from "./CheckBox";
import * as S from "./style";

const Filters = React.memo(({ onChange }) => {
  return (
    <S.Filters>
      <CheckBox value="BR" label="Brazil" onChange={onChange} />
      <CheckBox value="AU" label="Australia" onChange={onChange} />
      <CheckBox value="CA" label="Canada" onChange={onChange} />
      <CheckBox value="DE" label="Germany" onChange={onChange} />
    </S.Filters>
  );
});

export default Filters;
