/* =========================
   ELEMENTS
========================= */

const certificate = document.getElementById("certificate");

const templateSelect = document.getElementById("templateSelect");

const recipientName = document.getElementById("recipientName");
const reason = document.getElementById("reason");
const groupColor = document.getElementById("groupColor");

const photoInput = document.getElementById("photoInput");

const namePreview = document.getElementById("namePreview");
const reasonPreview = document.getElementById("reasonPreview");
const groupPreview = document.getElementById("groupPreview");
const photoPreview = document.getElementById("photoPreview");

/* =========================
   LIVE TEXT
========================= */

recipientName.addEventListener("input", () => {

    namePreview.textContent =
        recipientName.value || "ឈ្មោះ";

});

reason.addEventListener("input", () => {

    reasonPreview.textContent =
        reason.value || "មូលហេតុ";

});

groupColor.addEventListener("input", () => {

    groupPreview.textContent =
        groupColor.value || "ក្រុម";

});

/* =========================
   TEMPLATE
========================= */

templateSelect.addEventListener("change", () => {

    certificate.style.backgroundImage =
        `url("${templateSelect.value}")`;

});

/* =========================
   PHOTO UPLOAD
========================= */

photoInput.addEventListener("change", e => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = ev => {

        photoPreview.src = ev.target.result;

    };

    reader.readAsDataURL(file);

});

/* =========================
   TEXT EDITOR
========================= */

const targetElement =
document.getElementById("targetElement");

const fontFamily =
document.getElementById("fontFamily");

const fontSize =
document.getElementById("fontSize");

const textColor =
document.getElementById("textColor");

const shadowColor =
document.getElementById("shadowColor");

const boldToggle =
document.getElementById("boldToggle");

const italicToggle =
document.getElementById("italicToggle");

const posX =
document.getElementById("posX");

const posY =
document.getElementById("posY");

function currentElement() {

    return document.getElementById(
        targetElement.value
    );

}

/* Font */

fontFamily.addEventListener("change", () => {

    currentElement().style.fontFamily =
        fontFamily.value;

});

/* Size */

fontSize.addEventListener("input", () => {

    currentElement().style.fontSize =
        fontSize.value + "px";

});

/* Color */

textColor.addEventListener("input", () => {

    currentElement().style.color =
        textColor.value;

});

/* Shadow */

shadowColor.addEventListener("input", () => {

    currentElement().style.textShadow =
        `2px 2px 8px ${shadowColor.value}`;

});

/* Bold */

boldToggle.addEventListener("change", () => {

    currentElement().style.fontWeight =
        boldToggle.checked ? "700" : "400";

});

/* Italic */

italicToggle.addEventListener("change", () => {

    currentElement().style.fontStyle =
        italicToggle.checked ? "italic" : "normal";

});

/* X Position */

posX.addEventListener("input", () => {

    const el = currentElement();

    el.style.left = posX.value + "px";
    el.style.transform = "translateX(-50%)";

});

/* Y Position */

posY.addEventListener("input", () => {

    currentElement().style.top =
        posY.value + "px";

});

/* =========================
   PHOTO SIZE
========================= */

const photoSize =
document.getElementById("photoSize");

photoSize.addEventListener("input", () => {

    const size = photoSize.value;

    photoPreview.style.width =
        size + "px";

    photoPreview.style.height =
        (size * 1.33) + "px";

});

/* =========================
   DRAG & DROP
========================= */

function makeDraggable(element){

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    element.addEventListener("mousedown",(e)=>{

        isDragging = true;

        const rect =
        certificate.getBoundingClientRect();

        offsetX =
        e.clientX -
        element.offsetLeft -
        rect.left;

        offsetY =
        e.clientY -
        element.offsetTop -
        rect.top;

    });

    document.addEventListener("mousemove",(e)=>{

        if(!isDragging) return;

        const rect =
        certificate.getBoundingClientRect();

        element.style.left =
        (e.clientX - rect.left - offsetX) + "px";

        element.style.top =
        (e.clientY - rect.top - offsetY) + "px";

        element.style.transform =
        "none";

    });

    document.addEventListener("mouseup",()=>{

        isDragging = false;

    });

}

makeDraggable(photoPreview);
makeDraggable(namePreview);
makeDraggable(reasonPreview);
makeDraggable(groupPreview);

/* =========================
   DOWNLOAD PNG
========================= */

document
.getElementById("downloadPNG")
.addEventListener("click", async ()=>{

    const canvas =
    await html2canvas(certificate,{
        scale:2
    });

    const link =
    document.createElement("a");

    link.download =
    "certificate.png";

    link.href =
    canvas.toDataURL("image/png");

    link.click();

});

/* =========================
   PRINT
========================= */

document
.getElementById("printBtn")
.addEventListener("click", async ()=>{

    const canvas =
    await html2canvas(certificate,{
        scale:2
    });

    const image =
    canvas.toDataURL("image/png");

    const win =
    window.open("");

    win.document.write(`
        <html>
        <head>
            <title>Print</title>
        </head>
        <body style="margin:0;text-align:center;">
            <img
            src="${image}"
            style="width:100%;">
        </body>
        </html>
    `);

    win.document.close();

    win.onload = () => {

        win.print();

    };

});
