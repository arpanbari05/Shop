import React, { useState } from "react";
import "./form.css";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { shopListActions } from "../../redux/slice/shopListSlice";
import { modelActions } from "../../redux/slice/modelSlice";
import validator from "validator";
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

const Form = () => {
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState("");
  const [opening, setOpening] = useState("");
  const [closing, setClosing] = useState("");
  const [error, setError] = useState({
    name: { error: false, message: null },
    area: { error: false, message: null },
    category: { error: false, message: null },
    opening: { error: false, message: null },
    closing: { error: false, message: null },
  });
  const dispatch = useDispatch();

  const model = useSelector((state) => state.model);

  const validation = () => {
    const pattern = /[0-9&_\.-]/;
    // if (qry.match(pattern)) {
    //   alert("invalid");
    // } else {
    //   alert("valid");
    // }

    const isName =
      !name.match(pattern) && name !== "";
    const isArea = area !== "";
    const isCategory = category !== "";
    const isOpening = validator.isDate(opening);
    const isClosing = validator.isDate(closing) && closing > opening;
    const isNameMessage =
      name === ""
        ? "This field is required"
        : name.match(pattern)
        ? "Name must only contained alphabets"
        : null;
    const isAreaMessage = area === "" ? "This field is required" : null;
    const isCategoryMessage = category === "" ? "This field is required" : null;
    const isOpeningMessage = !validator.isDate(opening)
      ? "Provide a valid date"
      : null;
    const isClosingMessage =
      closing < opening || closing === opening
        ? "Closing date should be bigger than opening date"
        : !validator.isDate(closing)
        ? "Please provide a valid closing date"
        : null;

    setError({
      name: { error: !isName, message: isNameMessage },
      area: { error: !isArea, message: isAreaMessage },
      category: { error: !isCategory, message: isCategoryMessage },
      opening: { error: !isOpening, message: isOpeningMessage },
      closing: { error: !isClosing, message: isClosingMessage },
    });

    return isName && isArea && isCategory && isClosing & isOpening;
  };

  const onCreateHandler = () => {
    if (validation()) {
      const currentTimeStamp = Date.now();
      const shop = {
        id: currentTimeStamp,
        name,
        area,
        category,
        opening,
        closing,
      };
      dispatch(shopListActions.addShop(shop));
      resetInputs();
      hideForm();
    }
  };

  const resetInputs = () => {
    setName("");
    setArea("");
    setCategory("");
    setOpening("");
    setClosing("");
  };

  const formClass = ["create-shop"];
  const backdropClass = ["backdrop"];
  if (!model.showForm) {
    formClass.push("hide-form");
    backdropClass.push("hide-backdrop");
  }

  const hideForm = () => {
    dispatch(modelActions.setForm(false));
  };

  return (
    <>
      <div className={backdropClass.join(" ")} onClick={hideForm}></div>
      <div className={formClass.join(" ")}>
        <h3>
          Create shop
          <img
            src={cancel}
            className="only-mobile-icon"
            alt="logo"
            onClick={hideForm}
          />
        </h3>
        <TextField
          fullWidth
          value={name}
          variant="outlined"
          type="text"
          label="Name (eg. Kumar Sons Bakery)"
          onChange={(e) => setName(e.target.value)}
          error={error.name.error}
          helperText={error.name.error ? error.name.message : null}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Area</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          >
            {areaList.map((area) => (
              <MenuItem value={area}>{area}</MenuItem>
            ))}
          </Select>
          {error.area.error && (
            <Typography color="error" variant="caption">
              {error.area.message}
            </Typography>
          )}
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={category}
            id="demo-simple-select"
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {categoryList.map((cat) => (
              <MenuItem value={cat}>{cat}</MenuItem>
            ))}
          </Select>
          {error.category.error && (
            <Typography color="error" variant="caption">
              {error.category.message}
            </Typography>
          )}
        </FormControl>

        <div className="flex-input">
          <TextField
            fullWidth
            value={opening}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            type="date"
            label="Opening Date"
            onChange={(e) => setOpening(e.target.value)}
            error={error.opening.error}
            helperText={error.opening.error ? error.opening.message : null}
          />
          <TextField
            fullWidth
            value={closing}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            type="date"
            label="Closing Date"
            onChange={(e) => setClosing(e.target.value)}
            error={error.closing.error}
            helperText={error.closing.error ? error.closing.message : null}
          />
        </div>

        <Button size={"large"} variant="contained" onClick={onCreateHandler}>
          Create
        </Button>
      </div>
    </>
  );
};

export default Form;
