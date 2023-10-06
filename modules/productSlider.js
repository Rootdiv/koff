export const productSlider = () => {
  Promise.all([import('swiper'), import('swiper/modules'), import('swiper/css')]).then(
    ([{ Swiper }, { Navigation, Thumbs }]) => {
      const swiperThumbnails = new Swiper('.product__slider-thumbnails', {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
      });

      new Swiper('.product__slider-main', {
        spaceBetween: 10,
        navigation: {
          nextEl: '.product__arrow_prev',
          prevEl: '.product__arrow_next',
        },
        modules: [Navigation, Thumbs],
        thumbs: {
          swiper: swiperThumbnails,
        },
      });
    },
  );
};
