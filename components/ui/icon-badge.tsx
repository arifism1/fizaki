import {
  BellRing,
  Bot,
  Calculator,
  CalendarCheck,
  ChartColumn,
  Clock,
  Dumbbell,
  FileSpreadsheet,
  FileText,
  Filter,
  FolderUp,
  Globe,
  Handshake,
  Headset,
  HelpCircle,
  Home,
  Images,
  Kanban,
  KeyRound,
  MapPin,
  Megaphone,
  MessageCircle,
  MessageSquare,
  PhoneMissed,
  RefreshCw,
  Repeat,
  Rocket,
  RotateCcw,
  Search,
  Share2,
  ShieldCheck,
  Sofa,
  Sparkles,
  Star,
  Stethoscope,
  Sun,
  Target,
  TrendingUp,
  Users,
  Wallet,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

import type { BrandColor, IconName } from "@/lib/content";
import { cn } from "@/lib/utils";

const ICONS: Record<IconName, LucideIcon> = {
  "phone-missed": PhoneMissed,
  "message-circle": MessageCircle,
  star: Star,
  "trending-up": TrendingUp,
  "calendar-check": CalendarCheck,
  zap: Zap,
  search: Search,
  clock: Clock,
  wallet: Wallet,
  users: Users,
  bot: Bot,
  megaphone: Megaphone,
  globe: Globe,
  "shield-check": ShieldCheck,
  headset: Headset,
  "map-pin": MapPin,
  "bar-chart": ChartColumn,
  handshake: Handshake,
  rocket: Rocket,
  wrench: Wrench,
  sparkles: Sparkles,
};

/**
 * Flat, fully saturated circle with a white glyph. Never a pastel tint with a
 * coloured icon, never a gradient, never an emoji — this is the signature
 * icon treatment and it is the same everywhere on the page.
 */
const BG: Record<BrandColor, string> = {
  brandBlue: "bg-brandBlue",
  brandGreen: "bg-brandGreen",
  brandOrange: "bg-brandOrange",
  brandPink: "bg-brandPink",
  brandPurple: "bg-brandPurple",
  brandTeal: "bg-brandTeal",
};

type IconBadgeProps = {
  icon: IconName;
  color: BrandColor;
  className?: string;
  size?: number;
};

export function IconBadge({
  icon,
  color,
  className,
  size = 18,
}: IconBadgeProps) {
  const Icon = ICONS[icon];

  return (
    <span
      className={cn(
        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
        BG[color],
        className,
      )}
    >
      <Icon size={size} strokeWidth={2} className="text-white" aria-hidden />
    </span>
  );
}

/**
 * Industry pages carry arbitrary per-vertical accents, so they can't reuse the
 * fixed six-colour brand registry above. Icon names arrive as Lucide PascalCase
 * strings from lib/industries, resolved here; the circle fill is an inline hex.
 */
const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  Stethoscope,
  Dumbbell,
  Sofa,
  Sun,
  KeyRound,
  FileSpreadsheet,
  PhoneMissed,
  CalendarCheck,
  BellRing,
  RefreshCw,
  Star,
  Target,
  MessageCircle,
  TrendingUp,
  RotateCcw,
  Share2,
  Filter,
  Images,
  FileText,
  Kanban,
  Calculator,
  HelpCircle,
  Clock,
  Zap,
  Home,
  MessageSquare,
  FolderUp,
  Megaphone,
  Repeat,
};

/** The bare Lucide glyph for an industry, resolved from its PascalCase name. */
export function IndustryGlyph({
  name,
  size = 24,
  className,
  strokeWidth = 2,
}: {
  name: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  const Icon = INDUSTRY_ICONS[name] ?? Sparkles;
  return (
    <Icon
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden
    />
  );
}

/** Flat filled circle with a white glyph, tinted to an arbitrary industry hex. */
export function IndustryIconBadge({
  name,
  color,
  size = 18,
  className,
}: {
  name: string;
  color: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
        className,
      )}
      style={{ backgroundColor: color }}
    >
      <IndustryGlyph name={name} size={size} className="text-white" />
    </span>
  );
}
