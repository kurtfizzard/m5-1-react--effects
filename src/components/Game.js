import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import cookieSrc from "../cookie.svg";
import Item from "./Item";
import useInterval from "../hooks/use-interval.hook";
import useKeyDown from "../hooks/use-keydown.hook";
import useDocumentTitle from "../hooks/use-document-title.hook";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
  { id: "megaCursor", name: "Mega Cursor", cost: 500, value: 5 },
];

const Game = () => {
  // TODO: Replace this with React state!
  let [numCookies, setNumCookies] = useState(2000);
  let [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
    megaCursor: 0,
  });

  function handleCookieClick(event) {
    setNumCookies((numCookies) => {
      if (purchasedItems.megaCursor > 0) {
        return numCookies + purchasedItems.megaCursor * 5;
      }
      return numCookies + 1;
    });
  }

  function handleItemClick(item) {
    if (numCookies >= item.cost) {
      // increment the cost upon purchase
      item.cost = Math.round(item.cost + (10 / 100) * item.cost);
      setPurchasedItems((purchasedItems) => {
        return {
          ...purchasedItems,
          [item.id]: purchasedItems[item.id] + 1,
        };
      });
      setNumCookies((numCookies) => {
        return numCookies - item.cost;
      });
    } else {
      return window.alert("You don't have enough cookies!");
    }
  }

  function calculateCookiesPerTick(obj) {
    const filteredArray = Object.keys(obj).filter(
      (item) => item !== "megaCursor"
    );
    return filteredArray.reduce((acc, itemId) => {
      // return Object.keys(obj).reduce((acc, itemId) => {
      let itemsOwned = obj[itemId];
      let currentItem = items.find((item) => item.id === itemId);
      return acc + itemsOwned * currentItem.value;
    }, 0);
  }

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    // Add this number of cookies to the total
    setNumCookies((numCookies) => {
      return numCookies + numOfGeneratedCookies;
    });
  }, 1000);

  // add event listener that modifies the document title to reflect the number of cookies you have
  useDocumentTitle(
    `${numCookies} cookies - Cookie Clicker Workshop`,
    "Cookie Clicker Workshop"
  );

  // add event listener for space bar
  useKeyDown("Space", handleCookieClick);

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>{calculateCookiesPerTick(purchasedItems)}</strong> cookies per
          second
          {/* and <strong> {purchasedItems.megaCursor * 5}</strong> cookies per click */}
        </Indicator>
        <Button>
          <Cookie src={cookieSrc} onClick={handleCookieClick} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {/* TODO: Add <Item> instances here, 1 for each item type. */}
        {items.map((item, index) => {
          return (
            <Item
              item={item}
              index={index}
              purchasedItems={purchasedItems}
              handleItemClick={handleItemClick}
            />
          );
        })}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
