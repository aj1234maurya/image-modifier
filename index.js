let cropper;
const imageTag = document.createElement("img");

function uploadImage() {
  document.querySelector(".selectedImage").click();
}

function display() {
  const selectedFile = document.querySelector(".selectedImage").files[0];
  const uploadedImageContainer = document.querySelector(".uploadedImage");
  if (selectedFile) {
    const reader = new FileReader();

    uploadedImageContainer.innerHTML = "";

    if (cropper) {
      cropper.destroy();
    }

    reader.onload = (event) => {
      if (event.target) {
        console.log(event.target);
        imageTag.src = event.target.result;
        uploadedImageContainer.appendChild(imageTag);
        initializeCropper();
      } else {
        console.error("Event target is undefined or null.");
      }
    };
    reader.readAsDataURL(selectedFile);
  }
}

function initializeCropper() {
  cropper = new Cropper(imageTag, {
    aspectRatio: 0,
    viewMode: 3,
    zoomable: true,
    autoCropArea: 1,
  });
}

function cropImage() {
  if (cropper) {
    const imageTag2 = document.createElement("img");
    const resultImageContainer = document.querySelector(".result");
    const downloadContainer = document.querySelector(".download-btn");

    const croppedCanvas = cropper.getCroppedCanvas();

    const croppedDataUrl = croppedCanvas.toDataURL();
    imageTag2.src = croppedDataUrl;
    resultImageContainer.innerHTML = "";
    resultImageContainer.appendChild(imageTag2);
    console.log("Cropped Data URL:", croppedDataUrl);

    const downloadButton = document.createElement("a");
    downloadButton.href = croppedDataUrl;
    downloadButton.download = "cropped_image.png";
    downloadButton.textContent = "Download Cropped Image";
    downloadContainer.appendChild(downloadButton);

    cropper.destroy();
    cropper = null;
  } else {
    console.log("croper not started");
  }
}

function rotateImage() {
  if (cropper) {
    cropper.clear();
    cropper.rotate(90);
  } else {
    console.error("Cropper is not initialized.");
  }
}

function mirrorImage() {
  if (cropper) {
    cropper.clear();
    // console.log(cropper.getData());
    const currentScaleX = cropper.getData().scaleX;
    const newScaleX = -currentScaleX;
    cropper.scaleX(newScaleX);
  }
}
function resetCrop() {
  const downloadBtn = document.querySelector(".download-btn");
  downloadBtn.innerHTML = "";

  const uploadedImageContainer = document.querySelector(".result");
  uploadedImageContainer.innerHTML = "";

  const selectedFileInput = document.querySelector(".selectedImage");
  selectedFileInput.value = "";

  const imageTag = document.createElement("img");
  uploadedImageContainer.appendChild(imageTag);

  initializeCropper();
}
