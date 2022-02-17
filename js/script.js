const content = document.querySelector(".content");
const slider = document.querySelector(".slider");
const images = [...document.querySelectorAll(".image")];
const btnSlider = [...document.querySelectorAll(".btn-slider")];
let i = 0;

const reset = (container, clase) => Array.from(container, item => item.classList.remove(clase));

const createDescription = text => {
    const container = document.createElement("p");
    container.className = "description";
    container.textContent = text;
    content.appendChild(container);
};

const createIndicators = () => {
    const container = document.createElement("div");
    container.className = "indicator";
    images.map(image => {
        const indicator = document.createElement("p");
        indicator.textContent = images.indexOf(image) + 1;
        indicator.addEventListener("click", () => {
            i = images.indexOf(image);
            moveImage();
        })
        container.appendChild(indicator);
    })
    content.appendChild(container);
}

const setPosition = () => {
    const { width } = images[i].getBoundingClientRect();
    const indicators = document.querySelectorAll('.indicator p');
    const description = document.querySelector('.description');
    const hasElement = content.contains(document.querySelector(".description"));
    
    reset(images, "image-active");
    images[i].classList.add('image-active');
    reset(indicators, 'indicator-active');
    indicators[i].classList.add('indicator-active');
    slider.style.transform = `translateX(-${width * i}px)`;

    hasElement ? description.textContent = images[i].dataset.description : createDescription(images[i].dataset.description);   
}

const moveImage = () => {
    if (i >= images.length) i = 0;
    else if (i < 0) i = images.length - 1;
    setPosition();
};

btnSlider.map(btn => {
    btn.addEventListener('click', () => {
        btn.dataset.action === "right" ? i++ : i--;
        moveImage();
    })
})

createIndicators();
setPosition();

