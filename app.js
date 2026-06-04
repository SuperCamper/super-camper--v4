```javascript
// =====================================
// ELEMENTS
// =====================================

const certificate = document.getElementById("certificate");

const templateSelect =
document.getElementById("templateSelect");

const backgroundUpload =
document.getElementById("backgroundUpload");

const photoInput =
document.getElementById("photoInput");

const recipientName =
document.getElementById("recipientName");

const reason =
document.getElementById("reason");

const groupColor =
document.getElementById("groupColor");

const photoPreview =
document.getElementById("photoPreview");

const namePreview =
document.getElementById("namePreview");

const reasonPreview =
document.getElementById("reasonPreview");

const groupPreview =
document.getElementById("groupPreview");

// =====================================
// TEXT SETTINGS
// =====================================

const targetText =
document.getElementById("targetText");

const fontFamily =
document.getElementById("fontFamily");

const fontSize =
document.getElementById("fontSize");

const textColor =
document.getElementById("textColor");

const shadowColor =
document.getElementById("shadowColor");

const boldText =
document.getElementById("boldText");

const italicText =
document.getElementById("italicText");

// =====================================
// PHOTO SETTINGS
// =====================================

const photoSize =
document.getElementById("photoSize");

const photoRadius =
document.getElementById("photoRadius");

// =====================================
// TOOLBAR
// =====================================

const saveBtn =
document.getElementById("saveBtn");

const loadBtn =
document.getElementById("loadBtn");

const downloadPNG =
document.getElementById("downloadPNG");

const downloadPDF =
document.getElementById("downloadPDF");

const printBtn =
document.getElementById("printBtn");

// =====================================
// DEFAULT TEMPLATE
// =====================================

certificate.style.backgroundImage =
`url("${templateSelect.value}")`;

// =====================================
// TEMPLATE CHANGE
// =====================================

templateSelect.addEventListener("change",()=>{

    certificate.style.backgroundImage =
    `url("${templateSelect.value}")`;

});

// =====================================
// BACKGROUND UPLOAD
// =====================================

backgroundUpload.addEventListener("change",e=>{

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = ev=>{

        certificate.style.backgroundImage =
        `url("${ev.target.result}")`;

    };

    reader.readAsDataURL(file);

});

// =====================================
// PHOTO UPLOAD
// =====================================

photoInput.addEventListener("change",e=>{

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = ev=>{

        photoPreview.src =
        ev.target.result;

    };

    reader.readAsDataURL(file);

});

// =====================================
// LIVE TEXT
// =====================================

recipientName.addEventListener("input",()=>{

    namePreview.textContent =
    recipientName.value ||
    "ឈ្មោះអ្នកទទួល";

});

reason.addEventListener("input",()=>{

    reasonPreview.textContent =
    reason.value ||
    "មូលហេតុទទួលវិញ្ញាបនបត្រ";

});

groupColor.addEventListener("input",()=>{

    groupPreview.textContent =
    groupColor.value ||
    "ក្រុម";

});

// =====================================
// SELECT TEXT
// =====================================

function currentText(){

    if(targetText.value==="name")
        return namePreview;

    if(targetText.value==="reason")
        return reasonPreview;

    return groupPreview;
}

// =====================================
// FONT FAMILY
// =====================================

fontFamily.addEventListener("change",()=>{

    currentText().style.fontFamily =
    fontFamily.value;

});

// =====================================
// FONT SIZE
// =====================================

fontSize.addEventListener("input",()=>{

    currentText().style.fontSize =
    fontSize.value + "px";

});

// =====================================
// TEXT COLOR
// =====================================

textColor.addEventListener("input",()=>{

    currentText().style.color =
    textColor.value;

});

// =====================================
// SHADOW
// =====================================

shadowColor.addEventListener("input",()=>{

    currentText().style.textShadow =
    `0 3px 8px ${shadowColor.value}`;

});

// =====================================
// BOLD
// =====================================

boldText.addEventListener("change",()=>{

    currentText().style.fontWeight =
    boldText.checked ? "700":"400";

});

// =====================================
// ITALIC
// =====================================

italicText.addEventListener("change",()=>{

    currentText().style.fontStyle =
    italicText.checked
    ? "italic"
    : "normal";

});

// =====================================
// PHOTO SIZE
// =====================================

photoSize.addEventListener("input",()=>{

    let w =
    parseInt(photoSize.value);

    photoPreview.style.width =
    w + "px";

    photoPreview.style.height =
    (w*1.33) + "px";

});

// =====================================
// PHOTO RADIUS
// =====================================

photoRadius.addEventListener("input",()=>{

    photoPreview.style.borderRadius =
    photoRadius.value + "px";

});

// =====================================
// DRAGGABLE
// =====================================

function makeDraggable(el){

    let dragging = false;

    let offsetX = 0;
    let offsetY = 0;

    el.addEventListener("mousedown",e=>{

        dragging = true;

        offsetX =
        e.offsetX;

        offsetY =
        e.offsetY;

    });

    document.addEventListener(
    "mousemove",e=>{

        if(!dragging) return;

        const rect =
        certificate.getBoundingClientRect();

        el.style.left =
        (e.clientX -
         rect.left -
         offsetX) + "px";

        el.style.top =
        (e.clientY -
         rect.top -
         offsetY) + "px";

    });

    document.addEventListener(
    "mouseup",()=>{

        dragging = false;

    });
}

makeDraggable(photoPreview);
makeDraggable(namePreview);
makeDraggable(reasonPreview);
makeDraggable(groupPreview);

// =====================================
// SAVE PROJECT
// =====================================

saveBtn.addEventListener("click",()=>{

    const data = {

        name:namePreview.innerText,
        reason:reasonPreview.innerText,
        group:groupPreview.innerText,

        photo:photoPreview.src,

        bg:
        certificate.style.backgroundImage,

        photoLeft:
        photoPreview.style.left,

        photoTop:
        photoPreview.style.top

    };

    localStorage.setItem(
        "supercamper",
        JSON.stringify(data)
    );

    alert("Project Saved");

});

// =====================================
// LOAD PROJECT
// =====================================

loadBtn.addEventListener("click",()=>{

    const data =
    JSON.parse(
    localStorage.getItem(
    "supercamper"
    ));

    if(!data) return;

    namePreview.innerText =
    data.name;

    reasonPreview.innerText =
    data.reason;

    groupPreview.innerText =
    data.group;

    photoPreview.src =
    data.photo;

    certificate.style.backgroundImage =
    data.bg;

    photoPreview.style.left =
    data.photoLeft;

    photoPreview.style.top =
    data.photoTop;

});

// =====================================
// PNG
// =====================================

downloadPNG.addEventListener(
"click",
async ()=>{

const canvas =
await html2canvas(
certificate,
{
scale:3
});

const link =
document.createElement("a");

link.download =
"certificate.png";

link.href =
canvas.toDataURL();

link.click();

});

// =====================================
// PDF
// =====================================

downloadPDF.addEventListener(
"click",
async ()=>{

const canvas =
await html2canvas(
certificate,
{
scale:3
});

const imgData =
canvas.toDataURL("image/png");

const { jsPDF } =
window.jspdf;

const pdf =
new jsPDF(
"p",
"mm",
"a4"
);

pdf.addImage(
imgData,
"PNG",
0,
0,
210,
297
);

pdf.save(
"certificate.pdf"
);

});

// =====================================
// PRINT
// =====================================

printBtn.addEventListener(
"click",
()=>{

window.print();

});
```
