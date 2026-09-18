const gallery = document.querySelector('#gallery');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const closeButton = document.querySelector('#close-lightbox');

for (let number = 1; number <= 111; number += 1) {
  const link = document.createElement('a');
  const image = document.createElement('img');
  const source = `./static/paintings/${number}.jpg`;

  link.href = source;
  image.src = source;
  image.alt = `Gallery image ${number}`;
  image.loading = 'lazy';
  link.append(image);
  link.addEventListener('click', (event) => {
    event.preventDefault();
    lightboxImage.src = source;
    lightboxImage.alt = image.alt;
    lightbox.showModal();
  });
  gallery.append(link);
}

closeButton.addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});
