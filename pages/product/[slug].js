import React from 'react'
import { client , urlFor } from '../../lib/client'
import { useState } from 'react';
import { Product } from '../../Components';
import { AiOutlineMinus , AiOutlinePlus , AiFillStar , AiOutlineStar } from 'react-icons/ai';
import { useStateContext } from '../../context/StateContext';
const ProductDetails = ({product, products}) => {
 const { name, image, details, price } = product;
 const [index, setIndex] = useState(0);
 const {decQty , incQty , qty, onAdd, setShowCart}= useStateContext();
 const handleBuyNow = ()=> {
    onAdd(product, qty);
    setShowCart(true);
}
  return (
    <div>
      <div className='product-detail-container'>
        <div>
            <div className='image-container'>
                <img
                src={urlFor(image && image[index])
                }
                className='product-detail-image'
                alt={name}
                />
            </div>
             <div className='small-images-container'>
                {image?.map((item, i) => (
              <img 
                key={i}
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
            </div>
        </div>
        <div className='product-detail-desc'>
            <h1>{name}</h1>
            <div className='reviews'>
                <AiFillStar/>
                <AiFillStar/>
                <AiFillStar/>
                <AiFillStar/>
                <AiOutlineStar/>
            </div>
            <p>
              (20)
            </p>
        
        <h4>Details:</h4>
        <p>{details}</p>
        <p className='price'>${price}</p>
        <div className='quantity'>
            <h3>Quantity</h3>
            <p className='quantity-desc'>
                <span className='minus' onClick={decQty}><AiOutlineMinus/></span>
                <span className='num' >{qty}</span>
                <span className='plus' onClick={incQty}><AiOutlinePlus/></span>
            </p>
        </div>
        <div className='buttons'>
            <button className='add-to-cart' onClick={()=>onAdd(product,qty)}>Add to cart</button>
            <button className='buy-now' onClick={handleBuyNow}>Buy now</button>
        </div>
      </div>
    </div>
    <div className='may-like-products-wrapper'>
        <h2>You may also like</h2>
        <div className='marquee'>
            <div className='maylike-products-container track'>
                {products.map((item)=>(
                    <Product key={item._id}
                    product={item}/>
                ))}
            </div>
        </div>
    </div>
    </div>
  )
}
export const getStaticPaths = async () => {
    const query = `*[_type == "product"]{
        slug {
            current
        }
    }`;
    const products = await client.fetch(query);
  
    const paths = products.map((product) => ({
      params: { slug: product.slug.current }
    }));
  
    return {
      paths,
      fallback: 'blocking'
    };
  }
  export const getStaticProps = async ({params: {slug}}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
     const productsQuery = '*[_type == "product"]'
  
    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);

  console.log(product);

  return {
    props: { products, product }
  }
}

export default ProductDetails
