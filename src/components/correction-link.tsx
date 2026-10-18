import { siteConfig } from "@/config/site";
import { getGenderLabel, set, type Gender, type Set } from "@/lib/utils";

type CorrectionLinkProps = {
  event: Set;
  gender: Gender;
  year: string;
  /** The highlighted club, if any — likely the crew the reader means. */
  club: string | null;
};

// The "Spotted a mistake?" line under a chart. Corrections arrive by email, so
// the link opens one already addressed and subject-lined with the chart, and a
// body that asks for what we need to act on it: the day and division, what
// actually happened, and a source to check it against.
export function CorrectionLink({
  event,
  gender,
  year,
  club,
}: CorrectionLinkProps) {
  const chart = `${set[event]} ${year} (${getGenderLabel(event, gender)})`;

  const body = [
    `Chart: ${siteConfig.url}/charts/${event}/${gender}/${year}`,
    ...(club ? [`Crew: ${club}`] : []),
    "Day and division:",
    "What actually happened:",
    "Source (e.g. a newspaper report, club history or official results):",
    "",
  ].join("\r\n");

  const href = `mailto:${siteConfig.correctionsEmail}?subject=${encodeURIComponent(
    `Correction: ${chart}`,
  )}&body=${encodeURIComponent(body)}`;

  return (
    <p className="text-center text-sm text-muted-foreground">
      Spotted a mistake in these results?{" "}
      <a
        href={href}
        className="font-medium underline underline-offset-4 hover:text-primary"
      >
        Email a correction
      </a>
    </p>
  );
}
