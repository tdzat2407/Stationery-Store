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
        const userCu = JSON.parse(localStorage.getItem("userHienTai"));
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
//phần lọc tìm kiếm sản phẩm trang products
 
const oTimKiem = document.getElementById("o-tim-kiem");

function locDanhMuc(loaiCanLoc, nutDuocBam) {
    const tatCaNut = document.querySelectorAll(".nut-loc");
    const nutTatca = tatCaNut[0];
    const dangChonChinhNo = nutDuocBam.classList.contains("dang-chon") && loaiCanLoc != "tat-ca";
    tatCaNut.forEach(nut => nut.classList.remove("dang-chon"));
    if (dangChonChinhNo)
    {
        nutTatca.classList.add("dang-chon");
        loaiCanLoc = "tat-ca";
    }
    else 
    {
        nutDuocBam.classList.add("dang-chon");
    }
    const tatCaSp = document.querySelectorAll("#danh-sach-sp .o-sp");
    tatCaSp.forEach(sp => {
        const loaiCuaSp = sp.getAttribute("data-loai");
        if(loaiCanLoc === "tat-ca" || loaiCuaSp === loaiCanLoc){
            sp.style.display = "block";
        }
        else {
            sp.style.display = "none";
        }
    });
}
//phần lọc tim kiếm sp
if (oTimKiem){
    oTimKiem.oninput = function()
    {
        const tuKhoa = oTimKiem.value.toLowerCase().trim();
        const tatCaSp = document.querySelectorAll("#danh-sach-sp .o-sp");

        tatCaSp.forEach(sp => {
            const tenSp = sp.querySelector("h3").innerText.toLocaleLowerCase();
            if (tenSp.includes(tuKhoa)){
                sp.style.display = "block";
            }
            else{
                sp.style.display = "none";
            }
        });
    };
}

// HÀM DÙNG CHUNG LƯU SẢN PHẨM VÀO GIỎ HÀNG (LOCALSTORAGE)
function luuVaoGioHang(ten, giaSo, anh, soLuong) {
    let gioHang = JSON.parse(localStorage.getItem('gioHangCalmPage')) || [];
    const viTriTonTai = gioHang.findIndex(item => item.ten === ten);

    if (viTriTonTai !== -1) {
        gioHang[viTriTonTai].soLuong += soLuong;
    } else {
        gioHang.push({ ten, gia: giaSo, anh, soLuong });
    }

    localStorage.setItem('gioHangCalmPage', JSON.stringify(gioHang));
    capNhatSoLuongTrenIcon();
    alert(`Đã thêm ${soLuong} "${ten}" vào giỏ hàng!`);
}


// TỰ ĐỘNG BẮT SỰ KIỆN CHO MỌI SẢN PHẨM (HIỆN TẠI & TƯƠNG LAI)
document.addEventListener('click', function (e) {
    // Trường hợp A: Bấm vào hình ảnh hoặc tên sản phẩm -> Mở Popup chi tiết
    if (e.target.matches('.o-sp img, .o-sp h3')) {
        moChiTietSp(e.target);
    }

    // Trường hợp B: Bấm vào nút "Thêm vào giỏ hàng" bên ngoài thẻ -> Thêm 1 món
    if (e.target.matches('.nut-them-gio')) {
        const theSp = e.target.closest('.o-sp');
        const ten = theSp.querySelector('h3').innerText;
        const giaSo = parseInt(theSp.querySelector('.gia').innerText.replace(/\D/g, '')) || 0;
        const anh = theSp.querySelector('img').getAttribute('src');

        luuVaoGioHang(ten, giaSo, anh, 1);
    }
});

// 3. LOGIC POPUP CHI TIẾT SẢN PHẨM (NHIỀU ẢNH + SỐ LƯỢNG)
function moChiTietSp(phanTu) {
    const theSp = phanTu.closest('.o-sp');
    const anhMacDinh = theSp.querySelector('img').getAttribute('src');
    const ten = theSp.querySelector('h3').innerText;
    const gia = theSp.querySelector('.gia').innerText;
    const loai = theSp.getAttribute('data-loai') || 'CalmPage';
    const moTa = theSp.getAttribute('data-mota') || 'Sản phẩm chính hãng được tuyển chọn tại CalmPage.';

    document.getElementById('ct-anh-chinh').src = anhMacDinh;
    document.getElementById('ct-ten').innerText = ten;
    document.getElementById('ct-gia').innerText = gia;
    document.getElementById('ct-hang').innerText = loai;
    document.getElementById('ct-mota').innerText = moTa;
    document.getElementById('ct-so-luong').value = 1;

    // Luôn đặt ảnh chính lên đầu, nối thêm các ảnh phụ (nếu có)
    const khuAnhNho = document.getElementById('ct-danh-sach-anh');
    khuAnhNho.innerHTML = '';

    const chuoiAnhPhu = theSp.getAttribute('data-anh-phu');
    const mangAnhPhu = chuoiAnhPhu
        ? chuoiAnhPhu.split(',').map(link => link.trim()).filter(link => link && link !== anhMacDinh)
        : [];
    const danhSachAnh = [anhMacDinh, ...mangAnhPhu];

    danhSachAnh.forEach((duongDan, viTri) => {
        const anhNho = document.createElement('img');
        anhNho.src = duongDan;
        if (viTri === 0) anhNho.classList.add('dang-xem');

        anhNho.onclick = function () {
            document.getElementById('ct-anh-chinh').src = duongDan;
            khuAnhNho.querySelectorAll('img').forEach(img => img.classList.remove('dang-xem'));
            anhNho.classList.add('dang-xem');
        };

        khuAnhNho.appendChild(anhNho);
    });

    document.getElementById('modal-chi-tiet').style.display = 'flex';
}

function doiSoLuongCt(buocNhay) {
    const oSoLuong = document.getElementById('ct-so-luong');
    let giaTri = (parseInt(oSoLuong.value) || 1) + buocNhay;
    oSoLuong.value = giaTri < 1 ? 1 : giaTri;
}

function dongChiTietSp(event, batBuocDong = false) {
    const modal = document.getElementById('modal-chi-tiet');
    if (batBuocDong || event.target === modal) {
        modal.style.display = 'none';
    }
}

function themTuPopupVaoGio() {
    const ten = document.getElementById('ct-ten').innerText;
    const giaSo = parseInt(document.getElementById('ct-gia').innerText.replace(/\D/g, '')) || 0;
    const anh = document.getElementById('ct-anh-chinh').src;
    const soLuong = parseInt(document.getElementById('ct-so-luong').value) || 1;

    luuVaoGioHang(ten, giaSo, anh, soLuong);
    dongChiTietSp(null, true);
}

//  HỆ THỐNG GIỎ HÀNG (HIỂN THỊ, TĂNG/GIẢM, XÓA, THANH TOÁN)
function capNhatSoLuongTrenIcon() {
    const gioHang = JSON.parse(localStorage.getItem('gioHangCalmPage')) || [];
    const tongMon = gioHang.reduce((tong, item) => tong + item.soLuong, 0);
    const theBadge = document.getElementById('so-luong-gio');
    if (theBadge) {
        theBadge.innerText = tongMon;
    }
}

// Tự động cập nhật số lượng trên icon 🛒 ngay khi vừa mở hoặc chuyển trang
document.addEventListener('DOMContentLoaded', capNhatSoLuongTrenIcon);

function moGioHang() {
    veGiaoDienGioHang();
    document.getElementById('modal-gio-hang').style.display = 'flex';
}

function dongGioHang(event, batBuocDong = false) {
    const modal = document.getElementById('modal-gio-hang');
    if (batBuocDong || event.target === modal) {
        modal.style.display = 'none';
    }
}

function veGiaoDienGioHang() {
    const gioHang = JSON.parse(localStorage.getItem('gioHangCalmPage')) || [];
    const khungDanhSach = document.getElementById('noi-dung-gio-hang');
    const khuChanGio = document.getElementById('chan-gio-hang');
    const theTongTien = document.getElementById('tong-tien-gio');

    if (!khungDanhSach) return;

    if (gioHang.length === 0) {
        khungDanhSach.innerHTML = '<p class="gio-trong">Giỏ hàng của bạn đang trống. Hãy chọn vài món đồ xinh xắn nhé!</p>';
        khuChanGio.style.display = 'none';
        return;
    }

    khuChanGio.style.display = 'block';
    khungDanhSach.innerHTML = '';
    let tongTien = 0;

    gioHang.forEach((mon, index) => {
        const thanhTien = mon.gia * mon.soLuong;
        tongTien += thanhTien;

        const dongSp = document.createElement('div');
        dongSp.className = 'mon-trong-gio';
        dongSp.innerHTML = `
            <img src="${mon.anh}" alt="${mon.ten}">
            <div class="thong-tin-mon-gio">
                <h4>${mon.ten}</h4>
                <p>${mon.gia.toLocaleString('vi-VN')}đ</p>
            </div>
            <div class="cum-nut-gio">
                <button type="button" onclick="doiSoLuongTrongGio(${index}, -1)">-</button>
                <span>${mon.soLuong}</span>
                <button type="button" onclick="doiSoLuongTrongGio(${index}, 1)">+</button>
            </div>
            <button type="button" class="nut-xoa-mon" title="Xóa món" onclick="xoaMonTrongGio(${index})">🗑️</button>
        `;
        khungDanhSach.appendChild(dongSp);
    });

    theTongTien.innerText = tongTien.toLocaleString('vi-VN') + 'đ';
}

function doiSoLuongTrongGio(viTri, thayDoi) {
    let gioHang = JSON.parse(localStorage.getItem('gioHangCalmPage')) || [];
    if (!gioHang[viTri]) return;

    gioHang[viTri].soLuong += thayDoi;
    if (gioHang[viTri].soLuong <= 0) {
        gioHang.splice(viTri, 1); // Giảm về 0 thì tự xóa khỏi giỏ
    }

    localStorage.setItem('gioHangCalmPage', JSON.stringify(gioHang));
    capNhatSoLuongTrenIcon();
    veGiaoDienGioHang();
}

function xoaMonTrongGio(viTri) {
    let gioHang = JSON.parse(localStorage.getItem('gioHangCalmPage')) || [];
    gioHang.splice(viTri, 1);
    localStorage.setItem('gioHangCalmPage', JSON.stringify(gioHang));
    capNhatSoLuongTrenIcon();
    veGiaoDienGioHang();
}

function datHangCalmPage() {
    const gioHang = JSON.parse(localStorage.getItem('gioHangCalmPage')) || [];
    if (gioHang.length === 0) return;

    alert('🎉 Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại CalmPage.');
    localStorage.removeItem('gioHangCalmPage');
    capNhatSoLuongTrenIcon();
    dongGioHang(null, true);
}