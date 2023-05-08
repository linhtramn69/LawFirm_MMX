const { ObjectId } = require("mongodb");
const nodeMailer = require('nodemailer');
class QuoteForm {
    constructor(client) {
        this.QuoteForm = client.db().collection("quoteForm");
        this.TypeService = client.db().collection("typeService");
        this.Service = client.db().collection("service");
    }

    // define csdl
    extractConactData(payload) {
        const quoteForm = {
            khach_hang: payload.khach_hang,
            linh_vuc: payload.linh_vuc,
            dich_vu: payload.dich_vu,
            nguoi_lap_phieu: payload.nguoi_lap_phieu,
            ngay_gui_phieu: payload.ngay_gui_phieu,
            ngay_lap_phieu: payload.ngay_lap_phieu,
            ngay_xac_nhan_phieu: payload.ngay_xac_nhan_phieu,
            trang_thai_phieu: payload.trang_thai_phieu,
            tong_gia_du_kien: payload.tong_gia_du_kien,
            dieu_khoan_thanh_toan: payload.dieu_khoan_thanh_toan,
            tinh_thanh: payload.tinh_thanh,
            van_de: payload.van_de,
            ghi_chu: payload.ghi_chu,
            status: payload.status
        };

        Object.keys(quoteForm).forEach(
            (key) => quoteForm[key] === undefined && delete quoteForm[key]
        );
        return quoteForm;
    }

    async findAll() {
        const result = await this.QuoteForm.find();
        return result.toArray();
    }

    async findById(id) {
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.QuoteForm.findOne(id);
        return result;
    }

    // tim cac bao gia theo linh vuc va theo nam
    async findByTypeServiceAndYear(payload) {
        const rs = await this.QuoteForm.aggregate([
            {
                $group: {
                    _id: "$linh_vuc.ten_linh_vuc",
                    count: { $count: {} }
                }
            }
            
        ])
        return rs.toArray()
    }
    async findByProvinceAndYear(payload) {
        const rs = await this.QuoteForm.aggregate([
            {
                $group: {
                    _id: "$tinh_thanh",
                    count: { $count: {} }
                }
            }
            
        ])
        return rs.toArray()
    }

    async create(payload) {
        const linh_vuc = await this.TypeService.findOne({ _id: payload.linh_vuc });
        const dich_vu = await this.Service.findOne({ _id: new ObjectId(payload.dich_vu) });
        const quote = {
            ...payload,
            linh_vuc: linh_vuc,
            dich_vu: dich_vu,
            ngay_gui_phieu: payload.ngay_gui_phieu ? new Date(payload.ngay_gui_phieu) : new Date(payload.ngay_lap_phieu),
            ngay_lap_phieu: payload.ngay_lap_phieu ? new Date(payload.ngay_lap_phieu) : null,
        }
        const quoteForm = this.extractConactData(quote);
        const result = await this.QuoteForm.insertOne(quoteForm);
        return result;
    }

    async sendMail(payload) {
        const price = `${payload.tong_gia_du_kien}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        const adminEmail = 'coopmart.service69@gmail.com';
        const adminPassword = 'zkxomevbzvqlmkdy';
        const mailHost = 'smtp.gmail.com';
        const mailPort = 587;
        const subject = 'Thông tin báo giá'
        const html = `
        <table align="center" border="0" cellpadding="0" cellspacing="0" style="background:#fafafa;border-collapse:collapse;font-family:Arial,sans-serif;font-weight:normal;width:100%" width="100%">
        <tbody><tr>
            <td style="border-collapse:collapse">
                <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-weight:normal;margin:0 auto;max-width:600px;width:100%" width="100%">
                    <tbody>
                        <tr border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;margin:0;padding:0">
                            <td border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;margin:0;padding:0">
                                <table align="center" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-weight:normal;margin:0 auto;max-width:600px;width:100%" width="100%">
                                    <tbody>
                                        <tr>
                                            <td align="center" style="border-collapse:collapse;font-size:0;padding:10px 0px 0px 0px;text-align:center">
                                                <table height="3" width="100%">
                                                    <tbody><tr height="3">
                                                        <td bgcolor="#0072BC" height="3" style="border-collapse:collapse;font-size:0;padding:3px" valign="top" width="70%"></td><td bgcolor="#FFD008" height="3" style="border-collapse:collapse;font-size:0;padding:3px" valign="top" width="30%"></td>
                                                    </tr>
                                                    </tbody></table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;margin:0;padding:0">
                            <td border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;margin:0;padding:0">
                                <table align="center" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-weight:normal;margin:0 auto;max-width:600px;width:100%" width="100%">
                                    <tbody><tr border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;margin:0;padding:0">
                                        <td bgcolor="#e5ecf2" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;margin:0;padding:0;background:#e5ecf2;vertical-align:bottom" valign="bottom"><img alt="" border="0" src="https://ci6.googleusercontent.com/proxy/iZvMSEXekn8ldfwyx_s_VrplOf4uK-dRMIgNQoZjQsTiKMDhENFJd1LlKt7ILPSLR73YIrK-gZx34s8IMt_C0GN5aCPsDaexkcr0YQcd97s=s0-d-e1-ft#http://sacombank.com.vn/Documents/eBankingLib/arrow_white.png" style="display:block" class="CToWUd" data-bit="iit"></td>
                                    </tr>
                                        <tr border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;margin:0;padding:0">
                                            <td bgcolor="#e5ecf2" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;margin:0;padding:0;background:#e5ecf2;vertical-align:bottom" valign="bottom">
                                                <p style="margin:20px;line-height:22px;font-size:14px;text-align:left;color:#00395e">
                                                    <b>
                                                        Kính gửi quý khách hàng
                                                        <i>/Dear customers: ${payload.khach_hang.ho_ten}</i>
                                                        <br>
                                                    </b>
                                                    Văn phòng luật ABC trân trọng thông báo
                                                    <i>/ABC Law Office would like to inform:</i>
                                                    <br>
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody></table>
                            </td>
                        </tr>
                        <tr border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;margin:0;padding:0">
                            <td border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;margin:0;padding:0">
                                <table align="center" bgcolor="#e5ecf2" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-weight:normal;margin:0 auto;max-width:600px;width:100%" width="100%">
                                    <tbody><tr border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;margin:0;padding:0">
                                        <td bgcolor="#FFD103" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;margin:0;padding:0;background:#ffd103;vertical-align:bottom" valign="top">
                                            <p style="margin:10px;line-height:22px;font-size:18px;color:#000000;padding-left:10px">
                                                <b> Thông báo nội dung báo giá </b>
                                                <br>
                                                    Quote Alert
                                            </p>
                                        </td>
                                    </tr>
                                        <tr border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;margin:0;padding:0">
                                            <td border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;margin:0;padding:0"></td>
                                        </tr>
                                        <tr>
                                            <td align="left"></td>
                                        </tr>
                                        <tr border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;margin:0;padding:0">
                                            <td border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;margin:0;padding:0">
                                                <table align="center" bgcolor="#FFFFFF" border="1" cellpadding="8" cellspacing="0" style="table-layout:fixed;border-collapse:collapse;font-family:Arial,sans-serif;font-weight:normal;margin:0 auto;max-width:580px;width:90%" width="100%">
                                                    <tbody><tr>
                                                        <td align="left" style="width:200px">Lĩnh vực <i class="m_7546928786619830658txteng">/ Type Service</i>
                                                        </td><td align="left">${payload.linh_vuc.ten_linh_vuc}</td>
                                                    </tr>
                                                        <tr>
                                                            <td align="left">Dịch vụ <i class="m_7546928786619830658txteng">/ Service</i>
                                                            </td><td align="left">${payload.dich_vu.ten_dv}</td>
                                                        </tr>
                                                        <tr>
                                                            <td align="left">Giá dự kiến <i class="m_7546928786619830658txteng">/ Total price</i>
                                                            </td><td align="left">${price} đ</td>
                                                        </tr>
                                                        <tr>
                                                            <td align="left">Điều khoản thanh toán <i class="m_7546928786619830658txteng">/ TimePay</i>
                                                            </td><td align="left">${
                                                                payload.dieu_khoan_thanh_toan === 0 ? "Thanh toán ngay"
                                                                : payload.dieu_khoan_thanh_toan === -1 ? "Thanh toán khi hoàn thành"
                                                                : payload.dieu_khoan_thanh_toan + " ngày"
                                                            }</td>
                                                        </tr>
                                                        <tr>
                                                            <td align="left">Ghi chú <i class="m_7546928786619830658txteng">/ Description</i></td>
                                                            <td align="left">${payload.ghi_chu}</td>
                                                        </tr>
                                                    </tbody></table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="left"></td>
                                        </tr>
                                    </tbody></table>
                                <table align="center" bgcolor="#FFF4C2" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-weight:normal;margin:0 auto;max-width:600px;width:100%" width="100%">
                                    <tbody><tr border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;margin:0;padding:0">
                                        <td bgcolor="#FFF4C2" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;margin:0;padding:0;background:#fff4c2;vertical-align:bottom" valign="top">
                                            <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin:10px auto">
                                                <tbody><tr>
                                                    <td></td>
                                                </tr>
                                                </tbody></table>
                                        </td>
                                    </tr>
                                    </tbody></table>
                            </td>
                        </tr>
                        <tr>
                        <td>
                        <br/>
                                <i style="margin:20px;font-size:12px;text-align:left">
                                Lưu ý: Giá thành dịch vụ có thể sẽ có sự thay đổi tuỳ theo tính chất vụ việc. 
                                Để có giá thành chính xác nhất, hãy trao đổi trực tiếp cụ thể vấn đề của bạn. </i>
                                <br/>
                                <br/>
                                <i style="margin:20px;font-size:12px;text-align:left">
                                Nếu có điều gì chưa rõ xin quý khách vui lòng liên hệ : 0797381985
                                hoặc phản hồi lại email này</i>
                            </td>
                        </tr>
                        <tr border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;margin:0;padding:0">
                            <td border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;margin:0;padding:0">
                                <table align="center" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-weight:normal;margin:0 auto;max-width:600px;width:100%" width="100%">
                                    <tbody>
                                        <tr>
                                            <td align="center" style="border-collapse:collapse;font-size:0;padding:10px 0px 0px 0px;text-align:center">
                                                <table height="3" width="100%">
                                                    <tbody><tr height="3">
                                                        <td bgcolor="#0072BC" height="3" style="border-collapse:collapse;font-size:0;padding:3px" valign="top" width="70%"></td><td bgcolor="#FFD008" height="3" style="border-collapse:collapse;font-size:0;padding:3px" valign="top" width="30%"></td>
                                                    </tr>
                                                    </tbody></table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;margin:0;padding:0">
                            <td border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;margin:0;padding:0"></td>
                        </tr>
                        <tr border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;margin:0;padding:0">
                            <td border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;margin:0;padding:0">
                                <table align="center" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-weight:normal;margin:0 auto;max-width:600px;width:100%" width="100%">
                                    <tbody>
                                        <tr>
                                            <td align="center" style="border-collapse:collapse;padding:10px 0px 0px 0px;text-align:center;font-size:80%;color:#0072bc;line-height:20px">
                                                Liên hệ: 1800 5858 88 |
                                                <a href="http://www.google.com" target="_blank">
                                                www.abclawoffice.com.vn</a>
                                                |
                                                <a href="mailto:ask@abclawoffice.com" target="_blank">ask@abclawoffice.com</a>
                                                <br> © Bản quyền thuộc về văn phòng luật ABC
                                                    . Tất cả các quyền được bảo hộ
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        </tbody></table>`

        const transporter = nodeMailer.createTransport({
            host: mailHost,
            port: mailPort,
            secure: false,
            auth: {
                user: adminEmail,
                pass: adminPassword
            }
        })

        const options = {
            from: adminEmail,
            to: payload.khach_hang.email,
            subject: subject,
            html: html
        }
        if(payload.status < 3){
            this.updateStatus(payload._id)
        }
        return transporter.sendMail(options);
    }
    async updateStatus(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.QuoteForm.findOneAndUpdate(
            id,
            { $set: {status: 2} },
            { returnDocument: "after" }
        );
    }

    async update(id, payload) {
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const linh_vuc = await this.TypeService.findOne({ _id: payload.linh_vuc });
        const dich_vu = await this.Service.findOne({ _id: new ObjectId(payload.dich_vu) });
        const quote = {
            ...payload,
            linh_vuc: linh_vuc,
            dich_vu: dich_vu,
            ngay_lap_phieu: new Date(payload.ngay_lap_phieu),
        }
        const quoteForm = this.extractConactData(quote);
        const result = await this.QuoteForm.findOneAndUpdate(
            id,
            { $set: quoteForm },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.QuoteForm.findOneAndDelete(id);
        return result.value;
    }
}

module.exports = QuoteForm;