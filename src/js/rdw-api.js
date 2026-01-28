// RDW API Integration for Dutch License Plate Lookup
// API Documentation: https://opendata.rdw.nl/

const RDW_API_BASE = 'https://opendata.rdw.nl/resource';

// Format license plate for RDW API (remove spaces and dashes)
function formatLicensePlate(kenteken) {
  return kenteken.toUpperCase().replace(/[-\s]/g, '');
}

// Format license plate for display (add dashes)
export function formatLicensePlateDisplay(kenteken) {
  const clean = kenteken.toUpperCase().replace(/[-\s]/g, '');
  
  // Dutch license plate formats
  // XX-XX-XX, XX-XXX-X, X-XXX-XX, etc.
  if (clean.length === 6) {
    return `${clean.slice(0, 2)}-${clean.slice(2, 4)}-${clean.slice(4, 6)}`;
  }
  
  return clean;
}

// Fetch vehicle information from RDW
export async function fetchVehicleInfo(kenteken) {
  const formattedKenteken = formatLicensePlate(kenteken);
  
  if (formattedKenteken.length < 4) {
    throw new Error('Kenteken moet minimaal 4 tekens bevatten');
  }
  
  try {
    // Fetch basic vehicle data
    const response = await fetch(
      `${RDW_API_BASE}/m9d7-ebf2.json?kenteken=${formattedKenteken}`,
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Kenteken niet gevonden in RDW database');
    }
    
    const data = await response.json();
    
    if (!data || data.length === 0) {
      throw new Error('Kenteken niet gevonden');
    }
    
    const vehicle = data[0];
    
    return {
      kenteken: formattedKenteken,
      merk: vehicle.merk || '-',
      handelsbenaming: vehicle.handelsbenaming || '-',
      voertuigsoort: vehicle.voertuigsoort || '-',
      inrichting: vehicle.inrichting || '-',
      aantal_zitplaatsen: vehicle.aantal_zitplaatsen || '-',
      eerste_kleur: vehicle.eerste_kleur || '-',
      tweede_kleur: vehicle.tweede_kleur || null,
      aantal_cilinders: vehicle.aantal_cilinders || '-',
      cilinderinhoud: vehicle.cilinderinhoud || '-',
      massa_ledig_voertuig: vehicle.massa_ledig_voertuig || '-',
      datum_eerste_toelating: vehicle.datum_eerste_toelating || '-',
      datum_tenaamstelling: vehicle.datum_tenaamstelling || '-',
      brandstof_omschrijving: vehicle.brandstof_omschrijving || '-',
      catalogusprijs: vehicle.catalogusprijs || '-',
      wacht_op_keuren: vehicle.wacht_op_keuren || 'Nee',
      vervaldatum_apk: vehicle.vervaldatum_apk || '-',
      taxi_indicator: vehicle.taxi_indicator || 'Nee',
      maximum_massa_samenstelling: vehicle.maximum_massa_samenstelling || '-',
      type: vehicle.type || '-',
      typegoedkeuringsnummer: vehicle.typegoedkeuringsnummer || '-',
      variant: vehicle.variant || '-',
      uitvoering: vehicle.uitvoering || '-',
      volgnummer_wijziging_eu_typegoedkeuring: vehicle.volgnummer_wijziging_eu_typegoedkeuring || '-',
      vermogen_massarijklaar: vehicle.vermogen_massarijklaar || '-',
      wielbasis: vehicle.wielbasis || '-',
      export_indicator: vehicle.export_indicator || 'Nee'
    };
    
  } catch (error) {
    console.error('RDW API Error:', error);
    throw error;
  }
}

// Fetch APK status
export async function fetchAPKStatus(kenteken) {
  const formattedKenteken = formatLicensePlate(kenteken);
  
  try {
    const response = await fetch(
      `${RDW_API_BASE}/a34c-vvps.json?kenteken=${formattedKenteken}`,
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    );
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    
    if (!data || data.length === 0) {
      return null;
    }
    
    return data[0];
  } catch (error) {
    console.error('APK API Error:', error);
    return null;
  }
}

// Check if APK is expired or expiring soon
export function isAPKExpiringSoon(vervaldatum) {
  if (!vervaldatum) return false;
  
  let year, month, day;
  
  // Handle YYYYMMDD format (RDW format)
  if (vervaldatum.length === 8 && !vervaldatum.includes('-')) {
    year = parseInt(vervaldatum.substring(0, 4));
    month = parseInt(vervaldatum.substring(4, 6));
    day = parseInt(vervaldatum.substring(6, 8));
  } 
  // Handle YYYY-MM-DD format
  else if (vervaldatum.includes('-')) {
    [year, month, day] = vervaldatum.split('-').map(Number);
  } else {
    return false;
  }
  
  const expiryDate = new Date(year, month - 1, day);
  
  // Validate date
  if (isNaN(expiryDate.getTime())) {
    return false;
  }
  
  const today = new Date();
  const thirtyDaysFromNow = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));
  
  return expiryDate <= thirtyDaysFromNow;
}

// Format date for display
export function formatDate(dateString) {
  if (!dateString || dateString === '-') return '-';
  
  try {
    let year, month, day;
    
    // Handle YYYYMMDD format (RDW format)
    if (dateString.length === 8 && !dateString.includes('-')) {
      year = parseInt(dateString.substring(0, 4));
      month = parseInt(dateString.substring(4, 6));
      day = parseInt(dateString.substring(6, 8));
    } 
    // Handle YYYY-MM-DD format
    else if (dateString.includes('-')) {
      [year, month, day] = dateString.split('-').map(Number);
    } else {
      return dateString;
    }
    
    const date = new Date(year, month - 1, day);
    
    // Validate date
    if (isNaN(date.getTime())) {
      return dateString;
    }
    
    return date.toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch (error) {
    return dateString;
  }
}
