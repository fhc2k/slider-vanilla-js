const content = document.querySelector(".content");
const slider = document.querySelector(".slider");
const sliderImage = Array.from(document.querySelectorAll(".slider-image"));
const btnChevron = document.querySelectorAll(".btn-chevron");
let i = 0;

let createInfo = (text) => {
    const sliderInfo = document.createElement("p");
    sliderInfo.className = "slider-info";
    sliderInfo.innerText = text;
    content.appendChild(sliderInfo);
    setTimeout(()=>{
        sliderInfo.classList.add('slider-info-active');
    }, 1000);
};

let createIndicators = () =>{
    const indicators = document.createElement("div");
    indicators.className = "indicator";
    content.appendChild(indicators)
    let createIndicator = () =>{
        sliderImage.forEach(image =>{
            let indicator = document.createElement("p");
            indicator.innerText = sliderImage.indexOf(image) + 1;
            indicators.appendChild(indicator);
        })
    }
    createIndicator();
}
createIndicators();

let allIndicators = Array.from(document.querySelector('.indicator').children);

let reset = (el, clase) =>{
    el.classList.remove(clase);
}

let setPosition = (index) =>{
    let width = sliderImage[index].getBoundingClientRect().width;
    let move = width * index;
    slider.style.transform = `translateX(-${move}px)`;
}

let Image = (index) =>{
    const sliderInfo = document.querySelector('.slider-info');
    sliderImage[index].classList.add('slider-image-active');
    setTimeout(() =>{
        allIndicators.forEach(indicator =>{
            reset(indicator, 'indicator-active');
        })
        allIndicators[i].classList.add('indicator-active');
    }, 1000);
    if (content.hasElement(".slider-info") == false) {
        createInfo(sliderImage[index].dataset.info);
    } else {
        sliderInfo.classList.remove('slider-info-active');
        setTimeout(()=>{
            sliderInfo.classList.add('slider-info-active');
        }, 500);
        content.querySelector(".slider-info").innerText = sliderImage[index].dataset.info;
    }
}

Image(0);

let moveImage = () => {
    if (i == sliderImage.length) {
        i = 0;
    } else if (i == -1) {
        i = sliderImage.length - 1;
    }
    setPosition(i);
    sliderImage.forEach(image =>{
        reset(image, 'slider-image-active');
    })
    Image(i);
};

Array.from(btnChevron).map((btn)=>{
    btn.addEventListener('click', () =>{
        if (btn.dataset.action == "right") {
            moveImage(i++);
            return;
        }
        moveImage(i--);
    })
})



