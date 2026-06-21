export interface Span {
  label: string;
  text: string;
  start: number;
  end: number;
  source: string;
  score?: number;
}

interface PatternDef {
  label: string;
  source: string;
  re: RegExp;
}

const PATTERNS: PatternDef[] = [
  {
    label: "account_number",
    source: "iban",
    re: /\b[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}(?:[A-Z0-9]?){0,16}\b/g
  },
  {
    label: "secret",
    source: "ssn",
    re: /\b(?!000|666|9\d{2})\d{3}-(?!00)\d{2}-(?!0000)\d{4}\b/g
  },
  {
    label: "secret",
    source: "mac",
    re: /\b(?:[0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}\b/g
  },
  {
    label: "secret",
    source: "ipv4",
    re: /\b(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\b/g
  },
  {
    label: "secret",
    source: "ipv6",
    re: /\b(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}\b|\b(?:[0-9A-Fa-f]{1,4}:){1,7}:|\b(?:[0-9A-Fa-f]{1,4}:){1,6}:[0-9A-Fa-f]{1,4}\b|\b(?:[0-9A-Fa-f]{1,4}:){1,5}(?::[0-9A-Fa-f]{1,4}){1,2}\b|\b(?:[0-9A-Fa-f]{1,4}:){1,4}(?::[0-9A-Fa-f]{1,4}){1,3}\b|\b(?:[0-9A-Fa-f]{1,4}:){1,3}(?::[0-9A-Fa-f]{1,4}){1,4}\b|\b(?:[0-9A-Fa-f]{1,4}:){1,2}(?::[0-9A-Fa-f]{1,4}){1,5}\b|\b[0-9A-Fa-f]{1,4}:(?::[0-9A-Fa-f]{1,4}){1,6}\b|\b:(?::[0-9A-Fa-f]{1,4}){1,7}\b|\b::(?:[0-9A-Fa-f]{1,4}:){0,5}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}\b|\b[0-9A-Fa-f]{1,4}::(?:[0-9A-Fa-f]{1,4}:){0,4}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}\b|\b(?:[0-9A-Fa-f]{1,4}:){1,5}::(?:[0-9A-Fa-f]{1,4}:){0,3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}\b|\b(?:[0-9A-Fa-f]{1,4}:){1,4}::(?:[0-9A-Fa-f]{1,4}:){0,2}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}\b|\b(?:[0-9A-Fa-f]{1,4}:){1,3}::(?:[0-9A-Fa-f]{1,4}:){0,1}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}\b|\b(?:[0-9A-Fa-f]{1,4}:){1,2}::(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}\b|\b[0-9A-Fa-f]{1,4}::(?:[0-9A-Fa-f]{1,4}:){0,1}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}\b|\b::(?:[0-9A-Fa-f]{1,4}:){0,2}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}\b/g
  },
  {
    label: "secret",
    source: "jwt",
    re: /\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/g
  },
  {
    label: "secret",
    source: "api_key",
    re: /\b(?:sk-[A-Za-z0-9]{20,}|sk-live-[A-Za-z0-9]{20,}|sk-proj-[A-Za-z0-9]{20,}|ghp_[A-Za-z0-9]{36}|gho_[A-Za-z0-9]{36}|github_pat_[A-Za-z0-9_]{22,}|glpat-[A-Za-z0-9\-]{20,}|xox[bpors]-[A-Za-z0-9\-]{10,}|AKIA[0-9A-Z]{16}|AIza[A-Za-z0-9_\-]{35}|key-[A-Za-z0-9]{20,}|Bearer\s+[A-Za-z0-9\-._~+/]{20,512}=*)\b/g
  },
  {
    label: "secret",
    source: "btc_wallet",
    re: /\b[13][a-km-zA-HJ-NP-Z1-9]{25,34}\b|\bbc1[a-zA-HJ-NP-Z0-9]{25,62}\b/g
  },
  {
    label: "secret",
    source: "eth_wallet",
    re: /\b0x[0-9A-Fa-f]{40}\b/g
  }
];

const BTC_BASE58_CHARS = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

function validateBase58Check(input: string): boolean {
  for (const ch of input) {
    if (!BTC_BASE58_CHARS.includes(ch)) return false;
  }
  return input.length >= 25 && input.length <= 34;
}

function validateBtcAddress(text: string): boolean {
  if (/^1[0]{25,34}$/.test(text)) return false;
  if (text.startsWith("bc1")) return true;
  return validateBase58Check(text);
}

function validateEthAddress(text: string): boolean {
  if (/^0x[0-9a-f]{1,6}$/i.test(text)) return false;
  if (/^0x0{40}$/i.test(text)) return false;
  return true;
}

export function regexScan(text: string): Span[] {
  const spans: Span[] = [];

  for (const pattern of PATTERNS) {
    pattern.re.lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.re.exec(text)) !== null) {
      const matchedText = match[0];

      if (pattern.source === "eth_wallet") {
        if (!validateEthAddress(matchedText)) continue;
      }

      if (pattern.source === "btc_wallet") {
        if (!validateBtcAddress(matchedText)) continue;
      }

      spans.push({
        label: pattern.label,
        text: matchedText,
        start: match.index,
        end: match.index + matchedText.length,
        source: pattern.source
      });
    }
  }

  return spans;
}

export function mergeSpans(existingSpans: Span[], newSpans: Span[], sourceText?: string): Span[] {
  const all = [...existingSpans, ...newSpans];
  all.sort((a, b) => a.start - b.start || b.end - a.end);

  const merged: Span[] = [];
  let cursor = -1;

  for (const span of all) {
    if (span.start >= cursor) {
      merged.push(span);
      cursor = span.end;
    } else if (span.end > cursor) {
      const overlapRatio = (cursor - span.start) / (span.end - span.start);
      if (overlapRatio <= 0.5) {
        const prior = merged[merged.length - 1];
        if (prior) {
          prior.end = span.end;
          if (sourceText) {
            prior.text = sourceText.slice(prior.start, span.end);
          } else {
            prior.text = prior.text + span.text.slice(cursor - span.start);
          }
        }
        cursor = span.end;
      }
    }
  }

  return merged;
}

export const PATTERN_DESCRIPTIONS: Record<string, string> = {
  iban: "International Bank Account Number",
  ssn: "US Social Security Number",
  mac: "MAC Address",
  ipv4: "IPv4 Address",
  ipv6: "IPv6 Address",
  jwt: "JSON Web Token",
  api_key: "API Key / Token",
  btc_wallet: "Bitcoin Wallet Address",
  eth_wallet: "Ethereum Wallet Address"
};
