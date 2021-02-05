const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
// Unsplash API
const count = 30;
const apiKey = '79pk6kqHwpIKHsF7_4zdQZ561jOpGsxL4_NCZmJdCxA';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images are loaded
function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready=true;
        loader.hidden = true;
        console.log('ready =', ready);
    }
}
// Helper Function to Set attributes on DOM ELements:
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images' , totalImages);
    // Run for each object in the photosArray
    photosArray.forEach((photo) => {
        // Create an <a> element to link Unsplash
        const item = document.createElement('a');
        setAttributes(item,{
            href: photo.links.html,
            target: '_target',
        })
        // // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        // Event Listener, check when each is finished
        img.addEventListener('load', imageLoaded);
        // Put <Img> inside <a>, put both inside image-container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
// Get photos from API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {}
}

// Check to see if scrolling near bottom of page,Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >=document.body.offsetHeight - 1000 && ready){
        ready = false
        getPhotos();
    }
});
// On Load
getPhotos();