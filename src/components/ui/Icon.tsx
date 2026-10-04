import {
  AlertCircle,
  Antenna,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Boxes,
  Building2,
  BusFront,
  ChartNoAxesCombined,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDot,
  ClipboardCheck,
  Compass,
  CreditCard,
  Database,
  FileCheck,
  FileSearch,
  Flame,
  FlaskConical,
  Gift,
  GitBranch,
  HandCoins,
  Info,
  Landmark,
  Layers,
  ExternalLink,
  Link2,
  Link2Off,
  LoaderCircle,
  Lock,
  Mail,
  MapPin,
  Menu,
  Phone,
  PlugZap,
  Recycle,
  Repeat,
  Scale,
  ShieldCheck,
  Sprout,
  Store,
  Sun,
  Unplug,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";

/**
 * Explicit icon registry.
 *
 * Content files reference icons by name; this map resolves them. Registering
 * icons explicitly (rather than a namespace import) keeps the bundle to the
 * icons actually used.
 */
const registry = {
  AlertCircle,
  Antenna,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Boxes,
  Building2,
  BusFront,
  ChartNoAxesCombined,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDot,
  ClipboardCheck,
  Compass,
  CreditCard,
  Database,
  FileCheck,
  FileSearch,
  Flame,
  FlaskConical,
  Gift,
  GitBranch,
  HandCoins,
  Info,
  Landmark,
  Layers,
  ExternalLink,
  Link2,
  Link2Off,
  LoaderCircle,
  Lock,
  Mail,
  MapPin,
  Menu,
  Phone,
  PlugZap,
  Recycle,
  Repeat,
  Scale,
  ShieldCheck,
  Sprout,
  Store,
  Sun,
  Unplug,
  Wallet,
  X,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof registry;

export function Icon({
  name,
  className,
  strokeWidth = 1.75,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Component = registry[name as IconName] ?? CircleDot;
  return <Component className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
