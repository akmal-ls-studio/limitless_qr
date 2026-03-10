var main_qr = document.getElementById("main_qr_box");
var generated = document.getElementById("main_button_input");
var popup = document.getElementById("main_popup");
var span = document.getElementsByClassName("close")[0];
var col2 = document.getElementById("main_opt_backcol");
var qr_bg_trans = false;
var curr_qr;

document.getElementById("main_opt_trans").addEventListener('change', function() {
    qr_bg_trans = this.checked;
    if(qr_bg_trans) {
        col2.disabled = true;
        col2.classList.add("disabled-item");
    } else {
        col2.disabled = false;
        col2.classList.remove("disabled-item");
    }
});

generated.onclick = function() {
    var msg = document.getElementById("main_input").value;
    if(msg == "") {
        alert("Harap masukan text input!");
        return;
    }

    popup.style.display = "block";      
    var bg_color = "#" + ((qr_bg_trans) ? "00":"") + col2.value.substring(1);
    var res = parseInt(document.getElementById("main_opt_res").value.substring(0, 3)) / 2;
    var col1 = document.getElementById("main_opt_forcol").value;
    curr_qr = QRCode(JSON.parse(`{"msg":\"${msg}\", "dim":${res}, "ecl":"H", "pal":[\"${col1}\",\"${bg_color}\"]}`));
    main_qr.appendChild(curr_qr);
}

document.getElementById("main_button_download").onclick = function() {
    html2canvas(main_qr).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL("image/png");;
        link.download = 'Limitless_qr.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

span.onclick = function() {
    popup.style.display = "none";
    main_qr.removeChild(curr_qr);
}

window.onclick = function(event) {
    if(event.target == popup) {
        popup.style.display = "none";
        main_qr.removeChild(curr_qr);
    }
}