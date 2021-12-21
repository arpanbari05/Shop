import React, { useState } from "react";
import "./filter.css";

import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button,
} from "@mui/material";
import { filterActions } from "../../redux/slice/filterSlice";
import { shopListActions } from "../../redux/slice/shopListSlice";
import { modelActions } from "../../redux/slice/modelSlice";
import { useSelector, useDispatch } from "react-redux";

import cancel from "../../assets/cancel.svg";

const areaList = [
  "Thane",
  "Pune",
  "Mumbai Suburban",
  "Nashik",
  "Ahmednagar",
  "Solapur",
];

const categoryList = ["Grocery", "Butcher", "Baker", "Chemist", "Stationary"];

const Filter = () => {
  const dispatch = useDispatch();

  const onAreaChange = (e) => {
    dispatch(filterActions.setArea(e.target.value));
  };
  const onCategoryChange = (e) => {
    dispatch(filterActions.setCatgory(e.target.value));
  };
  const onOpeningChange = (e) => {
    dispatch(filterActions.setOpening(e.target.value));
  };
  const onClosingChange = (e) => {
    dispatch(filterActions.setClosing(e.target.value));
  };

  const shopList = useSelector((state) => state.shopList.shopList);
  const filters = useSelector((state) => state.filter);
  const model = useSelector((state) => state.model);

  const replaceShopList = () => {
    const shop = [...shopList];

    const filteredList = shop
      .filter((shop) => {
        if (filters.area !== "") {
          console.log(filters.area, shop.area);
          return filters.area === shop.area;
        } else return true;
      })
      .filter((shop) => {
        if (filters.category !== "") {
          return filters.category === shop.category;
        } else return true;
      })
      .filter((shop) => {
        if (filters.opening !== "") {
          return filters.opening >= shop.opening;
        } else return true;
      })
      .filter((shop) => {
        if (filters.closing !== "") {
          return filters.closing <= shop.closing;
        } else return true;
      });

    dispatch(shopListActions.replaceShopList(filteredList));
    hideFilter();
  };

  const removeFilters = () => {
    dispatch(filterActions.setArea(""));
    dispatch(filterActions.setCatgory(""));
    dispatch(filterActions.setOpening(""));
    dispatch(filterActions.setClosing(""));
    dispatch(shopListActions.replaceShopList(shopList));
    hideFilter();
  };
  const filterClass = ["filter"];
  const backdropClass = ["backdrop"];
  if (!model.showFilter) {
    filterClass.push("hide");
    backdropClass.push("hide-backdrop");
  }

  const hideFilter = () => {
    dispatch(modelActions.setFilter(false));
  };

  return (
    <>
      <div className={backdropClass.join(" ")} onClick={hideFilter}></div>
      <div className={filterClass.join(" ")}>
        <h3>Filters
          <img className="only-mobile-icon" src={cancel} alt="log" onClick={hideFilter}/>
        </h3>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Area</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={filters.area}
            id="demo-simple-select"
            className="filter-input"
            label="Area"
            onChange={onAreaChange}
          >
            {areaList.map((area) => (
              <MenuItem value={area}>{area}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={filters.category}
            id="demo-simple-select"
            className="filter-input"
            label="Category"
            onChange={onCategoryChange}
          >
            {categoryList.map((category) => (
              <MenuItem value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          value={filters.opening}
          className="filter-input"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          type="date"
          label="Opening date"
          onChange={onOpeningChange}
        />

        <TextField
          fullWidth
          value={filters.closing}
          className="filter-input"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          type="date"
          label="Closing Date"
          onChange={onClosingChange}
        />
        <Button
          size="large"
          className="filter-button"
          variant="contained"
          onClick={replaceShopList}
        >
          Apply
        </Button>
        <Button
          size="large"
          className="filter-button"
          variant="outlined"
          onClick={removeFilters}
        >
          Remove
        </Button>
      </div>
    </>
  );
};

export default Filter;
