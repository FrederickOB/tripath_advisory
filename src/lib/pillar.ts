// Which of the three brand pillars a service belongs to, read from its title
export function pillarOf(title: string) {
  if (/polic|regulat|governance/i.test(title)) return "Policy";
  if (/gender|youth|communit|people|inclusi|social/i.test(title)) return "People";
  if (/esg|climate|environment|planet|sustainab|finance/i.test(title)) return "Planet";
  return null;
}
