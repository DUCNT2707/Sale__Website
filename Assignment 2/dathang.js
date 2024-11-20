function hien_thi(visible) {
    var phi_vc = document.getElementById("phi_vc");
    phi_vc.style.display = visible ? "" : "none";
}

function kiem_tra() {
    var sp = document.getElementById("dia_chi_cu_the");
    if (sp.value.length == 0) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return false;
    }

    var loai = document.getElementById("loai");
    if (loai.value.length == 0) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return false;
    }

    var radios = document.getElementsByName("dia_chi");
    if (!radios[0].checked && !radios[1].checked) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return false;
    }

    alert("Đặt hàng thành công");
}
