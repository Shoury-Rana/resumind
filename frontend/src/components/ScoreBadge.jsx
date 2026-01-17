const ScoreBadge = ({ score }) => {
  let badgeColor = '';
  let badgeText = '';

  if (score > 69) {
    badgeColor = 'bg-[var(--color-badge-green)] text-[var(--color-badge-green-text)]';
    badgeText = 'Strong';
  } else if (score > 49) {
    badgeColor = 'bg-[var(--color-badge-yellow)] text-[var(--color-badge-yellow-text)]';
    badgeText = 'Good Start';
  } else {
    badgeColor = 'bg-[var(--color-badge-red)] text-[var(--color-badge-red-text)]';
    badgeText = 'Needs Work';
  }

  return (
    <div className={`px-3 py-1 rounded-full ${badgeColor}`}>
      <p className="text-sm font-medium">{badgeText}</p>
    </div>
  );
};

export default ScoreBadge;