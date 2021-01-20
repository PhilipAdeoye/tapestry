import React from 'react';
import { MdFavoriteBorder, MdHistory } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppBar } from '../../app/AppBars/AppBar';
import { DisclosureButtonGroup } from '../../app/Buttons/DisclosureButtonGroup';
import { HelpButton } from '../../app/Buttons/HelpButton';
import { BackButton } from '../../app/Buttons/BackButton';
import { Gallery, GalleryItem } from '../../app/Containers/Gallery';
import { MainContainer } from '../../app/Containers/MainContainer';
import { SlideUpCSS } from '../../app/CSSTransitions/SlideUpCSS';
import { BigIconWithText } from '../../app/Headings/BigIconWithText';
import { MinorHeading } from '../../app/Headings/MinorHeading';
import { Badge } from '../../app/Misc/Badge';
import storefront from '../../images/giftshop_storefront.svg';
import { StatusBarControls } from './StatusBar/StatusBarControls';
import { GiftShopItem } from './GiftShopItem';
import { Body } from '../../app/Containers/Body';
import { StatusBar } from '../../app/AppBars/StatusBar';

export const GiftShop = () => {
  const history = useHistory();
  // const wishlistItems = useSelector((state) => state.wishlist.items.length);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const items = useSelector((state) => state.giftShop.items);

  return (
    <>
      <AppBar
        left={<BackButton action={() => history.push('/rewards')} />}
        right={<HelpButton />}
      />
      <MainContainer>
        <SlideUpCSS>
          <Body>
            <BigIconWithText
              image={storefront}
              imgAlt="Store front"
              text="Gift Shop"
            />
            <DisclosureButtonGroup
              items={[
                {
                  icon: <MdHistory />,
                  text: 'View Order History',
                  action: () => history.push('/giftshop/order_history'),
                },
                {
                  icon: <MdFavoriteBorder />,
                  text: 'View Wishlist',
                  extraContent:
                    wishlistCount > 0 ? (
                      <Badge text={wishlistCount} />
                    ) : undefined,
                  action: () => history.push('/giftshop/wishlist'),
                },
              ]}
            />
            <div style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
              <MinorHeading text="Items in Stock" />
            </div>
            <Gallery>
              {items &&
                items.map((item) => (
                  <GalleryItem key={item.id}>
                    <GiftShopItem
                      id={item.id}
                      name={item.name}
                      image={item.image}
                      price={item.price}
                      description={item.description}
                    />
                  </GalleryItem>
                ))}
            </Gallery>
            <div style={{ height: '6rem' }}></div>
          </Body>
        </SlideUpCSS>
      </MainContainer>
      <StatusBar>
        <StatusBarControls />
      </StatusBar>
    </>
  );
};
