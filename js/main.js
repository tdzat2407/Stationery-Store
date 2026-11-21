const hopThoai = document.getElementById("hop-thoai-auth");
const nutDong = document.getElementById("nut-dong-modal");
const tieudeform = document.getElementById("tieu-de-form");
const nhomten = document.getElementById("nhom-ten");
const nutguiform = document.getElementById("nut-gui-form");
const formtaikhoan = document.getElementById("form-tai-khoan");
const tenhienthi = document.getElementById("ten-hien-thi");
const menuUser = document.getElementById("menu-user");

let cheDoHienTai = "dang-nhap";

function moForm(chedo) {
    cheDoHienTai = chedo;
    hopThoai.style.display = "flex";

    if (chedo === "dang-ky"){
        tieudeform.innerText = "Đăng ký tài khoản";
        nhomten.style.display = "block";
        document.getElementById("nhap-ten").required = true;
        nutguiform.innerText ="Đăng ký";
    }
    else if (chedo === "sua-info"){
        if (userCu){
            document.getElementById("nhap-ten").value = userCu.ten;
            document.getElementById("nhap-user").value = userCu.user;
        }
        tieudeform.innerText = "Chỉnh sửa thông tin";
        nhomten.style.display = "block";
        document.getElementById("nhap-ten").required = true;
        nutguiform.innerText = "Lưu thay đổi";
    }
    else {
        tieudeform.innerText = "Đăng nhập";
        nhomten.style.display = "none";
        document.getElementById("nhap-ten"). required = false;
        nutguiform.innerText = "Đăng nhập";
    }
}
nutDong.onclick = function()
{
    hopThoai.style.display = "none";
}
window.onclick = function(e) {
    if (e.target === hopThoai) {
        hopThoai.style.display = "none";
    }
};

function capNhatgiaodienUser () {
    const userDaDangNhap = JSON.parse(localStorage.getItem("userHienTai"));
    if (userDaDangNhap)
    {
        tenhienthi.innerText = "👤 Xin chào, " + userDaDangNhap.ten + " ▾";
        menuUser.innerHTML = `
        <a href="#" onclick = "moForm('sua-info')">Sửa thông tin</a>
        <a href="#" onclick = "dangXuat()">Đăng xuất</a>
        `;
    }
    else {
        tenhienthi.innerText = "👤 Xin chào ▾";
        menuUser.innerHTML = `
        <a href="#" onclick="moForm('dang-nhap'); return false">Đăng nhập</a>
        <a href="#" onclick="moForm('dang-ky'); return false">Đăng ký</a>
        `;
    }
}
function dangXuat ()
{
    localStorage.removeItem("userHienTai");
    capNhatgiaodienUser();
}

formtaikhoan.onsubmit = function(e) {
    e.preventDefault(); // ngan tai lai lm mat data
    const ten = document.getElementById("nhap-ten").value.trim();
    const user = document.getElementById("nhap-user").value.trim();
    const pass = document.getElementById("nhap-pass").value.trim();
    if (cheDoHienTai === "dang-ky") {
        const taiKhoanMoi = { ten: ten, user: user, pass: pass };
        localStorage.setItem("taiKhoanDaLuu", JSON.stringify(taiKhoanMoi));
        localStorage.setItem("userHienTai", JSON.stringify(taiKhoanMoi));
        alert("Đăng ký thành công!");
    }
    else if (cheDoHienTai=== "dang-nhap"){
        const taiKhoanGoc = JSON.parse(localStorage.getItem("taiKhoanDaLuu"));
        if (taiKhoanGoc && taiKhoanGoc.user === user && taiKhoanGoc.pass === pass)
        {
            localStorage.setItem ("userHienTai", JSON.stringify(taiKhoanGoc));
            alert ("Đăng nhập thành công!");
        }
        else 
        {
            alert("Tên đăng nhập hoặc mật khẩu sai (bạn nhớ Đăng ký trước nhé)!");
            return;
        }
    }
    else if (cheDoHienTai === "sua-info"){
        const userCu = JSON.parse(localStorage.getItem("userHienTai"));
        userCu.ten = ten;
        userCu.user = user;
        userCu.pass = pass;
        localStorage.setItem("taiKhoanDaLuu", JSON.stringify(userCu));
        localStorage.setItem("userHienTai", JSON.stringify(userCu));
        alert("Đã cập nhật thông tin!");
    }
    formtaikhoan.reset();
    hopThoai.style.display = "none";
    capNhatgiaodienUser();
};
capNhatgiaodienUser();