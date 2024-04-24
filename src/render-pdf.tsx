import React from 'react'
import { Document, Page, Text, View, StyleSheet, Font, renderToBuffer } from "@react-pdf/renderer";
import { writeFileSync } from 'fs';

const rawData = {
  unitName: "Phòng tổ chức hành chính",
  purpose: "Test",
  startTimestamp: "08:00 16/04/2024",
  endTimestamp: "08:30 16/04/2024",
  roomName: "Phòng 609",
  requirements: {
    micro: false,
    speaker: false,
    projector: false,
    photographer: true,
    water: true,
    plasticFlower: false,
    plantFlower: false,
    tablecloth: true,
    giftTray: false,
  },
  title: "Tập huấn eoffice",
  banners: "Tập huấn eoffice",
  otherRequirement: "Không",
  payment: {
    unit: false,
    uni: true,
    others: false,
  },
  prepareBeforeTimestamp: "07:30 16/04/2024",
  // Ngày đơn vị đề nghị ký
  issuedDate: {
    day: 16,
    month: 4,
    year: 2024,
  },
  creator: {
    fullName: "Nguyễn Minh Đức",
  },
};

const fontFamily = 'Noto Serif'

Font.register({family: fontFamily, src: './static/noto.ttf'})

// Create styles
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
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={css.page}>
      <View style={css.section}>
        <Text style={{fontFamily}}>Nong còn múp</Text>
      </View>
      <View style={css.section}>
        <Text style={{fontFamily}}>nghĩa là Nong sẽ gầy</Text>
      </View>
    </Page>
  </Document>
);

try {
  const buf = await renderToBuffer(<MyDocument />);
  
  writeFileSync('static/invoice.pdf', buf)
} catch (error) {
  console.log(error)
}

process.exit()