import React from "react";
import styled from "styled-components";

const Item = ({ item, index, purchasedItems, handleItemClick }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (index === 0) {
      ref.current.focus();
    }
  }, []);
  const { id, name, cost, value } = item;

  const isMegaCursor = id === "megaCursor";

  return (
    <Wrapper
      onClick={(event) => {
        handleItemClick(item);
      }}
      ref={ref}
    >
      <TextSection>
        <ItemName>{name}</ItemName>
        {!isMegaCursor ? (
          <ItemInfo>
            Cost: {cost}. Produces {value} cookies per second.
          </ItemInfo>
        ) : (
          <ItemInfo>
            Cost: {cost}. Produces {value} cookies per click per purchase.
          </ItemInfo>
        )}
      </TextSection>
      <ItemCount>{purchasedItems[id]}</ItemCount>
    </Wrapper>
  );
};

export default Item;

const Wrapper = styled.button`
  all: unset;
  border-bottom: 2px solid grey;
  cursor: pointer;
  display: flex;
  padding: 10px;
  width: 400px;

  &:focus {
    border: 2px solid white;
  }
`;

const TextSection = styled.div`
  width: 90%;
`;

const ItemName = styled.p`
  font-size: 20px;
`;

const ItemInfo = styled.p`
  color: grey;
  font-size: 15px;
`;

const ItemCount = styled.p`
  font-size: 35px;
  width: 10%;
`;
