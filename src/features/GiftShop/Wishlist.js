import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar } from '../../app/AppBars/AppBar';
import { BackButton } from '../../app/Buttons/BackButton';
import { HelpButton } from '../../app/Buttons/HelpButton';
import { MainContainer } from '../../app/Containers/MainContainer';
import { SlideUpCSS } from '../../app/CSSTransitions/SlideUpCSS';
import { BigIconWithText } from '../../app/Headings/BigIconWithText';
import { StatusBarControls } from './StatusBar/StatusBarControls';
import wishlist from '../../images/wishlist.svg';
import { Body } from '../../app/Containers/Body';
import { Empty } from '../../app/Misc/Empty';
import { useSelector } from 'react-redux';
import BottomSheet from '../../app/Containers/BottomSheet';
import { Gallery, GalleryItem } from '../../app/Containers/Gallery';
import { GiftShopItem } from './GiftShopItem';
import { StatusBar } from '../../app/AppBars/StatusBar';

export const Wishlist = () => {
  const history = useHistory();
  const items = useSelector((state) => state.wishlist.items);
  const itemCount = items.length;
  return (
    <>
      <AppBar
        left={<BackButton action={() => history.push('/giftshop')} />}
        right={<HelpButton />}
      />
      <MainContainer>
        <SlideUpCSS>
          <Body>
            <BigIconWithText
              image={wishlist}
              imgAlt="A paper list with a heart shape in the middle"
              text="Wishlist"
            />
            {itemCount ? (
              <BottomSheet
                title={
                  itemCount === 1 ? `${itemCount} item` : `${itemCount} items`
                }
              >
                <Gallery>
                  {items.map((item) => (
                    <GalleryItem key={item.id}>
                      <GiftShopItem
                        id={item.item_id}
                        name={item.name}
                        image={item.image}
                        price={item.price}
                        description={item.description}
                      />
                    </GalleryItem>
                  ))}
                </Gallery>
              </BottomSheet>
            ) : (
              <Empty info="Save items here that you want to get later" />
            )}
          </Body>
        </SlideUpCSS>
      </MainContainer>
      <StatusBar>
        <StatusBarControls />
      </StatusBar>
    </>
  );
};
