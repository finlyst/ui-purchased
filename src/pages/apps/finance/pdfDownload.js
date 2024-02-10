import PropTypes from 'prop-types';

//material-ui
// import { useTheme } from '@mui/material/styles';

// third-party
import { Page, View, Document, StyleSheet, Image, Text } from '@react-pdf/renderer';

const textPrimary = '#262626';
const textSecondary = '#8c8c8c';
const border = '#f0f0f0';

const styles = StyleSheet.create({
  page: {
    padding: 30
  },
  container: {
    flexDirection: 'column',
    '@media max-width: 400': {
      flexDirection: 'column'
    }
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  CardInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontSize: 14,
    lineHeight: 1.57,
    color: textPrimary
  },
  role: {
    fontSize: 10,
    lineHeight: 1.66,
    color: textSecondary
  },
  hr: {
    borderBottom: `1px solid ${border}`,
    marginTop: 10,
    marginBottom: 10
  },
  card: {
    border: `1px solid ${border}`,
    marginBottom: '15px'
  },
  cardTitle: {
    fontSize: '12px',
    borderBottom: `1px solid ${border}`,
    padding: 15
  },
  cardContent: {
    padding: 15
  },
  about: {
    padding: 15,
    fontSize: '11px',
    color: textPrimary
  },
  IconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  IconRow: {
    width: '48%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 5
  },
  icon: {
    width: 12,
    height: 10
  },
  iconTitle: {
    fontSize: 10,
    color: textPrimary
  },
  mainTitle: {
    fontSize: '11px',
    color: textSecondary
  },
  chip: {
    border: `1px solid ${textSecondary}`,
    alignItems: 'center',
    borderRadius: '4px',
    marginRight: 4,
    marginBottom: 8
  },
  chipTitle: {
    color: textSecondary,
    fontSize: '10px',
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 4,
    paddingTop: 4
  },
  leftColumn: {
    paddingTop: '10px',
    width: '75%'
  },
  rightColumn: {
    paddingTop: '10px',
    width: '25%'
  },
  infoCard: {
    padding: 10
  },
  userDetails: {
    rowGap: 5,
    marginBottom: 15
  }
});

const avatarImage = require.context('assets/images/finlystLogo', true);

const ListCard = ({ customer,surity,vechilProfile,loanProfile }) => {
//   const theme = useTheme();
  return (
    <Document title={`${customer?.name}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Image style={styles.image} src={avatarImage(`./finlystLogo2.png`)} />
            <View style={styles.CardInfo}>
              <Text style={styles.title}>Finance Profile</Text>
            </View>
          </View>
          <View style={styles.hr} />
          <View style={[styles.row, { alignItems: 'flex-start' }]}>
            <View style={styles.leftColumn}>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Loan Applicants</Text>
                <View style={styles.cardContent}>
                  <View style={styles.IconContainer}>
                    <View style={[styles.row, styles.IconRow]}>
                      <Text style={styles.mainTitle}>Applicant Name</Text>
                      <Text style={styles.iconTitle}>{customer.name}</Text>
                    </View>
                    <View style={[styles.row, styles.IconRow]}>
                      <Text style={styles.mainTitle}>Father Name</Text>
                      <Text style={styles.iconTitle}>{customer.fatherName}</Text>
                    </View>
                  </View>
                  <View style={styles.hr} />
                  <View style={styles.IconContainer}>
                    <View style={[styles.row, styles.IconRow]}>
                      <Text style={styles.mainTitle}>Contact Number</Text>
                      <Text style={styles.iconTitle}>{customer.contact}</Text>
                    </View>
                    <View style={[styles.row, styles.IconRow]}>
                      <Text style={styles.mainTitle}>Aadhar Number</Text>
                      <Text style={styles.iconTitle}>{customer.aadhar}</Text>
                    </View>
                  </View>
                  <View style={styles.hr} />
                  <View style={styles.IconContainer}>
                    <View style={[styles.row, styles.IconRow]}>
                      <Text style={styles.mainTitle}>Address</Text>
                      <Text style={styles.iconTitle}>{customer.location}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Applicants Surity</Text>
                <View style={styles.cardContent}>
                  <View style={styles.IconContainer}>
                    <View style={[styles.row, styles.IconRow]}>
                      <Text style={styles.mainTitle}>Applicant Name</Text>
                      <Text style={styles.iconTitle}>{surity.name}</Text>
                    </View>
                    <View style={[styles.row, styles.IconRow]}>
                      <Text style={styles.mainTitle}>Father Name</Text>
                      <Text style={styles.iconTitle}>{surity.fatherName}</Text>
                    </View>
                  </View>
                  <View style={styles.hr} />
                  <View style={styles.IconContainer}>
                    <View style={[styles.row, styles.IconRow]}>
                      <Text style={styles.mainTitle}>Contact Number</Text>
                      <Text style={styles.iconTitle}>{surity.contact}</Text>
                    </View>
                    <View style={[styles.row, styles.IconRow]}>
                      <Text style={styles.mainTitle}>Aadhar Number</Text>
                      <Text style={styles.iconTitle}>{surity.aadhar}</Text>
                    </View>
                  </View>
                  <View style={styles.hr} />
                  <View style={styles.IconContainer}>
                    <View style={[styles.row, styles.IconRow]}>
                      <Text style={styles.mainTitle}>Address</Text>
                      <Text style={styles.iconTitle}>{surity.location}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Vechile & Insurance Profile</Text>
                <View style={styles.cardContent}>
                  <View style={styles.IconContainer}>
                    <View style={[styles.row, styles.IconRow]}>
                      <Text style={styles.mainTitle}>Vechile Number</Text>
                      <Text style={styles.iconTitle}>{vechilProfile.vechileNo}</Text>
                    </View>
                    <View style={[styles.row, styles.IconRow]}>
                      <Text style={styles.mainTitle}>Chassis Number</Text>
                      <Text style={styles.iconTitle}>{vechilProfile.chassisNo}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.hr} />
                  <View style={styles.IconContainer}>
                    <View style={[styles.row, styles.IconRow]}>
                      <Text style={styles.mainTitle}>Engine Number</Text>
                      <Text style={styles.iconTitle}>{vechilProfile.engineNo}</Text>
                    </View>
                    <View style={[styles.row, styles.IconRow]}>
                      <Text style={styles.mainTitle}>Model Name</Text>
                      <Text style={styles.iconTitle}>{vechilProfile.modelName}</Text>
                    </View>
                  </View>
                  <View style={styles.hr} />
                  <View style={styles.IconContainer}>
                    <View style={[styles.row, styles.IconRow]}>
                      <Text style={styles.mainTitle}>Date for Manufatured Number</Text>
                      <Text style={styles.iconTitle}>{vechilProfile.dofMfd}</Text>
                    </View>
                  </View>
                  <View style={styles.hr} />
                  <View style={styles.IconContainer}>
                    <View style={[styles.row, styles.IconRow]}>
                      <Text style={styles.mainTitle}>Insurance Company</Text>
                      <Text style={styles.iconTitle}>{vechilProfile.insuranceCompany}</Text>
                    </View>
                    <View style={[styles.row, styles.IconRow]}>
                      <Text style={styles.mainTitle}>Policy Number</Text>
                      <Text style={styles.iconTitle}>{vechilProfile.policyNo}</Text>
                    </View>
                  </View>

                </View>
              </View>
            
            </View>
            <View style={styles.rightColumn}>
              <View style={[styles.card, styles.infoCard]}>
              <Text style={styles.cardTitle}>Loan Profile</Text>
                <View style={styles.userDetails}>
                  <Text style={styles.mainTitle}>Loan Amount</Text>
                  <Text style={styles.iconTitle}>
                  {loanProfile.loanAmt}
                  </Text>
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.mainTitle}>Tenure</Text>
                  <Text style={styles.iconTitle}> Years : {loanProfile.tenureYears}, Months : {loanProfile.tenureMonths}</Text>
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.mainTitle}>Rate Of Interest</Text>
                  <Text style={styles.iconTitle}>{loanProfile.roi} %</Text>
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.mainTitle}>Emi Start Date</Text>
                  <Text style={styles.iconTitle}>{loanProfile.emidate}</Text>
                </View>
                
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

ListCard.propTypes = {
  customer: PropTypes.object
};

export default ListCard;
