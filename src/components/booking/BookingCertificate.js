import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 0,
  },
  // Top border decoration
  topBorder: {
    height: 12,
    backgroundColor: "#000000",
  },
  bottomBorder: {
    height: 12,
    backgroundColor: "#000000",
  },
  // Main container
  container: {
    margin: 40,
    flex: 1,
    borderWidth: 2,
    borderColor: "#000000",
    borderStyle: "solid",
    padding: 40,
    position: "relative",
  },
  // Corner decorations
  cornerTL: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 30,
    height: 30,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: "#000000",
  },
  cornerTR: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "#000000",
  },
  cornerBL: {
    position: "absolute",
    bottom: 10,
    left: 10,
    width: 30,
    height: 30,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: "#000000",
  },
  cornerBR: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 30,
    height: 30,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: "#000000",
  },
  // Header
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 4,
    color: "#000000",
    marginBottom: 4,
  },
  logoSub: {
    fontSize: 9,
    letterSpacing: 6,
    color: "#666666",
    textTransform: "uppercase",
  },
  divider: {
    height: 1,
    backgroundColor: "#000000",
    marginVertical: 16,
  },
  thinDivider: {
    height: 0.5,
    backgroundColor: "#cccccc",
    marginVertical: 8,
  },
  // Certificate title
  certTitle: {
    fontSize: 10,
    letterSpacing: 5,
    color: "#666666",
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  certHeading: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
    marginBottom: 6,
    letterSpacing: 1,
  },
  certSubHeading: {
    fontSize: 11,
    textAlign: "center",
    color: "#444444",
    marginBottom: 20,
    letterSpacing: 1,
  },
  // Recipient
  recipientLabel: {
    fontSize: 9,
    letterSpacing: 3,
    color: "#888888",
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  recipientName: {
    fontSize: 28,
    textAlign: "center",
    color: "#000000",
    marginBottom: 4,
    fontWeight: "bold",
  },
  recipientUnderline: {
    height: 1.5,
    backgroundColor: "#000000",
    marginHorizontal: 80,
    marginBottom: 20,
  },
  // Description
  description: {
    fontSize: 11,
    textAlign: "center",
    color: "#444444",
    lineHeight: 1.7,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  // Details box
  detailsBox: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#eeeeee",
    borderStyle: "solid",
    padding: 16,
    marginBottom: 20,
    borderRadius: 4,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailsLabel: {
    fontSize: 9,
    color: "#888888",
    textTransform: "uppercase",
    letterSpacing: 1,
    flex: 1,
  },
  detailsValue: {
    fontSize: 10,
    color: "#000000",
    fontWeight: "bold",
    flex: 2,
    textAlign: "right",
  },
  // Seal area
  sealArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 10,
  },
  signatureBox: {
    alignItems: "center",
    flex: 1,
  },
  signatureLine: {
    height: 1,
    backgroundColor: "#000000",
    width: 120,
    marginBottom: 4,
  },
  signatureLabel: {
    fontSize: 8,
    color: "#888888",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  // Seal circle
  seal: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#000000",
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  sealText: {
    fontSize: 7,
    color: "#000000",
    textAlign: "center",
    letterSpacing: 0.5,
    fontWeight: "bold",
  },
  sealStar: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 2,
  },
  // Certificate ID
  certId: {
    fontSize: 8,
    color: "#aaaaaa",
    textAlign: "center",
    marginTop: 12,
    letterSpacing: 1,
  },
});

const bookingTypeLabels = {
  vipMembership: "VIP Membership",
  meetAndGreet: "Meet & Greet",
  eventAppearance: "Event Appearance",
  privateReservation: "Private Reservation",
  productEndorsement: "Product Endorsement",
  weeklyAppointment: "Weekly Appointment",
};

export default function BookingCertificate({ booking }) {
  const {
    user,
    celebrity,
    bookingType,
    amount,
    status,
    createdAt,
    _id,
  } = booking;

  const bookingLabel = bookingTypeLabels[bookingType] || bookingType;
  const date = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const certNumber = _id?.toString().slice(-8).toUpperCase() || "XXXXXXXX";

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Top border */}
        <View style={styles.topBorder} />

        {/* Main container */}
        <View style={styles.container}>
          {/* Corner decorations */}
          <View style={styles.cornerTL} />
          <View style={styles.cornerTR} />
          <View style={styles.cornerBL} />
          <View style={styles.cornerBR} />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logo}>STARREACH ⭐</Text>
            <Text style={styles.logoSub}>Where Fans Meet Fame</Text>
          </View>

          <View style={styles.divider} />

          {/* Certificate Title */}
          <Text style={styles.certTitle}>Certificate of Booking</Text>
          <Text style={styles.certHeading}>This is to Certify That</Text>

          {/* Recipient */}
          <Text style={styles.recipientLabel}>The Following Individual</Text>
          <Text style={styles.recipientName}>{user?.name || "Valued Customer"}</Text>
          <View style={styles.recipientUnderline} />

          {/* Description */}
          <Text style={styles.description}>
            Has successfully booked a{" "}
            <Text style={{ fontWeight: "bold" }}>{bookingLabel}</Text> experience
            with{" "}
            <Text style={{ fontWeight: "bold" }}>{celebrity?.name || "Celebrity"}</Text>{" "}
            through the StarReach Celebrity Booking Platform. This certificate
            serves as official confirmation of the booking arrangement.
          </Text>

          {/* Details Box */}
          <View style={styles.detailsBox}>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Booking Reference</Text>
              <Text style={styles.detailsValue}>SR-{certNumber}</Text>
            </View>
            <View style={styles.thinDivider} />
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Celebrity</Text>
              <Text style={styles.detailsValue}>{celebrity?.name || "—"}</Text>
            </View>
            <View style={styles.thinDivider} />
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Experience Type</Text>
              <Text style={styles.detailsValue}>{bookingLabel}</Text>
            </View>
            <View style={styles.thinDivider} />
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Amount</Text>
              <Text style={styles.detailsValue}>
                ${Number(amount || 0).toLocaleString()} USD
              </Text>
            </View>
            <View style={styles.thinDivider} />
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Date Issued</Text>
              <Text style={styles.detailsValue}>{date}</Text>
            </View>
            <View style={styles.thinDivider} />
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Status</Text>
              <Text style={styles.detailsValue}>
                {status?.toUpperCase() || "PENDING"}
              </Text>
            </View>
          </View>

          {/* Seal and Signatures */}
          <View style={styles.sealArea}>
            <View style={styles.signatureBox}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureLabel}>Authorized Signature</Text>
            </View>

            <View style={styles.seal}>
              <Text style={styles.sealStar}>⭐</Text>
              <Text style={styles.sealText}>STARREACH</Text>
              <Text style={styles.sealText}>OFFICIAL</Text>
              <Text style={styles.sealText}>SEAL</Text>
            </View>

            <View style={styles.signatureBox}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureLabel}>Client Signature</Text>
            </View>
          </View>

          {/* Certificate ID */}
          <Text style={styles.certId}>
            Certificate No. SR-{certNumber} | Issued by StarReach Inc. |
            starreach.vercel.app
          </Text>
        </View>

        {/* Bottom border */}
        <View style={styles.bottomBorder} />
      </Page>
    </Document>
  );
}