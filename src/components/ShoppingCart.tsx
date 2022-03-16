import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Button, ButtonGroup, Container, Typography } from "@mui/material";
import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContextProvider";

function ShoppingCart() {
  const {
    cart,
    sumCartAmount,
    sumProductPrice,
    onAddQuantity,
    onReduceQuantity,
    removeFromCart,
    numWithSpaces,
  } = useCart();

  return (
    <Container
      sx={{
        padding: "1rem",
      }}
    >
      <Typography
        sx={{
          textTransform: "uppercase",
          fontFamily: "Prata",
          mt: "1rem",
          mb: "1rem",
        }}
        variant="h5"
      >
        1. Shopping Cart
      </Typography>
      <Container
        sx={{
          backgroundColor: "#F3F2F0",
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          margin: "auto",
        }}
      >
        {cart.map((product) => (
          <Box
            sx={{
              fontFamily: "Prata",
              textAlign: "center",
              display: "flex",
              padding: ".8rem 2rem",
            }}
            key={product.id}
          >
            <img style={imageStyle} src={product.image} alt={product.title} />
            <Box
              key={product.id}
              sx={{
                width: "82%",
                display: "flex",
                justifyContent: "space-between",
                margin: "auto",
              }}
            >
              <Box>
                <Link
                  style={{ color: "black", textDecoration: "none" }}
                  to={`/detail/${product.id}`}
                >
                  <Typography variant="inherit" align="left" m="1rem">
                    {product.title}
                  </Typography>
                </Link>
                <ButtonGroup>
                  <Button
                    sx={{
                      "&:hover": {
                        color: "#828282",
                        border: "none",
                      },
                      height: "1.5rem",
                      width: ".5rem",
                      border: "none",
                      color: "black",
                      m: "auto",
                    }}
                    aria-label="reduce"
                    onClick={() => onReduceQuantity(product)}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <Typography
                    variant="body2"
                    sx={{ background: "white", padding: ".2rem .8rem" }}
                  >
                    {product.quantity}
                  </Typography>
                  <Button
                    sx={{
                      "&:hover": {
                        color: "#828282",
                        border: "none",
                      },
                      height: "1.5rem",
                      width: ".5rem",
                      border: "none",
                      color: "black",
                      m: "auto",
                    }}
                    aria-label="reduce"
                    onClick={() => onAddQuantity(product)}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
              </Box>
              {/* <p style={textStyle}>Unit Price: {product.price}</p> */}
              <Typography
                variant="inherit"
                sx={{
                  display: "flex",
                  placeItems: "center",
                }}
              >
                {numWithSpaces(sumProductPrice(product))} SEK
              </Typography>
            </Box>
            <ClearIcon
              fontSize="small"
              sx={{
                "&:hover": {
                  color: "#828282",
                  border: "none",
                },
                border: "none",
                color: "black",
                cursor: "pointer",
              }}
              onClick={() => removeFromCart(product)}
            >
              Delete
            </ClearIcon>
          </Box>
        ))}
        <Box
          sx={{
            borderTop: "1px solid #AAAAAA",
            width: "80%",
            margin: "1.5rem auto",
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            m: "1rem 2rem",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Prata",
              width: "800px",
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
            }}
          >
            Total
          </Typography>
          <Typography
            sx={{
              fontFamily: "Prata",
              width: "800px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: "1rem",
            }}
          >
            {numWithSpaces(sumCartAmount())} SEK
          </Typography>
        </Box>
      </Container>
    </Container>
  );
}

const imageStyle: CSSProperties = {
  width: "80px",
};

export default ShoppingCart;
