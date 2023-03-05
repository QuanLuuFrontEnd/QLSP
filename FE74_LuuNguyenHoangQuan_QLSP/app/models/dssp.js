function DanhSachSanPham() {
    this.arr = [[]];
    this.themSP = function (sp) {
        console.log(sp);
        // this.arr.push(sp);
        if (this.arr == null)
            this.arr = sp;
        else
            this.arr.push(sp);
    };
    this.layThongTinSP = function (maSP) {
        var index = this.timViTriSP(maSP);

        if (index !== -1) {
            return this.arr[index];
        }

        return null;
    };

    this.timViTriSP = function (maSP) {
        /**
         * 0. Tạo biến index gán giá trị -1
         * 1. Duyệt mảng arr
         * 2. Nếu nv.maNV trùng với maSV
         *      => true => cập nhật giá trị cho index = (i)
         */
        var index = -1;

        this.arr.forEach(function (sp, i) {
            if (sp.maSP === maSP) {
                index = i;
            }
        });

        return index;
    };

}