const image = document.querySelector("#image");
const displayImage = document.querySelector("#displayImage");
let preview = document.querySelector(".preview");
let previewimage = document.querySelector("#previewimage");
let inputimage;
let blah = document.querySelector("#blah");
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

image.addEventListener("change", () => {
    const file = image.files;
    inputimage = file[0];
    // blah.src = window.URL.createObjectURL(image.files[0])
    // preview=inputimage;

    previewImages(URL.createObjectURL(inputimage));
})

function displayImages(image) {
    let images = "";
    images += `<div class="image">
                  <img src="${URL.createObjectURL(image)}" alt="image">
                </div>`
    displayImage.innerHTML = images;
}



function previewImages(url) {
    preview.classList.remove("display");
    const file = image.files;
    inputimage = file[0];
    previewimage.src = url;
    let rotate = document.querySelector("#rotate");
    let rotation = 0;
    rotate.addEventListener("click", function () {
        const angle = 90;
        rotation = rotation + angle;
        previewimage.style.transform = `rotate(${rotation}deg)`;

    })

    let flip = document.querySelector("#flip");

    let flipp;
    let click = 1;
    function flipped() {
        if (click % 2 == 1) {
            return "scaleX(-1)";
        } else {
            return "scaleY(-1)";
        }

    }

    flip.addEventListener("click", function () {
        click++;
        previewimage.style.transform = `${flipped()}`;

    })

    let crop = document.querySelector("#crop");
    crop.addEventListener("click", function () {
        let cropped = document.querySelector(".cropped");
        // cropped.style.display="none";
        cropped.classList.remove("display");

        let selectImage = document.querySelector("#selectImage");
        selectImage.addEventListener("change", function () {
            // Get the selected option
            const selectedOption = selectImage.options[selectImage.selectedIndex];
            const selectedValue = selectedOption.value;
            console.log(selectedValue);
            if (selectedValue == "150x50") {
                previewimage.style.width = "150px";
                previewimage.style.height = "50px";
            }
            else if (selectedValue == "200x200") {
                previewimage.style.width = "200px";
                previewimage.style.height = "200px";
            }
            else if (selectedValue == "350x150") {
                previewimage.style.width = "350px";
                previewimage.style.height = "150px";
            }
            else if (selectedValue == "400x400") {
                previewimage.style.width = "400px";
                previewimage.style.height = "400px";
            }
            else if (selectedValue == "650x350") {
                previewimage.style.width = "650px";
                previewimage.style.height = "350px";
            }
            else if (selectedValue == "800x600") {
                previewimage.style.width = "800px";
                previewimage.style.height = "600px";
            }
            else if (selectedValue == "1920x1080") {
                previewimage.style.width = "1920px";
                previewimage.style.height = "1080px";
            }

        })
    })
    let frames=document.querySelector(".frames");
    let next = document.querySelector("#next");
    next.addEventListener("click", function () {
        frames.classList.remove("display");
    })
    let frame = document.querySelectorAll(".frame");
    frame.forEach(function (value) {

        value.addEventListener("click", function () {
            const imageUrl = value.src;
            const imageName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);

            console.log(imageName);
            //         if(imageName=="user_image_frame_1.png"){

            //             // previewimage.style.width = ;
            //             // previewimage.style.height = ;
            //         }
            //         else if(imageName=="user_image_frame_2.png"){
            //             previewimage.style.width = ;
            //             previewimage.style.height = ;
            //         }

            //     })
            // })

            ///

            ///

            if (inputimage) {
                const reader = new FileReader();

                reader.addEventListener('load', function () {
                    const image = new Image();
                    image.addEventListener('load', function () {
                        const size = Math.min(image.width, image.height);
                        canvas.width = size;
                        canvas.height = size;
                        ctx.clearRect(0, 0, size, size);

                        // Choose the desired shape (heart, square, circle, rectangle)
                        const shape = imageName;

                        // Draw the image within the chosen shape
                        switch (shape) {
                            case 'user_image_frame_1.png':
                                ctx.beginPath();
                                ctx.moveTo(size / 2, size / 4);
                                ctx.bezierCurveTo(size / 2, 0, size, 0, size, size / 4);
                                ctx.bezierCurveTo(size, size / 2, size / 2, size, size / 2, size);
                                ctx.bezierCurveTo(size / 4, size, 0, size / 2, size / 2, size / 4);
                                ctx.closePath();
                                break;

                            case 'user_image_frame_2.png':
                                ctx.rect(0, 0, size, size);
                                break;

                            case 'user_image_frame_3.png':
                                ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
                                break;

                            case 'user_image_frame_4.png':
                                ctx.rect(0, 0, size / 2, size);
                                break;

                            default:
                                break;
                        }

                        ctx.clip();
                        ctx.drawImage(image, 0, 0, size, size, 0, 0, size, size);

                        const croppedImageUrl = canvas.toDataURL();
                        // Use the croppedImageUrl as needed, e.g., set as source for an <img> element
                        console.log(croppedImageUrl);
                    });
                    image.src = reader.result;
                });

                reader.readAsDataURL(inputimage);
            }
        });

        // frame.style.backgroundImage = `url(${ reader.result })`;


        // preview.style.display="none";
        // console.log(url);
        // preview.innerHTML += `<i class="fa-solid fa-rotate-right"></i>`;
        // displayImages(inputimage);

    })
}
