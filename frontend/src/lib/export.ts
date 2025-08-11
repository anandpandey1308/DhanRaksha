import type { ProjectionResult, FixedExpenses, Goals, Assumptions } from './store';

type ExportMeta = {
  monthlyIncome: number;
  fixed: FixedExpenses;
  goals: Goals;
  assumptions: Assumptions;
};

export async function exportProjectionsToXLSX(args: { projections: ProjectionResult | null | undefined; meta: ExportMeta }) {
  const XLSX = await import('xlsx');
  const { projections, meta } = args;
  const wb = XLSX.utils.book_new();

  const summaryRows = [
    ['Monthly Income', meta.monthlyIncome],
    ['EMI + Rent', meta.fixed.rentEmi],
    ['Living', meta.fixed.living],
    ['Emergency Target', meta.goals.emergencyTarget],
    ['EF Base', meta.goals.emergencyBaseMonthly],
    ['EF Extra', meta.goals.emergencyExtraMonthly],
    ['Short-term Monthly', meta.goals.shortTermMonthly],
    ['Portfolio CAGR %', meta.assumptions.portfolioCAGR],
    ['EF Return %', meta.assumptions.efReturn],
    ['Plan Months', meta.assumptions.planMonths],
  ];
  const wsSummary = XLSX.utils.aoa_to_sheet([['Key', 'Value'], ...summaryRows]);
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

  const projRows: Array<Array<string | number>> = [[
    'Month',
    'EF Balance',
    'EF Contribution',
    'Short-term Balance',
    'Portfolio Value',
    'Portfolio Contribution',
    'Net Worth',
  ]];
  (projections?.points || []).forEach(p => {
    projRows.push([p.label, p.efBalance, p.efContribution, p.shortTermBalance, p.portfolioValue, p.portfolioContribution, p.netWorth]);
  });
  const wsProj = XLSX.utils.aoa_to_sheet(projRows);
  XLSX.utils.book_append_sheet(wb, wsProj, 'Projections');

  XLSX.writeFile(wb, 'DhanRaksha_Projections.xlsx');
}

export async function exportProjectionsToPDF(args: { projections: ProjectionResult | null | undefined; meta: ExportMeta }) {
  const { default: jsPDF } = await import('jspdf');
  const { projections, meta } = args;
  const doc = new jsPDF();
  let y = 14;

  doc.setFontSize(16);
  doc.text('DhanRaksha — Plan & Projections', 14, y); y += 8;

  doc.setFontSize(11);
  const lines = [
    `Monthly Income: ₹${meta.monthlyIncome.toLocaleString('en-IN')}`,
    `Fixed: ₹${(meta.fixed.rentEmi + meta.fixed.living).toLocaleString('en-IN')} (EMI+Rent ₹${meta.fixed.rentEmi.toLocaleString('en-IN')}, Living ₹${meta.fixed.living.toLocaleString('en-IN')})`,
    `EF Target: ₹${meta.goals.emergencyTarget.toLocaleString('en-IN')} | Base ₹${meta.goals.emergencyBaseMonthly.toLocaleString('en-IN')} + Extra ₹${meta.goals.emergencyExtraMonthly.toLocaleString('en-IN')}`,
    `Short-term Monthly: ₹${meta.goals.shortTermMonthly.toLocaleString('en-IN')}`,
    `Assumptions: Portfolio CAGR ${meta.assumptions.portfolioCAGR}% | EF Return ${meta.assumptions.efReturn}% | Months ${meta.assumptions.planMonths}`,
  ];
  lines.forEach((t) => { doc.text(t, 14, y); y += 6; });

  y += 4;
  doc.text('Selected Projection Points:', 14, y); y += 6;
  const pts = projections?.points || [];
  const pickIdx = [0, Math.floor(pts.length/2), pts.length - 1].filter(i => i >= 0);
  pickIdx.forEach((i) => {
    const p = pts[i];
    if (!p) return;
    const text = `${p.label}: Net Worth ₹${p.netWorth.toLocaleString('en-IN')}, Portfolio ₹${p.portfolioValue.toLocaleString('en-IN')}, EF ₹${p.efBalance.toLocaleString('en-IN')}`;
    doc.text(text, 14, y);
    y += 6;
  });

  doc.save('DhanRaksha_Projections.pdf');
}
