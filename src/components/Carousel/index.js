import React from 'react';
import Carousel, {
  Pagination as RPagination,
} from 'react-native-snap-carousel';

const RCarousel = React.forwardRef((props, fRef) => (
  <Carousel ref={fRef} {...props} />
));

export const Pagination = RPagination;

export default RCarousel;
