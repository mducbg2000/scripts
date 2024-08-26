/* eslint-disable import/named */
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  renderToBuffer,
  Path,
  Svg,
} from "@react-pdf/renderer";

export interface PdfFormData {
  unitName: string;
  purpose: string;
  startTimestamp: string;
  endTimestamp: string;
  roomName: string;
  requirements: {
    micro: boolean;
    speaker: boolean;
    projector: boolean;
    photographer: boolean;
    water: boolean;
    plasticFlower: boolean;
    plantFlower: boolean;
    tablecloth: boolean;
    giftTray: boolean;
  };
  title: string;
  banners: string;
  otherRequirement: string;
  prepareBeforeTimestamp?: string | 0;
  issuedDate: {
    day: number;
    month: number;
    year: number;
  };
  creator: {
    fullName: string;
    isPrioritized?: boolean;
  };
}

const fontFamily = "Noto Serif";
const fontSize = "11px";
Font.register({
  family: fontFamily,
  fonts: [
    { src: "./static/fonts/NotoSerif-Regular.ttf" },
    {
      src: "./static/fonts/NotoSerif-Bold.ttf",
      fontWeight: "bold",
    },
    {
      src: "./static/fonts/NotoSerif-Italic.ttf",
      fontStyle: "italic",
    },
    {
      src: "./static/fonts/NotoSerif-BoldItalic.ttf",
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
});

const css = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  checkbox: {
    // =.svg-inline svg
    height: 21,
    width: 131,
    display: "flex",
  },
  flex_center: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
  },
  row_content: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "10px",
    width: "100%",
  },
  title_unit: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "10px",
  },
  flex_around: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "20px",
  },
  title_italic: {
    fontStyle: "italic",
  },
  icon_svg: {
    marginRight: "5px",
  },
  flex_col: {
    display: "flex",
    flexDirection: "column",
  },
  requirements_container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  requirements_item: {
    width: "24%",
    display: "flex",
    flexDirection: "row",
  },
  payment_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
  payment_item: { display: "flex", flexDirection: "row" },
  border_content: {
    border: "1px solid black",
    width: "50%",
    display: "flex",
    justifyContent: "center",
    padding: "10px",
    flexDirection: "column",
    alignItems: "center",
  },
  title_flex_end: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  unit_sign_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  img_sign: {
    width: "100px",
    height: "100px",
  },
  title_italic_container: {
    display: "flex",
    flexDirection: "row",
  },
  footer_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "30px",
    borderTop: "1px solid #848787",
    color: "#848787",
  },
});

const getCheckbox = (isChecked: boolean) => {
  if (isChecked) {
    return (
      <View>
        <Svg width="20" height="20" viewBox="0 0 24 24">
          <Path
            fill="currentColor"
            d="M6 3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zM4 6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm9.854 1.854a.5.5 0 0 0-.708-.708L8.5 11.793l-1.646-1.647a.5.5 0 0 0-.708.708l2 2a.5.5 0 0 0 .708 0z"
          ></Path>
        </Svg>
      </View>
    );
  }
  return (
    <View>
      <Svg width="20" height="20" viewBox="0 0 24 24">
        <Path
          fill="currentColor"
          d="M3 6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm3-2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"
        ></Path>
      </Svg>
    </View>
  );
};

export const render = async (rawData: PdfFormData) => {
  return renderToBuffer(
    <Document>
      <Page
        size="A4"
        style={{
          fontSize,
          padding: "10px 25px",
          fontFamily,
          position: "relative",
        }}
      >
        <View>
          <div>
            <div style={css.title_flex_end}>
              <Text
                style={{
                  fontSize,
                  border: "1px solid black",
                  padding: "10px",
                }}
              >
                Số vào sổ:______/TC-HC
              </Text>
            </div>
            <div style={css.flex_around}>
              <div style={css.title_unit}>
                <Text style={{ fontSize }}>TRƯỜNG ĐH HÀNG HẢI VIỆT NAM</Text>
                <Text style={{ fontSize, fontWeight: "bold" }}>
                  ĐƠN VỊ: {rawData.unitName}
                </Text>
                <div
                  style={{ borderBottom: "1px solid black", width: "150px" }}
                ></div>
              </div>
              <div style={css.title_unit}>
                <Text style={{ fontSize, fontWeight: "bold" }}>
                  CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                </Text>
                <Text style={{ fontSize, fontWeight: "bold" }}>
                  Độc lập - Tự do - Hạnh phúc
                </Text>
                <div
                  style={{ borderBottom: "1px solid black", width: "150px" }}
                ></div>
              </div>
            </div>
            <div style={css.title_unit}>
              <Text style={{ fontSize, fontWeight: "bold" }}>ĐỀ NGHỊ</Text>
              <Text style={{ fontWeight: "bold" }}>
                (Mượn Hội trường, Phòng họp,...)
              </Text>
            </div>
            <div style={css.flex_center}>
              <Text style={{ marginRight: "10px" }}>Kính gửi:</Text>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Text style={{}}>
                  - Ban Giám hiệu Trường Đại học Hàng Hải Việt Nam.
                </Text>
                <Text style={{}}>- Phòng Tổ chức - Hành chính</Text>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={css.row_content}>
              <Text style={{}}>Mục đích sử dụng:</Text>
              <Text
                style={{
                  width: "80%",
                  height: "50px",
                  marginLeft: "5px",
                }}
              >
                {rawData.purpose}
              </Text>
            </div>
            <div style={css.row_content}>
              <Text style={{}}>Nội dung yêu cầu:</Text>
            </div>
            <div style={{ flexDirection: "column" }}>
              <div style={css.row_content}>
                <View style={css.icon_svg}>
                  <Svg width="15" height="15" viewBox="0 0 24 24">
                    <Path
                      fill="currentColor"
                      d="M10 7v2h2v8h2V7zm2-5a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2"
                    ></Path>
                  </Svg>
                </View>
                <Text style={{}}>Thời gian:</Text>
                <Text
                  style={{
                    width: "90%",
                    height: "15px",
                    marginLeft: "10px",
                  }}
                >
                  {rawData.startTimestamp}
                </Text>
              </div>
              <div style={css.row_content}>
                <View style={css.icon_svg}>
                  <Svg width="15" height="15" viewBox="0 0 24 24">
                    <Path
                      fill="currentColor"
                      d="M9 7v2h4v2h-2a2 2 0 0 0-2 2v4h6v-2h-4v-2h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zm3-5a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2"
                    ></Path>
                  </Svg>
                </View>
                <Text style={{}}>Địa điểm:</Text>
                <Text
                  style={{
                    width: "90%",
                    height: "15px",
                    marginLeft: "10px",
                  }}
                >
                  {rawData.roomName}
                </Text>
              </div>
              <div style={css.row_content}>
                <View style={css.icon_svg}>
                  <Svg width="15" height="15" viewBox="0 0 24 24">
                    <Path
                      fill="currentColor"
                      d="M15 15v-1.5a1.5 1.5 0 0 0-1.5-1.5a1.5 1.5 0 0 0 1.5-1.5V9a2 2 0 0 0-2-2H9v2h4v2h-2v2h2v2H9v2h4a2 2 0 0 0 2-2M12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2"
                    ></Path>
                  </Svg>
                </View>
                <Text style={{}}>Nội dung:</Text>
              </div>
              <div style={css.requirements_container}>
                <div style={css.requirements_item}>
                  {getCheckbox(rawData.requirements.micro)}
                  <Text style={{}}>Micro phát biểu</Text>
                </div>
                <div style={css.requirements_item}>
                  {getCheckbox(rawData.requirements.speaker)}
                  <Text style={{}}>Âm thanh hát</Text>
                </div>
                <div style={css.requirements_item}>
                  {getCheckbox(rawData.requirements.projector)}
                  <Text style={{}}>Máy chiếu</Text>
                </div>
                <div style={css.requirements_item}>
                  {getCheckbox(rawData.requirements.photographer)}
                  <Text style={{}}>Chụp ảnh</Text>
                </div>
              </div>
              <div style={css.requirements_container}>
                <div style={css.requirements_item}>
                  {getCheckbox(rawData.requirements.water)}
                  <Text style={{}}>Nước uống</Text>
                </div>
                <div style={css.requirements_item}>
                  {getCheckbox(rawData.requirements.plasticFlower)}
                  <Text style={{}}>Hoa nhựa</Text>
                </div>
                <div style={css.requirements_item}>
                  {getCheckbox(rawData.requirements.plantFlower)}
                  <Text style={{}}>Hoa tươi</Text>
                </div>
                <div style={css.requirements_item}>
                  {getCheckbox(rawData.requirements.tablecloth)}
                  <Text style={{}}>Khăn trải bàn</Text>
                </div>
              </div>
              <div style={css.row_content}>
                <Text style={{}}>Tít chữ:</Text>
                <Text
                  style={{
                    width: "90%",
                    height: "15px",
                    marginLeft: "5px",
                  }}
                >
                  {rawData.title}
                </Text>
              </div>
              <div style={css.row_content}>
                <Text style={{}}>Băng rôn:</Text>
                <Text
                  style={{
                    width: "90%",
                    height: "15px",
                    marginLeft: "5px",
                  }}
                >
                  {rawData.banners}
                </Text>
              </div>
              <div style={css.row_content}>
                <View style={css.icon_svg}>
                  <Svg width="15" height="15" viewBox="0 0 24 24">
                    <Path
                      fill="currentColor"
                      d="M9 7v6h4v4h2V7h-2v4h-2V7zm3-5a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2"
                    ></Path>
                  </Svg>
                </View>
                <div style={css.title_italic_container}>
                  <Text>Các yêu cầu khác:</Text>
                  <Text
                    style={{
                      width: "70%",
                      height: "60px",
                      marginLeft: "5px",
                    }}
                  >
                    {rawData.otherRequirement}
                  </Text>
                </div>
              </div>
              <div style={css.row_content}>
                <View style={css.icon_svg}>
                  <Svg width="15" height="15" viewBox="0 0 24 24">
                    <Path
                      fill="currentColor"
                      d="M9 7v6h4v2H9v2h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2V9h4V7zm3-5a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2"
                    ></Path>
                  </Svg>
                </View>
                <Text style={{}}>Phương thức thanh toán:</Text>
                <div style={css.payment_container}>
                  <div style={css.payment_item}>
                    <View>
                      <Svg width="20" height="20" viewBox="0 0 24 24">
                        <Path
                          fill="currentColor"
                          d="M3 6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm3-2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"
                        ></Path>
                      </Svg>
                    </View>
                    <Text style={{}}>Đơn vị</Text>
                  </div>
                  <div style={css.payment_item}>
                    <View>
                      <Svg width="20" height="20" viewBox="0 0 24 24">
                        <Path
                          fill="currentColor"
                          d="M6 3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zM4 6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm9.854 1.854a.5.5 0 0 0-.708-.708L8.5 11.793l-1.646-1.647a.5.5 0 0 0-.708.708l2 2a.5.5 0 0 0 .708 0z"
                        ></Path>
                      </Svg>
                    </View>
                    <Text style={{}}>Nhà trường</Text>
                  </div>
                  <div style={css.payment_item}>
                    <View>
                      <Svg width="20" height="20" viewBox="0 0 24 24">
                        <Path
                          fill="currentColor"
                          d="M3 6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm3-2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"
                        ></Path>
                      </Svg>
                    </View>
                    <Text style={{}}>Khác</Text>
                  </div>
                </div>
              </div>
              <div style={css.row_content}>
                <Text style={{}}>Cán bộ phục vụ:</Text>
                <Text style={{}}></Text>
              </div>
              <div style={css.row_content}>
                <div style={css.border_content}>
                  <Text style={{}}>Thời gian yêu cầu hoàn thành: </Text>
                  <Text>{rawData.prepareBeforeTimestamp}</Text>
                </div>
                <div style={css.border_content}>
                  <Text style={{}}>Thời gian bàn giao lại cho đơn vị:</Text>
                  <Text> {rawData.endTimestamp}</Text>
                </div>
              </div>
              <div style={css.title_flex_end}>
                <Text style={{ fontStyle: "italic" }}>
                  Hải Phòng, ngày {rawData.issuedDate.day} tháng{" "}
                  {rawData.issuedDate.month} năm {rawData.issuedDate.year}
                </Text>
              </div>
              <div style={css.unit_sign_container}>
                <Text style={{ fontWeight: "bold" }}>BAN GIÁM HIỆU</Text>
                {rawData.creator.isPrioritized ?? (
                  <Text style={{ fontWeight: "bold" }}>PHÒNG TC-HC</Text>
                )}
                {rawData.creator.isPrioritized ? (
                  <Text style={{ fontWeight: "bold" }}>THƯ KÝ HIỆU TRƯỞNG</Text>
                ) : (
                  <div style={css.flex_col}>
                    <Text style={{ fontWeight: "bold" }}>ĐƠN VỊ ĐỀ NGHỊ</Text>
                    <Text style={{ fontWeight: "bold" }}>TRƯỞNG ĐƠN VỊ</Text>
                  </div>
                )}
              </div>
              <div style={css.unit_sign_container}>
                <Text style={css.img_sign}></Text>
                {rawData.creator.isPrioritized ?? (
                  <Text style={css.img_sign}></Text>
                )}
                <Text style={css.img_sign}></Text>
              </div>
              <div
                style={css.unit_sign_container}
                // className="unit_sign_container"
              >
                <Text style={{}}>Nguyễn Thanh Sơn</Text>
                {rawData.creator.isPrioritized ?? (
                  <Text style={{}}>Nguyễn Huy Hào</Text>
                )}
                <Text style={{}}>{rawData.creator.fullName}</Text>
              </div>
            </div>
          </div>
          <div
            style={css.footer_container}
            // className="footer_container"
          >
            <Text style={{}}>NBH: 30/5/18 - REV:0</Text>
            <Text style={{}}>BM.09-QT.TCHC.03</Text>
          </div>
        </View>
      </Page>
    </Document>
  );
};
