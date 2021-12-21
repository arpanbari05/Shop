import React from "react";
import "./shop-card.css";

import close from "../../assets/close.svg";
import remove from "../../assets/delete.svg";
import open from "../../assets/open.svg";
import location from "../../assets/location.svg";
import shop from "../../assets/shop.svg";
import { modifyDate } from "../../utils";

const ShopCard = (props) => {
  return (
    <div className="shop-card">
      <img className="shop-card--image" src={shop} alt="logo" />
      <div className="shop-card--details">
        <h1 className="shop-card--name">
          {props.shopName}
          <div>
            <img className="shop-card--logo remove-logo" onClick={props.removeShop} src={remove} alt="logo" />
          </div>
        </h1>
        <p className="shop-card--category">
          {`Category: ${props.category}`}
        </p>
        <p className="shop-card--area">
          <img className="shop-card--logo" src={location} alt="logo" />
          {props.area}
        </p>
        <p className="shop-card--opening">
          <img className="shop-card--logo" src={open} alt="logo" />
          {`Opened at ${modifyDate(props.opening)}`}
        </p>
        <p className="shop-card--closing">
          <img className="shop-card--logo" src={close} alt="logo" />
          {`Closing at ${modifyDate(props.closing)}`}
        </p>
      </div>
    </div>
  );
};

export default ShopCard;
