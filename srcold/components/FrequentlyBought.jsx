import React,{useState,useEffect} from "react";

const FrequentlyBought = ({ product, productLoader, settings }) => {
  const [totalAmount, setTotalAmount] = useState(0)
  const [totalSaveAmount, setTotalSaveAmount] = useState(0);
  const [totalProduct, setTotalProducts] = useState(0);
  const [ids, setIds] = useState([]);
  const [loader, setLoader] = useState(false);
  const { triggerUpdateCart } = useCart();
  const { incrementCartItems } = useLocalCartCount();

  const notify = (text) => {
    toast.dismiss();
    toast(<span className="line-clamp-2">{`${text} has been added to your cart`}</span>)
  };

  const handlerFormSubmit = async () => {
    const authToken = localStorage.getItem("authToken");
    setLoader(true);
    if (ids.length > 0 && authToken) {
      const products = ids.map((id) => ({ product_id: id, quantity: 1 }))
      const result = {
        products: products
      };
      try {
        setLoader(true);
        const response = await apiClient.post(`/cart/multiple"`, result);
        triggerUpdateCart();

      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoader(false);
      }
    }
    else {
      setTimeout(() => {
        setLoader(false);
      }, 500)
      ids.forEach(element => {
        let cartItems = localStorage.getItem("CartItems");
        if (cartItems) {
          let itemsArray = JSON.parse(cartItems);
          itemsArray.push({ productId: element, quantity: 1 });
          localStorage.setItem("CartItems", JSON.stringify(itemsArray));
          incrementCartItems(1);
          triggerUpdateCart();
        }
        else {
          localStorage.setItem("CartItems", JSON.stringify([{ productId: element, quantity: 1 }]));
          incrementCartItems(1);
          triggerUpdateCart();
        }


      });
    }
    notify(`${ids.length} Products`)
  }

  return (
    <React.Fragment>
      {product.frequently_bought_together && product.frequently_bought_together.length === 3 ? <div className='col-span-10 border border-[#E2E8F0] rounded-md py-5 px-4'>
        {!productLoader ? <h2 className='text-lg  text-black-100 font-bold'>Frequently bought together</h2> : <Skeleton height={"40px"} width={"20%"} />}
        <div className='grid grid-cols-4 gap-8'>
          {product.frequently_bought_together ? product.frequently_bought_together.map((prod, index) => {
            return (
              <RenderingBought key={index} setTotalProducts={setTotalProducts} prod={prod} index={index} settings={settings} setTotalAmount={setTotalAmount} setTotalSaveAmount={setTotalSaveAmount} setIds={setIds} />
            )
          }) :
            <React.Fragment>
              <div className="col-span-1 mt-3">
                <Skeleton className='w-full h-[350px]' />
              </div>

              <div className="col-span-1 mt-3">
                <Skeleton className='w-full h-[350px]' />
              </div>

              <div className="col-span-1 mt-3">
                <Skeleton className='w-full h-[350px]' />
              </div>
            </React.Fragment>}
          {!productLoader ? <div className='col-span-1'>
            <div className='flex flex-col h-full items-center justify-center '>
              {totalAmount > 0 ?
                <React.Fragment>
                  <h3 className='text-primary font-bold text-base'><span className=''>{product.currency_title} </span><span className='text-2xl'>{String(totalAmount).split(".")[0]}.</span>
                    <span>{String(totalAmount).split(".")[1] ? String(totalAmount).split(".")[1] : "00"}</span></h3>
                  <h4 className='text-[#64748B] line-through text-sm'>{product.currency_title} {String(totalSaveAmount).split(".")[0]}.<span>{String(totalAmount).split(".")[1] ? String(totalAmount).split(".")[1] : "00"}</span></h4>
                </React.Fragment>
                : null}
              <button className='text-base text-primary font-semibold px-4 py-2 rounded-[4px] border border-primary' style={{ opacity: `${loader || !totalProduct ? "0.5" : ""}` }} disabled={loader || !totalProduct} onClick={() => handlerFormSubmit()}>{!loader ? "Add" : "Adding"} {totalProduct} Items To Cart</button>
            </div>
          </div> : <Skeleton className='w-full h-[350px] mt-3' />}
        </div>
      </div> : null}
    </React.Fragment>
  )
}