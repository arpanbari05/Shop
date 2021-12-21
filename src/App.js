import "./App.css";
import Form from "./component/create-shop-form/form";
import { useDispatch, useSelector } from "react-redux";
import ShopCard from "./component/shop-card/shop-card";
import Filter from "./component/filter/filter";
import { shopListActions } from "./redux/slice/shopListSlice";
import { modelActions } from "./redux/slice/modelSlice";
import { Button } from "@mui/material";

function App() {
  const dispatch = useDispatch();
  const shopList = useSelector((state) => state.shopList.filteredList);

  const onRemoveHandler = (id) => {
    dispatch(shopListActions.removeShop(id));
  };

  const filterClick = () => {
    dispatch(modelActions.setFilter(true));
  };
  const formClick = () => {
    dispatch(modelActions.setForm(true));
  };

  return (
    <div className="App">
      <header className="only-mobile-header">
        <Button
          style={{ width: "auto !important", color: "#000 !important" }}
          onClick={filterClick}
        >
          Filter
        </Button>
        <Button
          variant="outlined"
          style={{ width: "auto !important" }}
          onClick={formClick}
        >
          Create shop
        </Button>
      </header>
      <Filter />
      <div className="flex-container">
        <div className="shop-container">
          {shopList.length === 0 ? (
            <p className="notice">No shop found!</p>
          ) : (
            <>
              <h1 style={{margin: "20px 0", color: "#1976d2"}}>Shop List</h1>
              {shopList.map((shop) => (
                <ShopCard
                  shopName={shop.name}
                  area={shop.area}
                  category={shop.category}
                  opening={shop.opening}
                  closing={shop.closing}
                  removeShop={() => onRemoveHandler(shop.id)}
                />
              )).reverse()}
            </>
          )}
        </div>
        <Form />
      </div>
    </div>
  );
}

export default App;
