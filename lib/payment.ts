// Remittance details for paying by ACH / wire transfer.
// Radar Cart is operated by Melis Electronics LLC.

export const PAYMENT_ENTITY = "Melis Electronics LLC";

export interface WireDetailRow {
  label: string;
  value: string;
}

export const wireTransferDetails: WireDetailRow[] = [
  { label: "Beneficiary", value: PAYMENT_ENTITY },
  { label: "Bank", value: "Mercury (Choice Financial Group)" },
  { label: "Account Number", value: "738169316558493" },
  { label: "Account Type", value: "Checking" },
  { label: "ABA Routing (ACH / Domestic Wire)", value: "121145433" },
  { label: "SWIFT / BIC (International)", value: "CLNOUS66MER" },
  { label: "Intermediary SWIFT / BIC", value: "CHASUS33XXX" },
  {
    label: "Bank Address",
    value: "1 Letterman Drive, Building A, Suite A4-700, San Francisco, CA 94129 US",
  },
];

export const wireTransferDetailsText = [
  "REMIT PAYMENT TO",
  ...wireTransferDetails.map((row) => `${row.label}: ${row.value}`),
].join("\n");
